import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <h1>About Our Mission</h1>
          <p className="lead">
            Learn about our hackathon journey and commitment to accessibility
          </p>
        </Container>
      </section>

      {/* Mission Statement */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg="8">
              <Card className="border-0 shadow">
                <Card.Body className="p-5">
                  <h2 className="text-center mb-4">Our Mission</h2>
                  <p className="lead text-center mb-4">
                    "Making digital spaces inclusive for everyone."
                  </p>
                  <p>
                    We believe that technology should be accessible to all, regardless of ability. 
                    Our Inclusive Accessibility Platform was born from a simple yet powerful idea: 
                    what if we could create a single platform that addresses the diverse needs of 
                    both hearing and visually impaired communities?
                  </p>
                  <p>
                    Through the combination of artificial intelligence, IoT devices, and natural 
                    language processing, we've built a comprehensive solution that goes beyond 
                    traditional accessibility tools. Our platform doesn't just accommodate 
                    disabilities—it empowers users to fully participate in the digital world.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Hackathon Story */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col lg="6">
              <h2 className="mb-4">Our Hackathon Story</h2>
              <p>
                This project was developed during a hackathon focused on social impact and 
                accessibility. Our team recognized that while there are many individual tools 
                for accessibility, there wasn't a unified platform that could serve the diverse 
                needs of the disability community.
              </p>
              <p>
                We were inspired by the stories of people who struggle daily with digital 
                accessibility barriers. From students who can't access educational content 
                to professionals who face communication challenges in virtual meetings, 
                we saw an opportunity to make a real difference.
              </p>
              <p>
                Our solution combines multiple technologies in innovative ways:
              </p>
              <ul>
                <li>Real-time speech-to-text for live captioning</li>
                <li>AI-powered sign language detection using computer vision</li>
                <li>Object detection and narration for visual assistance</li>
                <li>IoT integration for emergency alerts</li>
                <li>NLP-powered content summarization for screen readers</li>
              </ul>
            </Col>
            <Col lg="6">
              <Card className="h-100">
                <Card.Body>
                  <h3 className="mb-3">Key Statistics</h3>
                  <div className="mb-3">
                    <h4 className="text-primary">1 Billion+</h4>
                    <p>People with disabilities worldwide</p>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-success">15%</h4>
                    <p>Of the global population has a disability</p>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-info">70%</h4>
                    <p>Of websites are not fully accessible</p>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-warning">$13 Trillion</h4>
                    <p>Annual spending power of people with disabilities</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Technology Stack */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">Technology Stack</h2>
          <Row>
            <Col md="6" lg="3" className="mb-4">
              <Card className="text-center h-100">
                <Card.Body>
                  <i className="fab fa-python fa-3x text-primary mb-3"></i>
                  <h4>Backend</h4>
                  <p>Flask, Django, FastAPI</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md="6" lg="3" className="mb-4">
              <Card className="text-center h-100">
                <Card.Body>
                  <i className="fab fa-react fa-3x text-info mb-3"></i>
                  <h4>Frontend</h4>
                  <p>React.js, Bootstrap</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md="6" lg="3" className="mb-4">
              <Card className="text-center h-100">
                <Card.Body>
                  <i className="fas fa-brain fa-3x text-success mb-3"></i>
                  <h4>AI/ML</h4>
                  <p>TensorFlow, OpenCV, spaCy</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md="6" lg="3" className="mb-4">
              <Card className="text-center h-100">
                <Card.Body>
                  <i className="fas fa-microchip fa-3x text-warning mb-3"></i>
                  <h4>IoT</h4>
                  <p>Raspberry Pi, Arduino</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Impact */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg="8">
              <h2 className="mb-4">Our Impact</h2>
              <p className="lead mb-4">
                We're not just building technology—we're building bridges to a more inclusive world.
              </p>
              <Row className="mt-5">
                <Col md="4" className="mb-4">
                  <i className="fas fa-users fa-3x mb-3"></i>
                  <h4>Community</h4>
                  <p>Empowering users to connect and communicate</p>
                </Col>
                <Col md="4" className="mb-4">
                  <i className="fas fa-graduation-cap fa-3x mb-3"></i>
                  <h4>Education</h4>
                  <p>Making learning accessible to everyone</p>
                </Col>
                <Col md="4" className="mb-4">
                  <i className="fas fa-briefcase fa-3x mb-3"></i>
                  <h4>Employment</h4>
                  <p>Breaking down barriers in the workplace</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg="6">
              <h2 className="mb-4">Get Involved</h2>
              <p className="lead">
                Join our mission to create a more accessible digital world.
              </p>
              <div className="mt-4">
                <a href="mailto:contact@accessibilityplatform.com" className="btn btn-primary me-3">
                  <i className="fas fa-envelope me-2"></i>
                  Contact Us
                </a>
                <a href="https://github.com/accessibility-platform" className="btn btn-outline-primary">
                  <i className="fab fa-github me-2"></i>
                  View on GitHub
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;
