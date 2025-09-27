import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Register = ({ showAlert }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'normal_user',
    accessibility_needs: {
      highContrast: false,
      largeText: false,
      voiceNavigation: false,
      captions: true,
      screenReader: false
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('accessibility_')) {
      const settingName = name.replace('accessibility_', '');
      setFormData({
        ...formData,
        accessibility_needs: {
          ...formData.accessibility_needs,
          [settingName]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      await authService.register(formData);
      showAlert('success', 'Account created successfully! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md="8" lg="6">
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <i className="fas fa-user-plus fa-3x text-primary mb-3"></i>
                <h2>Create Account</h2>
                <p className="text-muted">Join our inclusive accessibility community</p>
              </div>

              {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="username">Username *</Form.Label>
                      <Form.Control
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        aria-describedby="usernameHelp"
                        autoComplete="username"
                      />
                      <Form.Text id="usernameHelp" className="text-muted">
                        Choose a unique username
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="email">Email *</Form.Label>
                      <Form.Control
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-describedby="emailHelp"
                        autoComplete="email"
                      />
                      <Form.Text id="emailHelp" className="text-muted">
                        We'll never share your email
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="password">Password *</Form.Label>
                      <Form.Control
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        aria-describedby="passwordHelp"
                        autoComplete="new-password"
                      />
                      <Form.Text id="passwordHelp" className="text-muted">
                        Minimum 6 characters
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="confirmPassword">Confirm Password *</Form.Label>
                      <Form.Control
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        aria-describedby="confirmPasswordHelp"
                        autoComplete="new-password"
                      />
                      <Form.Text id="confirmPasswordHelp" className="text-muted">
                        Re-enter your password
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="role">User Type</Form.Label>
                  <Form.Select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    aria-describedby="roleHelp"
                  >
                    <option value="normal_user">Normal User</option>
                    <option value="accessibility_advocate">Accessibility Advocate</option>
                    <option value="admin">Administrator</option>
                  </Form.Select>
                  <Form.Text id="roleHelp" className="text-muted">
                    Choose your role in the community
                  </Form.Text>
                </Form.Group>

                {/* Accessibility Preferences */}
                <Card className="mb-3">
                  <Card.Header>
                    <h5 className="mb-0">Accessibility Preferences</h5>
                    <small className="text-muted">Customize your experience</small>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md="6">
                        <Form.Check
                          type="checkbox"
                          id="accessibility_highContrast"
                          name="accessibility_highContrast"
                          label="High Contrast Mode"
                          checked={formData.accessibility_needs.highContrast}
                          onChange={handleChange}
                        />
                        <Form.Check
                          type="checkbox"
                          id="accessibility_largeText"
                          name="accessibility_largeText"
                          label="Large Text"
                          checked={formData.accessibility_needs.largeText}
                          onChange={handleChange}
                        />
                        <Form.Check
                          type="checkbox"
                          id="accessibility_voiceNavigation"
                          name="accessibility_voiceNavigation"
                          label="Voice Navigation"
                          checked={formData.accessibility_needs.voiceNavigation}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md="6">
                        <Form.Check
                          type="checkbox"
                          id="accessibility_captions"
                          name="accessibility_captions"
                          label="Enable Captions"
                          checked={formData.accessibility_needs.captions}
                          onChange={handleChange}
                        />
                        <Form.Check
                          type="checkbox"
                          id="accessibility_screenReader"
                          name="accessibility_screenReader"
                          label="Screen Reader Support"
                          checked={formData.accessibility_needs.screenReader}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus me-2"></i>
                      Create Account
                    </>
                  )}
                </Button>
              </Form>

              <div className="text-center">
                <p className="mb-0">
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-none">
                    Login here
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
