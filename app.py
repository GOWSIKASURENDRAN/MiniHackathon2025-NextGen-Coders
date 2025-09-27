from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import speech_recognition as sr
import cv2
import pytesseract
import numpy as np
from transformers import pipeline
import spacy
import json
import os
from datetime import datetime, timedelta
import base64
import io
from PIL import Image

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///accessibility_platform.db'
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

# Load AI models
try:
    nlp = spacy.load("en_core_web_sm")
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
except:
    print("AI models not loaded. Some features may not work.")

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), default='normal_user')  # normal_user, accessibility_advocate, admin
    accessibility_needs = db.Column(db.Text)  # JSON string of user's accessibility preferences
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class AccessibilitySession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    session_type = db.Column(db.String(50), nullable=False)  # captioning, sign_language, screen_reader, etc.
    data = db.Column(db.Text)  # JSON string of session data
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Username already exists'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 400
    
    user = User(
        username=data['username'],
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        role=data.get('role', 'normal_user'),
        accessibility_needs=json.dumps(data.get('accessibility_needs', {}))
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    
    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'role': user.role,
                'accessibility_needs': json.loads(user.accessibility_needs)
            }
        }), 200
    
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/speech-to-text', methods=['POST'])
def speech_to_text():
    try:
        # This would typically receive audio data from the frontend
        # For demo purposes, we'll simulate the response
        return jsonify({
            'text': 'This is a simulated speech-to-text response',
            'confidence': 0.95
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/sign-language-detect', methods=['POST'])
def sign_language_detect():
    try:
        # This would process webcam data for sign language detection
        # For demo purposes, we'll simulate the response
        return jsonify({
            'detected_gesture': 'hello',
            'confidence': 0.87,
            'translation': 'Hello, how are you?'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/object-detection', methods=['POST'])
def object_detection():
    try:
        data = request.get_json()
        image_data = data.get('image')
        
        if not image_data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Decode base64 image
        image_bytes = base64.b64decode(image_data.split(',')[1])
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to OpenCV format
        opencv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        # Use Tesseract for OCR
        text = pytesseract.image_to_string(opencv_image)
        
        # Simple object detection (in a real app, you'd use a trained model)
        objects_detected = ['text', 'document'] if text.strip() else ['image']
        
        return jsonify({
            'objects': objects_detected,
            'text_content': text.strip(),
            'description': f"Detected {len(objects_detected)} objects and text content"
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/screen-reader-summary', methods=['POST'])
def screen_reader_summary():
    try:
        data = request.get_json()
        text_content = data.get('text', '')
        
        if not text_content:
            return jsonify({'error': 'No text content provided'}), 400
        
        # Use spaCy for text processing
        doc = nlp(text_content)
        
        # Extract key information
        entities = [(ent.text, ent.label_) for ent in doc.ents]
        sentences = [sent.text for sent in doc.sents]
        
        # Create a summary
        summary = f"This content contains {len(sentences)} sentences. "
        if entities:
            summary += f"Key entities: {', '.join([f'{ent[0]} ({ent[1]})' for ent in entities[:5]])}. "
        
        # Add first few sentences as context
        summary += f"Main content: {' '.join(sentences[:2])}"
        
        return jsonify({
            'summary': summary,
            'entities': entities,
            'sentence_count': len(sentences)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/emergency-alert', methods=['POST'])
def emergency_alert():
    try:
        data = request.get_json()
        alert_type = data.get('type', 'general')
        message = data.get('message', 'Emergency alert')
        
        # In a real implementation, this would integrate with IoT devices
        # For now, we'll just log the alert
        print(f"EMERGENCY ALERT: {alert_type} - {message}")
        
        return jsonify({
            'status': 'alert_sent',
            'message': 'Emergency alert has been processed',
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/settings', methods=['GET', 'POST'])
@jwt_required()
def user_settings():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if request.method == 'GET':
        return jsonify({
            'accessibility_needs': json.loads(user.accessibility_needs)
        }), 200
    
    elif request.method == 'POST':
        data = request.get_json()
        user.accessibility_needs = json.dumps(data.get('accessibility_needs', {}))
        db.session.commit()
        
        return jsonify({'message': 'Settings updated successfully'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
