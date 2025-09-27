#!/usr/bin/env python3
"""
Test script for the Inclusive Accessibility Platform
This script tests the basic functionality of the Flask backend
"""

import requests
import json
import time
import subprocess
import sys
from pathlib import Path

def test_backend_health():
    """Test if the backend is running and healthy"""
    try:
        response = requests.get("http://localhost:5000/", timeout=5)
        if response.status_code == 200:
            print("✅ Backend health check passed")
            return True
        else:
            print(f"❌ Backend health check failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Backend health check failed: {e}")
        return False

def test_user_registration():
    """Test user registration endpoint"""
    try:
        test_user = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword123",
            "role": "normal_user",
            "accessibility_needs": {
                "highContrast": False,
                "largeText": False,
                "voiceNavigation": False,
                "captions": True
            }
        }
        
        response = requests.post(
            "http://localhost:5000/api/register",
            json=test_user,
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        
        if response.status_code == 201:
            print("✅ User registration test passed")
            return True
        else:
            print(f"❌ User registration test failed: {response.status_code} - {response.text}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ User registration test failed: {e}")
        return False

def test_user_login():
    """Test user login endpoint"""
    try:
        login_data = {
            "username": "testuser",
            "password": "testpassword123"
        }
        
        response = requests.post(
            "http://localhost:5000/api/login",
            json=login_data,
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        
        if response.status_code == 200:
            data = response.json()
            if "access_token" in data:
                print("✅ User login test passed")
                return data["access_token"]
            else:
                print("❌ User login test failed: No access token in response")
                return None
        else:
            print(f"❌ User login test failed: {response.status_code} - {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"❌ User login test failed: {e}")
        return None

def test_api_endpoints(token):
    """Test various API endpoints"""
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    
    endpoints = [
        ("/api/speech-to-text", "POST", {"text": "test"}),
        ("/api/sign-language-detect", "POST", {"gesture": "hello"}),
        ("/api/object-detection", "POST", {"image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="}),
        ("/api/screen-reader-summary", "POST", {"text": "This is a test text for screen reader analysis."}),
        ("/api/emergency-alert", "POST", {"type": "test", "message": "Test emergency alert"})
    ]
    
    passed = 0
    total = len(endpoints)
    
    for endpoint, method, data in endpoints:
        try:
            if method == "POST":
                response = requests.post(
                    f"http://localhost:5000{endpoint}",
                    json=data,
                    headers={**headers, "Content-Type": "application/json"},
                    timeout=5
                )
            else:
                response = requests.get(
                    f"http://localhost:5000{endpoint}",
                    headers=headers,
                    timeout=5
                )
            
            if response.status_code == 200:
                print(f"✅ {endpoint} test passed")
                passed += 1
            else:
                print(f"❌ {endpoint} test failed: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"❌ {endpoint} test failed: {e}")
    
    print(f"📊 API endpoints test: {passed}/{total} passed")
    return passed == total

def main():
    """Main test function"""
    print("🧪 Testing Inclusive Accessibility Platform")
    print("=" * 50)
    
    # Check if app.py exists
    if not Path("app.py").exists():
        print("❌ Error: app.py not found. Please run this script from the project root directory.")
        sys.exit(1)
    
    # Check if requirements.txt exists
    if not Path("requirements.txt").exists():
        print("❌ Error: requirements.txt not found. Please run this script from the project root directory.")
        sys.exit(1)
    
    print("🔍 Starting tests...")
    
    # Test backend health
    if not test_backend_health():
        print("❌ Backend is not running. Please start the backend first:")
        print("   python app.py")
        sys.exit(1)
    
    # Test user registration
    if not test_user_registration():
        print("❌ User registration test failed")
        sys.exit(1)
    
    # Test user login
    token = test_user_login()
    if not token:
        print("❌ User login test failed")
        sys.exit(1)
    
    # Test API endpoints
    if not test_api_endpoints(token):
        print("❌ Some API endpoint tests failed")
        sys.exit(1)
    
    print("\n🎉 All tests passed!")
    print("✅ The Inclusive Accessibility Platform is working correctly")
    print("\n📋 Next steps:")
    print("1. Open http://localhost:5000 in your browser")
    print("2. Register a new account or login with testuser/testpassword123")
    print("3. Explore the accessibility features")

if __name__ == "__main__":
    main()
