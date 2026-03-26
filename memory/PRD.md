# Scrabit - E-Kabbadiwala Platform PRD

## Problem Statement
Build a website for Scrabit startup - an E-Kabbadiwala service that purchases scrap from people and sells to recyclers. Features include landing page, pricing, full booking system with date/time picker and tracking, environmental impact stats, and info about market exploitation by local players.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn UI + Framer Motion
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Fonts**: Outfit (headings) + Manrope (body)
- **Colors**: Praxeti White (#FAFAFA), Mantis (#74C365), Book Green (#4A7C59)

## User Personas
1. **Urban Householder** (25-50): Wants to sell household scrap conveniently
2. **Office Manager**: Needs to dispose of office e-waste and paper
3. **Environmentally Conscious**: Cares about proper recycling

## Core Requirements
- Landing page with Hero, How It Works, Why Scrabit vs Local, Impact Stats, Testimonials
- Pricing page with category tabs (Paper, Metal, Plastic, E-Waste, Others)
- Multi-step booking form (5 steps: Select types → Weights → Date/Time → Address → Confirm)
- Booking tracking by ID
- AI image generation endpoint (OpenAI GPT Image 1)
- 5-10% Hindi content throughout

## What's Been Implemented (Dec 2025)
- Full landing page with 6 sections + animated components
- Pricing page with 20 items across 5 categories
- 5-step booking flow with Shadcn Calendar date picker
- Booking tracking page
- Backend: pricing seed data, impact stats, booking CRUD, contact form, image gen endpoint
- Responsive design with glass header and mobile menu
- Framer Motion animations on all sections
- Pulse ring animation on booking CTAs

## Prioritized Backlog
### P0
- [x] Landing page with all sections
- [x] Pricing with tabs
- [x] Full booking flow
- [x] Tracking page

### P1
- [ ] User authentication (login/signup)
- [ ] Admin dashboard for managing bookings
- [ ] Generate AI cartoon illustrations for process steps
- [ ] SMS/WhatsApp notifications for booking updates

### P2
- [ ] Payment integration (Razorpay/UPI)
- [ ] Referral program
- [ ] Blog section for environmental awareness
- [ ] Multi-city support
