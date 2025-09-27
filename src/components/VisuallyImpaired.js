import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form, Badge } from 'react-bootstrap';

const VisuallyImpaired = ({ user }) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [screenReaderText, setScreenReaderText] = useState('');
  const [screenReaderSummary, setScreenReaderSummary] = useState('');
  const [objectDetectionResults, setObjectDetectionResults] = useState('');
  const [cameraStream, setCameraStream] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const cameraRef = useRef(null);

  // Screen reader assistant
  const processScreenReaderText = async () => {
    if (!screenReaderText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const summary = `This content contains ${screenReaderText.split(' ').length} words. ` +
        `Key topics include accessibility, technology, and user experience. ` +
        `The main content discusses improving digital accessibility for visually impaired users.`;
      setScreenReaderSummary(summary);
      setIsProcessing(false);
    }, 2000);
  };

  // Object detection
  const startObjectDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      if (cameraRef.current) {
        cameraRef.current.srcObject = stream;
      }
      setActiveFeature('object_detection');
      
      // Simulate object detection
      setTimeout(() => {
        setObjectDetectionResults('Detected objects: Text document, Computer screen, Coffee cup, Keyboard. Text content: "Accessibility Platform - Making digital spaces inclusive for everyone."');
      }, 3000);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopObjectDetection = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setActiveFeature(null);
    setObjectDetectionResults('');
  };

  // Handle file upload for OCR
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate OCR processing
      setIsProcessing(true);
      setTimeout(() => {
        setObjectDetectionResults(`OCR Results from ${file.name}: "This is a sample document with text that has been processed using optical character recognition. The system can read and convert printed text into digital format for screen readers."`);
        setIsProcessing(false);
      }, 2000);
    }
  };

  const features = [
    {
      id: 'screen_reader',
      title: 'AI Screen Reader Assistant',
      description: 'Intelligent content summarization and navigation',
      icon: 'fas fa-eye',
      color: 'primary',
      action: () => setActiveFeature('screen_reader')
    },
    {
      id: 'object_detection',
      title: 'Object & Text Detection',
      description: 'Real-time object recognition and OCR',
      icon: 'fas fa-camera',
      color: 'success',
      action: startObjectDetection
    },
    {
      id: 'e_commerce',
      title: 'Accessible E-Commerce',
      description: 'Voice-navigated shopping experience',
      icon: 'fas fa-shopping-cart',
      color: 'info',
      action: () => setActiveFeature('e_commerce')
    },
    {
      id: 'navigation',
      title: 'Smart Navigation',
      description: 'Indoor/outdoor navigation assistance',
      icon: 'fas fa-map-marked-alt',
      color: 'warning',
      action: () => setActiveFeature('navigation')
    }
  ];

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">
            <i className="fas fa-eye me-2"></i>
            Visually Impaired Features
          </h1>
          <p className="lead">
            Advanced AI-powered tools designed specifically for visually impaired users
          </p>
        </Col>
      </Row>

      {/* Features Grid */}
      <Row className="mb-4">
        {features.map((feature) => (
          <Col md="6" lg="3" key={feature.id} className="mb-3">
            <Card 
              className={`accessibility-feature h-100 border-${feature.color} ${activeFeature === feature.id ? 'border-3' : ''}`}
              onClick={feature.action}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body className="text-center">
                <i className={`${feature.icon} fa-3x text-${feature.color} mb-3`}></i>
                <h5>{feature.title}</h5>
                <p className="text-muted small">{feature.description}</p>
                {activeFeature === feature.id && (
                  <Badge bg={feature.color} className="mt-2">Active</Badge>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Screen Reader Assistant */}
      {activeFeature === 'screen_reader' && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-eye me-2"></i>
                  AI Screen Reader Assistant
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Text Content to Analyze</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="8"
                        value={screenReaderText}
                        onChange={(e) => setScreenReaderText(e.target.value)}
                        placeholder="Paste or type text content here for AI analysis and summarization..."
                        aria-describedby="textHelp"
                      />
                      <Form.Text id="textHelp" className="text-muted">
                        Enter any text content to get an intelligent summary and key information
                      </Form.Text>
                    </Form.Group>
                    
                    <div className="d-grid gap-2">
                      <Button 
                        variant="primary" 
                        onClick={processScreenReaderText}
                        disabled={!screenReaderText.trim() || isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-brain me-2"></i>
                            Analyze Content
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        variant="outline-secondary" 
                        onClick={() => setActiveFeature(null)}
                      >
                        Close
                      </Button>
                    </div>
                  </Col>
                  
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>AI Summary</Form.Label>
                      <div className="summary-output">
                        {screenReaderSummary ? (
                          <p className="mb-0">{screenReaderSummary}</p>
                        ) : (
                          <p className="text-muted mb-0">AI summary will appear here after processing...</p>
                        )}
                      </div>
                    </Form.Group>
                    
                    {screenReaderSummary && (
                      <Alert variant="info">
                        <h6><i className="fas fa-info-circle me-2"></i>Summary Details</h6>
                        <ul className="mb-0">
                          <li>Word count: {screenReaderText.split(' ').length}</li>
                          <li>Key topics identified</li>
                          <li>Content structure analyzed</li>
                          <li>Accessibility recommendations provided</li>
                        </ul>
                      </Alert>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Object Detection Interface */}
      {activeFeature === 'object_detection' && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-camera me-2"></i>
                  Object & Text Detection
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <div className="object-detection-container">
                      <div className="camera-preview-container mb-3">
                        {cameraStream ? (
                          <video 
                            ref={cameraRef}
                            autoPlay 
                            playsInline 
                            className="camera-preview"
                          />
                        ) : (
                          <div className="camera-preview bg-light d-flex align-items-center justify-content-center">
                            <div className="text-center">
                              <i className="fas fa-camera fa-3x text-muted mb-3"></i>
                              <p className="text-muted">Camera feed will appear here</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="d-grid gap-2">
                        <Button 
                          variant="success" 
                          onClick={startObjectDetection}
                          disabled={!!cameraStream}
                        >
                          <i className="fas fa-play me-2"></i>
                          Start Detection
                        </Button>
                        
                        <Button 
                          variant="danger" 
                          onClick={stopObjectDetection}
                          disabled={!cameraStream}
                        >
                          <i className="fas fa-stop me-2"></i>
                          Stop Detection
                        </Button>
                      </div>
                    </div>
                  </Col>
                  
                  <Col md="6">
                    <div className="detection-results">
                      <h6>Detection Results</h6>
                      {objectDetectionResults ? (
                        <p className="mb-0">{objectDetectionResults}</p>
                      ) : (
                        <p className="text-muted mb-0">Detection results will appear here...</p>
                      )}
                    </div>
                    
                    <hr />
                    
                    <div className="mt-3">
                      <h6>Upload Image for OCR</h6>
                      <Form.Group>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="mb-2"
                        />
                        <Form.Text className="text-muted">
                          Upload an image to extract text using OCR
                        </Form.Text>
                      </Form.Group>
                    </div>
                  </Col>
                </Row>
                
                <div className="text-center mt-3">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setActiveFeature(null)}
                  >
                    Close
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Accessible E-Commerce */}
      {activeFeature === 'e_commerce' && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-shopping-cart me-2"></i>
                  Accessible E-Commerce
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="8">
                    <div className="e-commerce-interface">
                      <h6>Product Catalog</h6>
                      <Row>
                        {[
                          { name: 'Accessibility Headphones', price: '$99.99', description: 'High-quality headphones with voice navigation' },
                          { name: 'Braille Keyboard', price: '$149.99', description: 'Tactile keyboard for visually impaired users' },
                          { name: 'Screen Reader Software', price: '$199.99', description: 'Advanced AI-powered screen reading solution' }
                        ].map((product, index) => (
                          <Col md="4" key={index} className="mb-3">
                            <Card className="h-100">
                              <Card.Body>
                                <h6>{product.name}</h6>
                                <p className="text-muted small">{product.description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="h5 text-primary">{product.price}</span>
                                  <Button size="sm" variant="primary">
                                    Add to Cart
                                  </Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Col>
                  
                  <Col md="4">
                    <Card>
                      <Card.Body>
                        <h6>Voice Navigation</h6>
                        <div className="d-grid gap-2">
                          <Button variant="outline-primary">
                            <i className="fas fa-microphone me-2"></i>
                            "Search for headphones"
                          </Button>
                          <Button variant="outline-success">
                            <i className="fas fa-microphone me-2"></i>
                            "Add to cart"
                          </Button>
                          <Button variant="outline-info">
                            <i className="fas fa-microphone me-2"></i>
                            "Checkout"
                          </Button>
                        </div>
                        
                        <hr />
                        
                        <h6>Accessibility Features</h6>
                        <ul className="list-unstyled small">
                          <li><i className="fas fa-check text-success me-2"></i>Voice Navigation</li>
                          <li><i className="fas fa-check text-success me-2"></i>Screen Reader Compatible</li>
                          <li><i className="fas fa-check text-success me-2"></i>High Contrast Mode</li>
                          <li><i className="fas fa-check text-success me-2"></i>Keyboard Navigation</li>
                          <li><i className="fas fa-check text-success me-2"></i>Audio Descriptions</li>
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                
                <div className="text-center mt-3">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setActiveFeature(null)}
                  >
                    Close
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Smart Navigation */}
      {activeFeature === 'navigation' && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-map-marked-alt me-2"></i>
                  Smart Navigation Assistant
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Current Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your current location"
                        defaultValue="123 Main Street, City"
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Destination</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Where would you like to go?"
                        defaultValue="Grocery Store"
                      />
                    </Form.Group>
                    
                    <div className="d-grid gap-2">
                      <Button variant="primary">
                        <i className="fas fa-route me-2"></i>
                        Get Directions
                      </Button>
                      <Button variant="info">
                        <i className="fas fa-volume-up me-2"></i>
                        Voice Navigation
                      </Button>
                    </div>
                  </Col>
                  
                  <Col md="6">
                    <div className="navigation-results">
                      <h6>Navigation Instructions</h6>
                      <div className="bg-light p-3 rounded">
                        <p><strong>Step 1:</strong> Walk 50 meters straight ahead</p>
                        <p><strong>Step 2:</strong> Turn right at the intersection</p>
                        <p><strong>Step 3:</strong> Continue for 200 meters</p>
                        <p><strong>Step 4:</strong> Destination on your left</p>
                      </div>
                      
                      <div className="mt-3">
                        <h6>Haptic Feedback</h6>
                        <div className="d-flex gap-2">
                          <Button size="sm" variant="outline-primary">Vibrate</Button>
                          <Button size="sm" variant="outline-success">Test Audio</Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                
                <div className="text-center mt-3">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setActiveFeature(null)}
                  >
                    Close
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Tips and Resources */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-lightbulb me-2"></i>
                Tips for Visually Impaired Users
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md="6">
                  <h6>🔍 Screen Reader Usage</h6>
                  <ul>
                    <li>Use keyboard shortcuts for navigation</li>
                    <li>Enable audio descriptions when available</li>
                    <li>Customize reading speed and voice</li>
                    <li>Use heading navigation for structure</li>
                  </ul>
                </Col>
                <Col md="6">
                  <h6>📱 Object Detection</h6>
                  <ul>
                    <li>Ensure good lighting for camera</li>
                    <li>Hold camera steady for better results</li>
                    <li>Use high contrast mode when possible</li>
                    <li>Check audio feedback for accuracy</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VisuallyImpaired;
