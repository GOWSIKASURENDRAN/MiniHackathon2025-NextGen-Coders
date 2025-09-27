import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Navbar, Nav, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import HearingImpaired from './components/HearingImpaired';
import VisuallyImpaired from './components/VisuallyImpaired';
import InclusiveFeatures from './components/InclusiveFeatures';
import AccessibilitySettings from './components/AccessibilitySettings';

// Services
import { authService } from './services/authService';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeText: false,
    voiceNavigation: false,
    captions: true
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('access_token');
    if (token) {
      authService.getCurrentUser()
        .then(userData => {
          setUser(userData);
        })
        .catch(() => {
          localStorage.removeItem('access_token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    // Load accessibility settings
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      setAccessibilitySettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // Apply accessibility settings
    document.body.classList.toggle('high-contrast', accessibilitySettings.highContrast);
    document.body.style.fontSize = accessibilitySettings.largeText ? '20px' : '16px';
    
    // Save settings
    localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));
  }, [accessibilitySettings]);

  const handleLogin = (userData) => {
    setUser(userData);
    setAlert({ type: 'success', message: 'Login successful!' });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setAlert({ type: 'info', message: 'Logged out successfully' });
    setTimeout(() => setAlert(null), 3000);
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand href="/">
              <i className="fas fa-universal-access me-2"></i>
              Inclusive Accessibility Platform
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                {user && (
                  <>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/hearing">Hearing Features</Nav.Link>
                    <Nav.Link href="/visual">Visual Features</Nav.Link>
                    <Nav.Link href="/inclusive">Inclusive Features</Nav.Link>
                  </>
                )}
              </Nav>
              <Nav>
                {user ? (
                  <>
                    <Nav.Link href="/settings">
                      <i className="fas fa-cog me-1"></i>
                      Settings
                    </Nav.Link>
                    <Nav.Link onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-1"></i>
                      Logout
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {alert && (
          <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        )}

        <Container fluid>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} showAlert={showAlert} />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/dashboard" /> : <Register showAlert={showAlert} />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/hearing" 
              element={user ? <HearingImpaired user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/visual" 
              element={user ? <VisuallyImpaired user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/inclusive" 
              element={user ? <InclusiveFeatures user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/settings" 
              element={user ? <AccessibilitySettings settings={accessibilitySettings} setSettings={setAccessibilitySettings} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </Container>

        <footer className="bg-dark text-light text-center py-4 mt-5">
          <Container>
            <p>&copy; 2024 Inclusive Accessibility Platform. Making digital spaces accessible for everyone.</p>
            <p>
              <small>
                Built with ❤️ for the accessibility community | 
                <a href="/about" className="text-light ms-1">Learn more about our mission</a>
              </small>
            </p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;
