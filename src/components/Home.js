import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: 'fas fa-deaf',
      title: 'Hearing Impaired Features',
      description: 'Live captioning, sign language detection, and emergency alerts for hearing impaired users.',
      link: '/hearing',
      color: 'primary'
    },
    {
      icon: 'fas fa-eye',
      title: 'Visually Impaired Features',
      description: 'AI-powered screen reader, object detection, and accessible e-commerce for visually impaired users.',
      link: '/visual',
      color: 'success'
    },
    {
      icon: 'fas fa-users',
      title: 'Inclusive Features',
      description: 'Multi-mode communication, inclusive education, and smart navigation for everyone.',
      link: '/inclusive',
      color: 'info'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Education Platform',
      description: 'Accessible learning with captions, transcripts, and haptic feedback.',
      link: '/inclusive',
      color: 'warning'
    },
    {
      icon: 'fas fa-phone',
      title: 'Emergency Alerts',
      description: 'IoT-powered emergency detection with vibration and visual alerts.',
      link: '/hearing',
      color: 'danger'
    },
    {
      icon: 'fas fa-shopping-cart',
      title: 'Accessible E-Commerce',
      description: 'Voice navigation, screen reader compatibility, and high-contrast shopping.',
      link: '/visual',
      color: 'secondary'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <h1>Inclusive Accessibility Platform</h1>
          <p className="lead">
            Making digital spaces accessible for everyone through AI, IoT, and innovative technology
          </p>
          <div className="mt-4">
            <Button variant="light" size="lg" className="me-3" as={Link} to="/register">
              Get Started
            </Button>
            <Button variant="outline-light" size="lg" as={Link} to="/about">
              Learn More
            </Button>
          </div>
        </Container>
      </section>

      {/* Mission Statement */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg="8">
              <h2 className="mb-4">Our Mission</h2>
              <p className="lead">
                "Making digital spaces inclusive for everyone." We believe technology should be 
                accessible to all, regardless of ability. Our platform combines cutting-edge AI, 
                IoT, and NLP technologies to create a comprehensive accessibility solution.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Accessibility Features</h2>
          <Row>
            {features.map((feature, index) => (
              <Col md="6" lg="4" key={index} className="mb-4">
                <Card 
                  className={`accessibility-feature h-100 border-${feature.color}`}
                  as={Link} 
                  to={feature.link}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Card.Body className="d-flex flex-column justify-content-center">
                    <i className={`${feature.icon} feature-icon text-${feature.color}`}></i>
                    <h3 className="h5">{feature.title}</h3>
                    <p className="text-muted">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Statistics */}
      <section className="py-5">
        <Container>
          <Row className="text-center">
            <Col md="3" className="mb-4">
              <div className="h2 text-primary">1B+</div>
              <p>People with disabilities worldwide</p>
            </Col>
            <Col md="3" className="mb-4">
              <div className="h2 text-success">15%</div>
              <p>Of global population has a disability</p>
            </Col>
            <Col md="3" className="mb-4">
              <div className="h2 text-info">70%</div>
              <p>Of websites are not fully accessible</p>
            </Col>
            <Col md="3" className="mb-4">
              <div className="h2 text-warning">100%</div>
              <p>Our commitment to accessibility</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="mb-4">Ready to Make a Difference?</h2>
          <p className="lead mb-4">
            Join our mission to create a more inclusive digital world. 
            Start using our platform today or contribute to our open-source project.
          </p>
          <div>
            <Button variant="light" size="lg" className="me-3" as={Link} to="/register">
              Start Now
            </Button>
            <Button variant="outline-light" size="lg" href="#contact">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
