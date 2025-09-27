import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [quickStats, setQuickStats] = useState({
    sessionsToday: 0,
    featuresUsed: 0,
    accessibilityScore: 85
  });

  useEffect(() => {
    // Simulate loading user data and activity
    setRecentActivity([
      { id: 1, type: 'captioning', description: 'Used live captioning in video call', time: '2 hours ago' },
      { id: 2, type: 'sign_language', description: 'Detected sign language gesture', time: '4 hours ago' },
      { id: 3, type: 'screen_reader', description: 'Used screen reader assistant', time: '1 day ago' },
      { id: 4, type: 'object_detection', description: 'Detected objects with camera', time: '2 days ago' }
    ]);
  }, []);

  const getFeatureIcon = (type) => {
    const icons = {
      captioning: 'fas fa-closed-captioning',
      sign_language: 'fas fa-hands',
      screen_reader: 'fas fa-eye',
      object_detection: 'fas fa-camera',
      emergency: 'fas fa-exclamation-triangle'
    };
    return icons[type] || 'fas fa-cog';
  };

  const getFeatureColor = (type) => {
    const colors = {
      captioning: 'primary',
      sign_language: 'success',
      screen_reader: 'info',
      object_detection: 'warning',
      emergency: 'danger'
    };
    return colors[type] || 'secondary';
  };

  const quickActions = [
    {
      title: 'Live Captioning',
      description: 'Start real-time speech-to-text',
      icon: 'fas fa-closed-captioning',
      link: '/hearing',
      color: 'primary'
    },
    {
      title: 'Sign Language Detection',
      description: 'Detect and translate gestures',
      icon: 'fas fa-hands',
      link: '/hearing',
      color: 'success'
    },
    {
      title: 'Screen Reader Assistant',
      description: 'AI-powered content summarization',
      icon: 'fas fa-eye',
      link: '/visual',
      color: 'info'
    },
    {
      title: 'Object Detection',
      description: 'Identify objects with camera',
      icon: 'fas fa-camera',
      link: '/visual',
      color: 'warning'
    },
    {
      title: 'Emergency Alert',
      description: 'Send emergency notification',
      icon: 'fas fa-exclamation-triangle',
      link: '/hearing',
      color: 'danger'
    },
    {
      title: 'Accessibility Settings',
      description: 'Customize your experience',
      icon: 'fas fa-cog',
      link: '/settings',
      color: 'secondary'
    }
  ];

  return (
    <Container className="py-4">
      {/* Welcome Section */}
      <Row className="mb-4">
        <Col>
          <Card className="bg-primary text-white">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md="8">
                  <h1 className="mb-2">Welcome back, {user?.username}!</h1>
                  <p className="lead mb-0">
                    Your personalized accessibility dashboard is ready. 
                    Choose from the features below to get started.
                  </p>
                </Col>
                <Col md="4" className="text-end">
                  <i className="fas fa-user-circle fa-5x opacity-75"></i>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Stats */}
      <Row className="mb-4">
        <Col md="4">
          <Card className="text-center">
            <Card.Body>
              <i className="fas fa-calendar-day fa-2x text-primary mb-2"></i>
              <h3>{quickStats.sessionsToday}</h3>
              <p className="text-muted mb-0">Sessions Today</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card className="text-center">
            <Card.Body>
              <i className="fas fa-tools fa-2x text-success mb-2"></i>
              <h3>{quickStats.featuresUsed}</h3>
              <p className="text-muted mb-0">Features Used</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card className="text-center">
            <Card.Body>
              <i className="fas fa-chart-line fa-2x text-info mb-2"></i>
              <h3>{quickStats.accessibilityScore}%</h3>
              <p className="text-muted mb-0">Accessibility Score</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Quick Actions</h2>
          <Row>
            {quickActions.map((action, index) => (
              <Col md="6" lg="4" key={index} className="mb-3">
                <Card 
                  className={`accessibility-feature h-100 border-${action.color}`}
                  as={Link} 
                  to={action.link}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Card.Body className="text-center">
                    <i className={`${action.icon} fa-2x text-${action.color} mb-3`}></i>
                    <h5>{action.title}</h5>
                    <p className="text-muted small">{action.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              {recentActivity.length > 0 ? (
                <div className="list-group list-group-flush">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="list-group-item d-flex align-items-center">
                      <i className={`${getFeatureIcon(activity.type)} fa-lg text-${getFeatureColor(activity.type)} me-3`}></i>
                      <div className="flex-grow-1">
                        <p className="mb-1">{activity.description}</p>
                        <small className="text-muted">{activity.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center py-3">No recent activity</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md="4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Accessibility Tips</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h6>💡 Keyboard Navigation</h6>
                <p className="small text-muted mb-0">
                  Use Tab to navigate and Enter to activate buttons
                </p>
              </div>
              <div className="mb-3">
                <h6>🔊 Voice Commands</h6>
                <p className="small text-muted mb-0">
                  Enable voice navigation in settings for hands-free control
                </p>
              </div>
              <div className="mb-3">
                <h6>🎨 High Contrast</h6>
                <p className="small text-muted mb-0">
                  Toggle high contrast mode using the button in the top-right
                </p>
              </div>
              <div className="mb-0">
                <h6>📱 Mobile Friendly</h6>
                <p className="small text-muted mb-0">
                  All features work seamlessly on mobile devices
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Role Specific Content */}
      {user?.role === 'accessibility_advocate' && (
        <Row className="mt-4">
          <Col>
            <Alert variant="info">
              <h5><i className="fas fa-heart me-2"></i>Thank you for being an Accessibility Advocate!</h5>
              <p className="mb-0">
                Your role helps us improve accessibility features and support the community. 
                You have access to additional tools and can help other users.
              </p>
            </Alert>
          </Col>
        </Row>
      )}

      {user?.role === 'admin' && (
        <Row className="mt-4">
          <Col>
            <Alert variant="warning">
              <h5><i className="fas fa-shield-alt me-2"></i>Administrator Access</h5>
              <p className="mb-0">
                You have full access to all platform features and administrative tools. 
                Use your privileges responsibly to help maintain and improve the platform.
              </p>
            </Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
