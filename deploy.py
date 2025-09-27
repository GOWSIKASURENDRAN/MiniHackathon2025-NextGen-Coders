#!/usr/bin/env python3
"""
Deployment script for the Inclusive Accessibility Platform
This script builds the React frontend and prepares for production deployment
"""

import subprocess
import sys
import os
import shutil
from pathlib import Path

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error during {description}:")
        print(f"   Command: {command}")
        print(f"   Error: {e.stderr}")
        return False

def main():
    """Main deployment function"""
    print("🚀 Deploying Inclusive Accessibility Platform")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not Path("app.py").exists():
        print("❌ Error: app.py not found. Please run this script from the project root directory.")
        sys.exit(1)
    
    if not Path("package.json").exists():
        print("❌ Error: package.json not found. Please run this script from the project root directory.")
        sys.exit(1)
    
    # Install Python dependencies
    if not run_command("pip install -r requirements.txt", "Installing Python dependencies"):
        sys.exit(1)
    
    # Install Node.js dependencies
    if not run_command("npm install", "Installing Node.js dependencies"):
        sys.exit(1)
    
    # Build React frontend
    if not run_command("npm run build", "Building React frontend"):
        sys.exit(1)
    
    # Create production directory structure
    prod_dir = Path("production")
    if prod_dir.exists():
        shutil.rmtree(prod_dir)
    
    prod_dir.mkdir()
    
    # Copy backend files
    backend_files = [
        "app.py",
        "requirements.txt",
        "start.py"
    ]
    
    for file in backend_files:
        if Path(file).exists():
            shutil.copy2(file, prod_dir / file)
            print(f"📁 Copied {file}")
    
    # Copy built frontend
    build_dir = Path("build")
    if build_dir.exists():
        frontend_dir = prod_dir / "static"
        shutil.copytree(build_dir, frontend_dir)
        print("📁 Copied built frontend to static/")
    
    # Create production requirements
    prod_requirements = [
        "Flask==2.3.3",
        "Flask-CORS==4.0.0",
        "Flask-SQLAlchemy==3.0.5",
        "Flask-JWT-Extended==4.5.3",
        "Werkzeug==2.3.7",
        "gunicorn==21.2.0",
        "python-dotenv==1.0.0"
    ]
    
    with open(prod_dir / "requirements.txt", "w") as f:
        f.write("\n".join(prod_requirements))
    
    # Create production app.py
    prod_app_content = '''from flask import Flask, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app)

@app.route('/')
def serve_frontend():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
'''
    
    with open(prod_dir / "app.py", "w") as f:
        f.write(prod_app_content)
    
    # Create deployment instructions
    deploy_instructions = """
# Production Deployment Instructions

## Local Testing
1. Navigate to the production directory: `cd production`
2. Install dependencies: `pip install -r requirements.txt`
3. Run the application: `python app.py`
4. Open http://localhost:5000 in your browser

## Heroku Deployment
1. Install Heroku CLI
2. Login to Heroku: `heroku login`
3. Create a new app: `heroku create your-app-name`
4. Set environment variables: `heroku config:set FLASK_ENV=production`
5. Deploy: `git push heroku main`

## Docker Deployment
1. Create a Dockerfile in the production directory
2. Build the image: `docker build -t accessibility-platform .`
3. Run the container: `docker run -p 5000:5000 accessibility-platform`

## Environment Variables
- FLASK_ENV=production
- SECRET_KEY=your-secret-key
- JWT_SECRET_KEY=your-jwt-secret
- PORT=5000 (for Heroku)
"""
    
    with open(prod_dir / "DEPLOYMENT.md", "w") as f:
        f.write(deploy_instructions)
    
    print("\n🎉 Deployment preparation completed!")
    print(f"📁 Production files are in: {prod_dir.absolute()}")
    print("\n📋 Next steps:")
    print("1. Navigate to the production directory")
    print("2. Install dependencies: pip install -r requirements.txt")
    print("3. Run the application: python app.py")
    print("4. Open http://localhost:5000 in your browser")
    print("\n📖 See DEPLOYMENT.md for detailed deployment instructions")

if __name__ == "__main__":
    main()
