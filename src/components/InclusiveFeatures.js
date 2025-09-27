import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form, Badge, ProgressBar } from 'react-bootstrap';

const InclusiveFeatures = ({ user }) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [communicationMode, setCommunicationMode] = useState('voice');
  const [lessonProgress, setLessonProgress] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(null);

  const features = [
    {
      id: 'education',
      title: 'Inclusive Education Platform',
      description: 'Accessible learning with multiple formats',
      icon: 'fas fa-graduation-cap',
      color: 'primary',
      action: () => setActiveFeature('education')
    },
    {
      id: 'communication',
      title: 'Multi-Mode Communication',
      description: 'Voice, text, sign language, and braille',
      icon: 'fas fa-comments',
      color: 'success',
      action: () => setActiveFeature('communication')
    },
    {
      id: 'navigation',
      title: 'Smart Navigation',
      description: 'Indoor/outdoor navigation with haptic feedback',
      icon: 'fas fa-map-marked-alt',
      color: 'info',
      action: () => setActiveFeature('navigation')
    },
    {
      id: 'community',
      title: 'Community Hub',
      description: 'Connect with other users and advocates',
      icon: 'fas fa-users',
      color: 'warning',
      action: () => setActiveFeature('community')
    }
  ];

  const lessons = [
    {
      id: 1,
      title: 'Introduction to Digital Accessibility',
      description: 'Learn the basics of accessible technology',
      duration: '15 minutes',
      progress: 75,
      type: 'video',
      hasCaptions: true,
      hasTranscript: true,
      hasAudioDescription: true
    },
    {
      id: 2,
      title: 'Using Screen Readers Effectively',
      description: 'Master screen reader navigation and shortcuts',
      duration: '20 minutes',
      progress: 45,
      type: 'interactive',
      hasCaptions: true,
      hasTranscript: true,
      hasAudioDescription: false
    },
    {
      id: 3,
      title: 'Sign Language Communication',
      description: 'Learn basic sign language gestures',
      duration: '25 minutes',
      progress: 0,
      type: 'hands-on',
      hasCaptions: true,
      hasTranscript: true,
      hasAudioDescription: true
    }
  ];

  const startLesson = (lesson) => {
    setCurrentLesson(lesson);
    setLessonProgress(lesson.progress);
  };

  const updateProgress = (progress) => {
    setLessonProgress(progress);
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">
            <i className="fas fa-users me-2"></i>
            Inclusive Features
          </h1>
          <p className="lead">
            Universal features designed to benefit all users, regardless of ability
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

      {/* Education Platform */}
      {activeFeature === 'education' && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-graduation-cap me-2"></i>
                  Inclusive Education Platform
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="8">
                    <h6>Available Lessons</h6>
                    {lessons.map((lesson) => (
                      <Card key={lesson.id} className="mb-3">
                        <Card.Body>
                          <Row className="align-items-center">
                            <Col md="8">
                              <h6 className="mb-1">{lesson.title}</h6>
                              <p className="text-muted small mb-2">{lesson.description}</p>
                              <div className="d-flex gap-2 mb-2">
                                <Badge bg="info">{lesson.duration}</Badge>
                                <Badge bg="secondary">{lesson.type}</Badge>
                                {lesson.hasCaptions && <Badge bg="success">Captions</Badge>}
                                {lesson.hasTranscript && <Badge bg="primary">Transcript</Badge>}
                                {lesson.hasAudioDescription && <Badge bg="warning">Audio Description</Badge>}
                              </div>
                              <ProgressBar 
                                now={lesson.progress} 
                                label={`${lesson.progress}%`}
                                className="mb-2"
                              />
                            </Col>
                            <Col md="4" className="text-end">
                              <Button 
                                variant="primary" 
                                onClick={() => startLesson(lesson)}
                                className="me-2"
                              >
                                {lesson.progress > 0 ? 'Continue' : 'Start'}
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </Col>
                  
                  <Col md="4">
                    <Card>
                      <Card.Body>
                        <h6>Accessibility Features</h6>
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <i className="fas fa-closed-captioning text-success me-2"></i>
                            Live Captions
                          </li>
                          <li className="mb-2">
                            <i className="fas fa-file-text text-primary me-2"></i>
                            Transcripts
                          </li>
                          <li className="mb-2">
                            <i className="fas fa-volume-up text-info me-2"></i>
                            Audio Descriptions
                          </li>
                          <li className="mb-2">
                            <i className="fas fa-hand-paper text-warning me-2"></i>
                            Haptic Feedback
                          </li>
                          <li className="mb-2">
                            <i className="fas fa-keyboard text-secondary me-2"></i>
                            Keyboard Navigation
                          </li>
                        </ul>
                        
                        <hr />
                        
                        <h6>Learning Progress</h6>
                        <div className="text-center">
                          <div className="h3 text-primary">{lessonProgress}%</div>
                          <p className="text-muted small">Overall Progress</p>
                        </div>
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

      {/* Multi-Mode Communication */}
      {activeFeature === 'communication' && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-comments me-2"></i>
                  Multi-Mode Communication
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <h6>Communication Modes</h6>
                    <div className="d-grid gap-2 mb-3">
                      <Button 
                        variant={communicationMode === 'voice' ? 'primary' : 'outline-primary'}
                        onClick={() => setCommunicationMode('voice')}
                      >
                        <i className="fas fa-microphone me-2"></i>
                        Voice Communication
                      </Button>
                      <Button 
                        variant={communicationMode === 'text' ? 'primary' : 'outline-primary'}
                        onClick={() => setCommunicationMode('text')}
                      >
                        <i className="fas fa-keyboard me-2"></i>
                        Text Chat
                      </Button>
                      <Button 
                        variant={communicationMode === 'sign' ? 'primary' : 'outline-primary'}
                        onClick={() => setCommunicationMode('sign')}
                      >
                        <i className="fas fa-hands me-2"></i>
                        Sign Language
                      </Button>
                      <Button 
                        variant={communicationMode === 'braille' ? 'primary' : 'outline-primary'}
                        onClick={() => setCommunicationMode('braille')}
                      >
                        <i className="fas fa-braille me-2"></i>
                        Braille Output
                      </Button>
                    </div>
                    
                    <div className="communication-interface">
                      {communicationMode === 'voice' && (
                        <div className="text-center p-4 bg-light rounded">
                          <i className="fas fa-microphone fa-3x text-primary mb-3"></i>
                          <p>Voice communication interface</p>
                          <Button variant="success" className="me-2">
                            <i className="fas fa-play me-2"></i>
                            Start Speaking
                          </Button>
                          <Button variant="danger">
                            <i className="fas fa-stop me-2"></i>
                            Stop
                          </Button>
                        </div>
                      )}
                      
                      {communicationMode === 'text' && (
                        <div>
                          <Form.Control
                            as="textarea"
                            rows="4"
                            placeholder="Type your message here..."
                            className="mb-2"
                          />
                          <Button variant="primary">
                            <i className="fas fa-paper-plane me-2"></i>
                            Send Message
                          </Button>
                        </div>
                      )}
                      
                      {communicationMode === 'sign' && (
                        <div className="text-center p-4 bg-light rounded">
                          <i className="fas fa-hands fa-3x text-success mb-3"></i>
                          <p>Sign language detection active</p>
                          <p className="text-muted">Detected: "Hello, how are you?"</p>
                        </div>
                      )}
                      
                      {communicationMode === 'braille' && (
                        <div className="text-center p-4 bg-light rounded">
                          <i className="fas fa-braille fa-3x text-warning mb-3"></i>
                          <p>Braille output mode</p>
                          <p className="text-muted">Content will be converted to braille format</p>
                        </div>
                      )}
                    </div>
                  </Col>
                  
                  <Col md="6">
                    <h6>Communication Settings</h6>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Language</Form.Label>
                        <Form.Select>
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </Form.Select>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Voice Speed</Form.Label>
                        <Form.Range min="0.5" max="2" step="0.1" defaultValue="1" />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Font Size</Form.Label>
                        <Form.Range min="12" max="24" step="2" defaultValue="16" />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          label="Enable Haptic Feedback"
                          defaultChecked
                        />
                        <Form.Check
                          type="checkbox"
                          label="Enable Audio Cues"
                          defaultChecked
                        />
                        <Form.Check
                          type="checkbox"
                          label="Enable Visual Alerts"
                        />
                      </Form.Group>
                    </Form>
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
                      <Button variant="success">
                        <i className="fas fa-hand-paper me-2"></i>
                        Haptic Feedback
                      </Button>
                    </div>
                  </Col>
                  
                  <Col md="6">
                    <div className="navigation-results">
                      <h6>Navigation Instructions</h6>
                      <div className="bg-light p-3 rounded mb-3">
                        <p><strong>Step 1:</strong> Walk 50 meters straight ahead</p>
                        <p><strong>Step 2:</strong> Turn right at the intersection</p>
                        <p><strong>Step 3:</strong> Continue for 200 meters</p>
                        <p><strong>Step 4:</strong> Destination on your left</p>
                      </div>
                      
                      <h6>Accessibility Features</h6>
                      <ul className="list-unstyled">
                        <li><i className="fas fa-check text-success me-2"></i>Voice instructions</li>
                        <li><i className="fas fa-check text-success me-2"></i>Haptic feedback</li>
                        <li><i className="fas fa-check text-success me-2"></i>Visual alerts</li>
                        <li><i className="fas fa-check text-success me-2"></i>Obstacle detection</li>
                      </ul>
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

      {/* Community Hub */}
      {activeFeature === 'community' && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-users me-2"></i>
                  Community Hub
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="8">
                    <h6>Recent Discussions</h6>
                    {[
                      { title: 'Tips for Using Screen Readers', author: 'Sarah M.', replies: 12, time: '2 hours ago' },
                      { title: 'Best Practices for Accessible Design', author: 'John D.', replies: 8, time: '5 hours ago' },
                      { title: 'New Features Feedback', author: 'Admin', replies: 15, time: '1 day ago' }
                    ].map((discussion, index) => (
                      <Card key={index} className="mb-2">
                        <Card.Body className="py-2">
                          <Row className="align-items-center">
                            <Col md="8">
                              <h6 className="mb-1">{discussion.title}</h6>
                              <small className="text-muted">by {discussion.author} • {discussion.time}</small>
                            </Col>
                            <Col md="4" className="text-end">
                              <Badge bg="primary">{discussion.replies} replies</Badge>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </Col>
                  
                  <Col md="4">
                    <Card>
                      <Card.Body>
                        <h6>Community Stats</h6>
                        <div className="text-center mb-3">
                          <div className="h3 text-primary">1,234</div>
                          <p className="text-muted small">Active Members</p>
                        </div>
                        
                        <div className="text-center mb-3">
                          <div className="h3 text-success">567</div>
                          <p className="text-muted small">Discussions</p>
                        </div>
                        
                        <div className="text-center mb-3">
                          <div className="h3 text-info">2,890</div>
                          <p className="text-muted small">Posts</p>
                        </div>
                        
                        <Button variant="primary" className="w-100">
                          <i className="fas fa-plus me-2"></i>
                          Start Discussion
                        </Button>
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

      {/* Tips and Resources */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-lightbulb me-2"></i>
                Inclusive Design Tips
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md="6">
                  <h6>🎓 Education</h6>
                  <ul>
                    <li>Provide multiple learning formats</li>
                    <li>Include captions and transcripts</li>
                    <li>Use clear, simple language</li>
                    <li>Offer hands-on practice opportunities</li>
                  </ul>
                </Col>
                <Col md="6">
                  <h6>💬 Communication</h6>
                  <ul>
                    <li>Support multiple communication modes</li>
                    <li>Provide real-time translation</li>
                    <li>Include visual and audio cues</li>
                    <li>Respect individual preferences</li>
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

export default InclusiveFeatures;
