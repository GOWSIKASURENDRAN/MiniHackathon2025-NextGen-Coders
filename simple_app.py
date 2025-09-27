from flask import Flask, jsonify, render_template_string
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template_string('''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Inclusive Accessibility Platform</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
        <style>
            .hero-section {
                background: linear-gradient(135deg, #2c3e50, #3498db);
                color: white;
                padding: 4rem 0;
            }
            .feature-card {
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }
            .feature-card:hover {
                border-color: #007bff;
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <i class="fas fa-universal-access me-2"></i>
                    Inclusive Accessibility Platform
                </a>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="hero-section">
            <div class="container text-center">
                <h1 class="display-4 mb-4">Inclusive Accessibility Platform</h1>
                <p class="lead mb-4">Making digital spaces accessible for everyone through AI, IoT, and innovative technology</p>
                <div class="mt-4">
                    <button class="btn btn-light btn-lg me-3" onclick="showDemo()">
                        <i class="fas fa-play me-2"></i>
                        View Demo
                    </button>
                    <button class="btn btn-outline-light btn-lg" onclick="showFeatures()">
                        <i class="fas fa-info-circle me-2"></i>
                        Learn More
                    </button>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-5">
            <div class="container">
                <h2 class="text-center mb-5">Accessibility Features</h2>
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <div class="card feature-card h-100 text-center">
                            <div class="card-body">
                                <i class="fas fa-deaf fa-3x text-primary mb-3"></i>
                                <h5>Hearing Impaired</h5>
                                <p class="text-muted">Live captioning, sign language detection, and emergency alerts</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card feature-card h-100 text-center">
                            <div class="card-body">
                                <i class="fas fa-eye fa-3x text-success mb-3"></i>
                                <h5>Visually Impaired</h5>
                                <p class="text-muted">AI screen reader, object detection, and accessible e-commerce</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card feature-card h-100 text-center">
                            <div class="card-body">
                                <i class="fas fa-users fa-3x text-info mb-3"></i>
                                <h5>Inclusive Features</h5>
                                <p class="text-muted">Multi-mode communication and education platform</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Demo Section -->
        <section id="demo" class="py-5 bg-light" style="display: none;">
            <div class="container">
                <h2 class="text-center mb-4">Live Demo</h2>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5><i class="fas fa-microphone me-2"></i>Speech Recognition Demo</h5>
                            </div>
                            <div class="card-body">
                                <button class="btn btn-primary" onclick="startSpeechRecognition()">
                                    <i class="fas fa-microphone me-2"></i>
                                    Start Listening
                                </button>
                                <div id="speechResult" class="mt-3 p-3 bg-light rounded">
                                    Speech recognition results will appear here...
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5><i class="fas fa-camera me-2"></i>Object Detection Demo</h5>
                            </div>
                            <div class="card-body">
                                <button class="btn btn-success" onclick="startObjectDetection()">
                                    <i class="fas fa-camera me-2"></i>
                                    Start Camera
                                </button>
                                <div id="objectResult" class="mt-3 p-3 bg-light rounded">
                                    Object detection results will appear here...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-dark text-light text-center py-4">
            <div class="container">
                <p>&copy; 2024 Inclusive Accessibility Platform. Making digital spaces accessible for everyone.</p>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <script>
            function showDemo() {
                document.getElementById('demo').style.display = 'block';
                document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
            }

            function showFeatures() {
                alert('This is a comprehensive accessibility platform with features for hearing and visually impaired users. The full application includes React frontend with advanced AI capabilities.');
            }

            function startSpeechRecognition() {
                const result = document.getElementById('speechResult');
                result.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Listening...';
                
                setTimeout(() => {
                    result.innerHTML = '<strong>Detected:</strong> "Hello, this is a demonstration of speech recognition technology for accessibility."';
                }, 2000);
            }

            function startObjectDetection() {
                const result = document.getElementById('objectResult');
                result.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Analyzing...';
                
                setTimeout(() => {
                    result.innerHTML = '<strong>Detected objects:</strong> Computer screen, keyboard, mouse, coffee cup, documents';
                }, 2000);
            }

            // Accessibility features
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });

            document.addEventListener('mousedown', function() {
                document.body.classList.remove('keyboard-navigation');
            });
        </script>
    </body>
    </html>
    ''')

@app.route('/api/health')
def health():
    return jsonify({
        'status': 'healthy',
        'message': 'Inclusive Accessibility Platform is running!',
        'features': [
            'Speech Recognition',
            'Object Detection', 
            'Sign Language Detection',
            'Screen Reader Assistant',
            'Emergency Alerts',
            'Multi-mode Communication'
        ]
    })

@app.route('/api/demo/speech', methods=['POST'])
def demo_speech():
    return jsonify({
        'text': 'This is a simulated speech recognition response for the accessibility platform demo.',
        'confidence': 0.95
    })

@app.route('/api/demo/objects', methods=['POST'])
def demo_objects():
    return jsonify({
        'objects': ['computer', 'keyboard', 'mouse', 'coffee cup'],
        'description': 'Detected common office objects using computer vision technology.'
    })

if __name__ == '__main__':
    print("🚀 Starting Inclusive Accessibility Platform...")
    print("🌐 Backend: http://localhost:5000")
    print("📱 Frontend: http://localhost:3000 (if React is running)")
    print("=" * 50)
    app.run(debug=True, host='0.0.0.0', port=5000)
