#!/usr/bin/env python3
"""
Startup script for the Inclusive Accessibility Platform
This script starts both the Flask backend and React frontend
"""

import subprocess
import sys
import os
import time
import threading
from pathlib import Path

def run_backend():
    """Start the Flask backend server"""
    print("🚀 Starting Flask backend server...")
    try:
        subprocess.run([sys.executable, "app.py"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Backend server stopped")
    except Exception as e:
        print(f"❌ Error starting backend: {e}")

def run_frontend():
    """Start the React frontend development server"""
    print("🚀 Starting React frontend server...")
    try:
        # Check if node_modules exists
        if not Path("node_modules").exists():
            print("📦 Installing Node.js dependencies...")
            subprocess.run(["npm", "install"], check=True)
        
        subprocess.run(["npm", "start"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Frontend server stopped")
    except Exception as e:
        print(f"❌ Error starting frontend: {e}")

def main():
    """Main function to start both servers"""
    print("🌟 Welcome to the Inclusive Accessibility Platform!")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not Path("app.py").exists():
        print("❌ Error: app.py not found. Please run this script from the project root directory.")
        sys.exit(1)
    
    if not Path("package.json").exists():
        print("❌ Error: package.json not found. Please run this script from the project root directory.")
        sys.exit(1)
    
    print("📋 Starting both backend and frontend servers...")
    print("🌐 Backend will be available at: http://localhost:5000")
    print("🌐 Frontend will be available at: http://localhost:3000")
    print("=" * 50)
    
    # Start backend in a separate thread
    backend_thread = threading.Thread(target=run_backend, daemon=True)
    backend_thread.start()
    
    # Give backend time to start
    time.sleep(2)
    
    # Start frontend in the main thread
    try:
        run_frontend()
    except KeyboardInterrupt:
        print("\n🛑 Shutting down servers...")
        print("👋 Thank you for using the Inclusive Accessibility Platform!")

if __name__ == "__main__":
    main()
