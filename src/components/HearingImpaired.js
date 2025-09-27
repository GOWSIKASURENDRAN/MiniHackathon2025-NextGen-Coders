import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form, Badge } from 'react-bootstrap';

const HearingImpaired = ({ user }) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [captions, setCaptions] = useState('');
  const [signLanguageText, setSignLanguageText] = useState('');
  const [emergencyAlert, setEmergencyAlert] = useState(false);
  const [webcamStream, setWebcamStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Simulate speech recognition
  const startSpeechRecognition = () => {
    setIsRecording(true);
    setCaptions('Listening...');
    
    // Simulate speech recognition
    setTimeout(() => {
      setCaptions('Hello, this is a simulated speech-to-text response. The system is working correctly.');
      setIsRecording(false);
    }, 3000);
  };

  const stopSpeechRecognition = () => {
    setIsRecording(false);
  };

  // Simulate sign language detection
  const startSignLanguageDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setWebcamStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setActiveFeature('sign_language');
      
      // Simulate gesture detection
      setTimeout(() => {
        setSignLanguageText('Detected gesture: Hello');
      }, 2000);
    } catch (error) {
      console.error('Error accessing webcam:', error);
      alert('Unable to access webcam. Please check permissions.');
    }
  };

  const stopSignLanguageDetection = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
    }
    setActiveFeature(null);
    setSignLanguageText('');
  };

  // Emergency alert system
  const triggerEmergencyAlert = () => {
    setEmergencyAlert(true);
    
    // Simulate emergency alert
    setTimeout(() => {
      setEmergencyAlert(false);
    }, 5000);
  };

  const features = [
    {
      id: 'live_captioning',
      title: 'Live Captioning',
      description: 'Real-time speech-to-text for video calls and meetings',
      icon: 'fas fa-closed-captioning',
      color: 'primary',
      action: () => setActiveFeature('live_captioning')
    },
    {
      id: 'sign_language',
      title: 'Sign Language Detection',
      description: 'AI-powered sign language gesture recognition',
      icon: 'fas fa-hands',
      color: 'success',
      action: startSignLanguageDetection
    },
    {
      id: 'emergency_alert',
      title: 'Emergency Alert System',
      description: 'IoT-powered emergency detection with alerts',
      icon: 'fas fa-exclamation-triangle',
      color: 'danger',
      action: triggerEmergencyAlert
    },
    {
      id: 'video_calls',
      title: 'Accessible Video Calls',
      description: 'Video calls with built-in captioning support',
      icon: 'fas fa-video',
      color: 'info',
      action: () => setActiveFeature('video_calls')
    }
  ];

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">
            <i className="fas fa-deaf me-2"></i>
            Hearing Impaired Features
          </h1>
          <p className="lead">
            Advanced tools and features designed specifically for hearing impaired users
          </p>
        </Col>
      </Row>

      {/* Emergency Alert */}
      {emergencyAlert && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" className="emergency-alert">
              <h4><i className="fas fa-exclamation-triangle me-2"></i>EMERGENCY ALERT</h4>
              <p className="mb-0">
                Emergency detected! Vibration and visual alerts have been activated. 
                Please check your surroundings and contact emergency services if needed.
              </p>
            </Alert>
          </Col>
        </Row>
      )}

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

      {/* Live Captioning Interface */}
      {activeFeature === 'live_captioning' && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-closed-captioning me-2"></i>
                  Live Captioning
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="video-call-container mb-3">
                  <div className="bg-dark text-white p-5 text-center rounded">
                    <i className="fas fa-video fa-3x mb-3"></i>
                    <p>Video call interface would be here</p>
                  </div>
                  <div className="caption-overlay">
                    <p className="mb-0">{captions || 'Captions will appear here...'}</p>
                  </div>
                </div>
                
                <div className="text-center">
                  {!isRecording ? (
                    <Button 
                      variant="primary" 
                      size="lg" 
                      onClick={startSpeechRecognition}
                      className="me-3"
                    >
                      <i className="fas fa-microphone me-2"></i>
                      Start Captioning
                    </Button>
                  ) : (
                    <Button 
                      variant="danger" 
                      size="lg" 
                      onClick={stopSpeechRecognition}
                      className="me-3"
                    >
                      <i className="fas fa-stop me-2"></i>
                      Stop Captioning
                    </Button>
                  )}
                  
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

      {/* Sign Language Detection Interface */}
      {activeFeature === 'sign_language' && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-hands me-2"></i>
                  Sign Language Detection
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="sign-language-container">
                  <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline 
                    className="webcam-feed mb-3"
                  />
                  
                  {signLanguageText && (
                    <div className="gesture-detection">
                      <h6>Detected Gesture:</h6>
                      <p className="mb-0">{signLanguageText}</p>
                    </div>
                  )}
                  
                  <div className="text-center mt-3">
                    <Button 
                      variant="danger" 
                      onClick={stopSignLanguageDetection}
                    >
                      <i className="fas fa-stop me-2"></i>
                      Stop Detection
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Video Calls Interface */}
      {activeFeature === 'video_calls' && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-video me-2"></i>
                  Accessible Video Calls
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="8">
                    <div className="video-call-container">
                      <div className="bg-dark text-white p-5 text-center rounded">
                        <i className="fas fa-video fa-3x mb-3"></i>
                        <p>Video call interface with integrated captioning</p>
                      </div>
                      <div className="caption-overlay">
                        <p className="mb-0">Live captions will appear here during the call</p>
                      </div>
                    </div>
                  </Col>
                  <Col md="4">
                    <h6>Call Controls</h6>
                    <div className="d-grid gap-2">
                      <Button variant="success">
                        <i className="fas fa-phone me-2"></i>
                        Join Call
                      </Button>
                      <Button variant="info">
                        <i className="fas fa-closed-captioning me-2"></i>
                        Toggle Captions
                      </Button>
                      <Button variant="warning">
                        <i className="fas fa-volume-up me-2"></i>
                        Adjust Volume
                      </Button>
                      <Button variant="secondary">
                        <i className="fas fa-cog me-2"></i>
                        Settings
                      </Button>
                    </div>
                    
                    <hr />
                    
                    <h6>Accessibility Features</h6>
                    <ul className="list-unstyled">
                      <li><i className="fas fa-check text-success me-2"></i>Live Captions</li>
                      <li><i className="fas fa-check text-success me-2"></i>Sign Language Support</li>
                      <li><i className="fas fa-check text-success me-2"></i>Visual Alerts</li>
                      <li><i className="fas fa-check text-success me-2"></i>Keyboard Navigation</li>
                    </ul>
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
                Tips for Hearing Impaired Users
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md="6">
                  <h6>🎤 Speech Recognition</h6>
                  <ul>
                    <li>Speak clearly and at a moderate pace</li>
                    <li>Reduce background noise when possible</li>
                    <li>Use a good quality microphone</li>
                    <li>Check captions for accuracy</li>
                  </ul>
                </Col>
                <Col md="6">
                  <h6>👋 Sign Language</h6>
                  <ul>
                    <li>Ensure good lighting for gesture detection</li>
                    <li>Keep hands visible to the camera</li>
                    <li>Use clear, deliberate gestures</li>
                    <li>Check the translation for accuracy</li>
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

export default HearingImpaired;
