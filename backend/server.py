from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import base64
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


# --- Models ---
class ScrapItem(BaseModel):
    type: str
    estimated_weight: float

class BookingCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    address: str
    city: str
    pincode: str
    scrap_items: List[ScrapItem]
    preferred_date: str
    preferred_time: str
    notes: Optional[str] = None

class ContactCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    message: str

class ImagePrompt(BaseModel):
    prompt: str


# --- Seed Data ---
PRICING_DATA = [
    {"category": "paper", "item_name": "Newspaper", "price_per_kg": 16, "unit": "per kg"},
    {"category": "paper", "item_name": "Books/Copies", "price_per_kg": 14, "unit": "per kg"},
    {"category": "paper", "item_name": "Cardboard", "price_per_kg": 12, "unit": "per kg"},
    {"category": "paper", "item_name": "Office Paper", "price_per_kg": 15, "unit": "per kg"},
    {"category": "metal", "item_name": "Iron", "price_per_kg": 28, "unit": "per kg"},
    {"category": "metal", "item_name": "Aluminium", "price_per_kg": 105, "unit": "per kg"},
    {"category": "metal", "item_name": "Copper", "price_per_kg": 425, "unit": "per kg"},
    {"category": "metal", "item_name": "Brass", "price_per_kg": 305, "unit": "per kg"},
    {"category": "metal", "item_name": "Steel", "price_per_kg": 32, "unit": "per kg"},
    {"category": "plastic", "item_name": "Plastic Bottles", "price_per_kg": 10, "unit": "per kg"},
    {"category": "plastic", "item_name": "Hard Plastic", "price_per_kg": 15, "unit": "per kg"},
    {"category": "plastic", "item_name": "Plastic Containers", "price_per_kg": 8, "unit": "per kg"},
    {"category": "ewaste", "item_name": "AC", "price_per_kg": 35, "unit": "per unit/kg"},
    {"category": "ewaste", "item_name": "Washing Machine", "price_per_kg": 25, "unit": "per unit/kg"},
    {"category": "ewaste", "item_name": "TV", "price_per_kg": 20, "unit": "per unit/kg"},
    {"category": "ewaste", "item_name": "Laptop", "price_per_kg": 30, "unit": "per unit/kg"},
    {"category": "ewaste", "item_name": "Mobile Phone", "price_per_kg": 15, "unit": "per unit"},
    {"category": "others", "item_name": "Car Battery", "price_per_kg": 65, "unit": "per unit"},
    {"category": "others", "item_name": "Inverter Battery", "price_per_kg": 85, "unit": "per unit"},
    {"category": "others", "item_name": "Tyres", "price_per_kg": 5, "unit": "per kg"},
]


@app.on_event("startup")
async def seed_data():
    count = await db.pricing.count_documents({})
    if count == 0:
        await db.pricing.insert_many(PRICING_DATA)
        logging.info("Pricing data seeded")

    impact_count = await db.impact_stats.count_documents({})
    if impact_count == 0:
        await db.impact_stats.insert_one({
            "trees_saved": 1250,
            "kg_recycled": 85000,
            "co2_reduced": 42000,
            "families_served": 3200,
            "updated_at": datetime.now(timezone.utc).isoformat()
        })
        logging.info("Impact stats seeded")


# --- Routes ---
@api_router.get("/")
async def root():
    return {"message": "Scrabit API - E-Kabbadiwala Service"}


@api_router.get("/pricing")
async def get_pricing():
    pricing = await db.pricing.find({}, {"_id": 0}).to_list(100)
    return {"pricing": pricing}


@api_router.post("/bookings")
async def create_booking(booking: BookingCreate):
    pricing = await db.pricing.find({}, {"_id": 0}).to_list(100)
    pricing_map = {p["item_name"]: p["price_per_kg"] for p in pricing}

    estimated_amount = 0
    scrap_items_list = []
    for item in booking.scrap_items:
        price = pricing_map.get(item.type, 10)
        estimated_amount += price * item.estimated_weight
        scrap_items_list.append({
            "type": item.type,
            "estimated_weight": item.estimated_weight,
            "price_per_kg": price
        })

    booking_id = str(uuid.uuid4())[:8].upper()
    doc = {
        "id": booking_id,
        "name": booking.name,
        "phone": booking.phone,
        "email": booking.email,
        "address": booking.address,
        "city": booking.city,
        "pincode": booking.pincode,
        "scrap_items": scrap_items_list,
        "preferred_date": booking.preferred_date,
        "preferred_time": booking.preferred_time,
        "notes": booking.notes,
        "status": "confirmed",
        "estimated_amount": round(estimated_amount, 2),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status_history": [
            {
                "status": "confirmed",
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "message": "Booking confirmed! Aapki booking ho gayi hai."
            }
        ]
    }

    await db.bookings.insert_one(doc)
    doc.pop("_id", None)
    return doc


@api_router.get("/bookings/{booking_id}")
async def get_booking(booking_id: str):
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@api_router.get("/bookings/track/{phone}")
async def track_by_phone(phone: str):
    bookings = await db.bookings.find(
        {"phone": phone}, {"_id": 0}
    ).sort("created_at", -1).to_list(10)
    return {"bookings": bookings}


@api_router.post("/contact")
async def create_contact(contact: ContactCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": contact.name,
        "phone": contact.phone,
        "email": contact.email,
        "message": contact.message,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.contacts.insert_one(doc)
    doc.pop("_id", None)
    return {"message": "Message received! Hum jaldi respond karenge.", "id": doc["id"]}


@api_router.get("/impact")
async def get_impact():
    stats = await db.impact_stats.find_one({}, {"_id": 0})
    if not stats:
        return {
            "trees_saved": 0,
            "kg_recycled": 0,
            "co2_reduced": 0,
            "families_served": 0
        }
    return stats


@api_router.post("/generate-image")
async def generate_image(prompt_data: ImagePrompt):
    try:
        from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration
        api_key = os.environ.get("EMERGENT_LLM_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="Image generation not configured")

        image_gen = OpenAIImageGeneration(api_key=api_key)
        images = await image_gen.generate_images(
            prompt=prompt_data.prompt,
            model="gpt-image-1",
            number_of_images=1
        )

        if images and len(images) > 0:
            image_base64 = base64.b64encode(images[0]).decode('utf-8')
            # Cache in DB
            await db.generated_images.insert_one({
                "prompt": prompt_data.prompt,
                "image_base64": image_base64,
                "created_at": datetime.now(timezone.utc).isoformat()
            })
            return {"image_base64": image_base64}
        else:
            raise HTTPException(status_code=500, detail="No image generated")
    except ImportError:
        raise HTTPException(status_code=500, detail="Image generation library not available")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
