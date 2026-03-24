#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime, timedelta

class ScrabitAPITester:
    def __init__(self, base_url="https://waste-wealth.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.booking_id = None
        self.test_phone = f"9876543{datetime.now().strftime('%H%M')}"

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        return success

    def test_root_endpoint(self):
        """Test root API endpoint"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            success = response.status_code == 200 and "Scrabit API" in response.text
            details = f"Status: {response.status_code}, Response: {response.text[:100]}"
            return self.log_test("Root Endpoint", success, details)
        except Exception as e:
            return self.log_test("Root Endpoint", False, str(e))

    def test_pricing_api(self):
        """Test pricing API"""
        try:
            response = requests.get(f"{self.base_url}/pricing", timeout=10)
            if response.status_code != 200:
                return self.log_test("Pricing API", False, f"Status: {response.status_code}")
            
            data = response.json()
            if "pricing" not in data:
                return self.log_test("Pricing API", False, "Missing 'pricing' key in response")
            
            pricing = data["pricing"]
            if len(pricing) < 15:  # Should have 20 items as per seed data
                return self.log_test("Pricing API", False, f"Expected 20 items, got {len(pricing)}")
            
            # Check if all required categories exist
            categories = set(item["category"] for item in pricing)
            expected_categories = {"paper", "metal", "plastic", "ewaste", "others"}
            if not expected_categories.issubset(categories):
                missing = expected_categories - categories
                return self.log_test("Pricing API", False, f"Missing categories: {missing}")
            
            return self.log_test("Pricing API", True, f"Found {len(pricing)} items across {len(categories)} categories")
        except Exception as e:
            return self.log_test("Pricing API", False, str(e))

    def test_impact_api(self):
        """Test impact statistics API"""
        try:
            response = requests.get(f"{self.base_url}/impact", timeout=10)
            if response.status_code != 200:
                return self.log_test("Impact API", False, f"Status: {response.status_code}")
            
            data = response.json()
            required_fields = ["trees_saved", "kg_recycled", "co2_reduced", "families_served"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                return self.log_test("Impact API", False, f"Missing fields: {missing_fields}")
            
            # Check if values are reasonable numbers
            for field in required_fields:
                if not isinstance(data[field], (int, float)) or data[field] < 0:
                    return self.log_test("Impact API", False, f"Invalid value for {field}: {data[field]}")
            
            return self.log_test("Impact API", True, f"All impact stats present: {data}")
        except Exception as e:
            return self.log_test("Impact API", False, str(e))

    def test_booking_creation(self):
        """Test booking creation"""
        try:
            # Create a test booking
            booking_data = {
                "name": "Test User",
                "phone": self.test_phone,
                "email": "test@example.com",
                "address": "123 Test Street, Test Building",
                "city": "Mumbai",
                "pincode": "400001",
                "scrap_items": [
                    {"type": "Newspaper", "estimated_weight": 5.0},
                    {"type": "Iron", "estimated_weight": 2.5}
                ],
                "preferred_date": (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d'),
                "preferred_time": "09:00 AM - 11:00 AM",
                "notes": "Test booking for API testing"
            }
            
            response = requests.post(
                f"{self.base_url}/bookings", 
                json=booking_data, 
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code != 200:
                return self.log_test("Booking Creation", False, f"Status: {response.status_code}, Response: {response.text}")
            
            data = response.json()
            required_fields = ["id", "name", "phone", "status", "estimated_amount", "scrap_items"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                return self.log_test("Booking Creation", False, f"Missing fields: {missing_fields}")
            
            # Store booking ID for later tests
            self.booking_id = data["id"]
            
            # Validate booking ID format (8-char uppercase)
            if not (len(self.booking_id) == 8 and self.booking_id.isupper()):
                return self.log_test("Booking Creation", False, f"Invalid booking ID format: {self.booking_id}")
            
            # Check if estimated amount is calculated
            if not isinstance(data["estimated_amount"], (int, float)) or data["estimated_amount"] <= 0:
                return self.log_test("Booking Creation", False, f"Invalid estimated amount: {data['estimated_amount']}")
            
            return self.log_test("Booking Creation", True, f"Booking created with ID: {self.booking_id}, Amount: Rs {data['estimated_amount']}")
        except Exception as e:
            return self.log_test("Booking Creation", False, str(e))

    def test_booking_retrieval(self):
        """Test booking retrieval by ID"""
        if not self.booking_id:
            return self.log_test("Booking Retrieval", False, "No booking ID available from creation test")
        
        try:
            response = requests.get(f"{self.base_url}/bookings/{self.booking_id}", timeout=10)
            
            if response.status_code != 200:
                return self.log_test("Booking Retrieval", False, f"Status: {response.status_code}")
            
            data = response.json()
            
            # Verify booking data
            if data["id"] != self.booking_id:
                return self.log_test("Booking Retrieval", False, f"ID mismatch: expected {self.booking_id}, got {data['id']}")
            
            if data["phone"] != self.test_phone:
                return self.log_test("Booking Retrieval", False, f"Phone mismatch: expected {self.test_phone}, got {data['phone']}")
            
            return self.log_test("Booking Retrieval", True, f"Successfully retrieved booking {self.booking_id}")
        except Exception as e:
            return self.log_test("Booking Retrieval", False, str(e))

    def test_booking_tracking_by_phone(self):
        """Test booking tracking by phone number"""
        if not self.test_phone:
            return self.log_test("Booking Tracking", False, "No test phone number available")
        
        try:
            response = requests.get(f"{self.base_url}/bookings/track/{self.test_phone}", timeout=10)
            
            if response.status_code != 200:
                return self.log_test("Booking Tracking", False, f"Status: {response.status_code}")
            
            data = response.json()
            
            if "bookings" not in data:
                return self.log_test("Booking Tracking", False, "Missing 'bookings' key in response")
            
            bookings = data["bookings"]
            if len(bookings) == 0:
                return self.log_test("Booking Tracking", False, "No bookings found for test phone number")
            
            # Check if our test booking is in the results
            found_booking = any(booking["id"] == self.booking_id for booking in bookings if self.booking_id)
            if self.booking_id and not found_booking:
                return self.log_test("Booking Tracking", False, f"Test booking {self.booking_id} not found in tracking results")
            
            return self.log_test("Booking Tracking", True, f"Found {len(bookings)} booking(s) for phone {self.test_phone}")
        except Exception as e:
            return self.log_test("Booking Tracking", False, str(e))

    def test_contact_api(self):
        """Test contact form submission"""
        try:
            contact_data = {
                "name": "Test Contact",
                "phone": self.test_phone,
                "email": "test@example.com",
                "message": "This is a test contact message for API testing"
            }
            
            response = requests.post(
                f"{self.base_url}/contact", 
                json=contact_data, 
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code != 200:
                return self.log_test("Contact API", False, f"Status: {response.status_code}, Response: {response.text}")
            
            data = response.json()
            
            if "message" not in data or "id" not in data:
                return self.log_test("Contact API", False, "Missing 'message' or 'id' in response")
            
            return self.log_test("Contact API", True, f"Contact created with ID: {data['id']}")
        except Exception as e:
            return self.log_test("Contact API", False, str(e))

    def test_invalid_booking_retrieval(self):
        """Test retrieval of non-existent booking"""
        try:
            response = requests.get(f"{self.base_url}/bookings/INVALID123", timeout=10)
            
            # Should return 404 for non-existent booking
            if response.status_code == 404:
                return self.log_test("Invalid Booking Retrieval", True, "Correctly returned 404 for invalid booking ID")
            else:
                return self.log_test("Invalid Booking Retrieval", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            return self.log_test("Invalid Booking Retrieval", False, str(e))

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Scrabit API Tests...")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Run tests in logical order
        self.test_root_endpoint()
        self.test_pricing_api()
        self.test_impact_api()
        self.test_booking_creation()
        self.test_booking_retrieval()
        self.test_booking_tracking_by_phone()
        self.test_contact_api()
        self.test_invalid_booking_retrieval()
        
        print("=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed! Backend APIs are working correctly.")
            return True
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} test(s) failed. Please check the issues above.")
            return False

def main():
    tester = ScrabitAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())