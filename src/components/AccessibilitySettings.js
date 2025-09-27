import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Switch } from 'react-bootstrap';

const AccessibilitySettings = ({ settings, setSettings }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSettingChange = (setting, value) => {
    const newSettings = {
      ...settings,
      [setting]: value
    };
    setSettings(newSettings);
    
    // Show confirmation
    setAlertMessage(`Setting updated: ${setting} is now ${value ? 'enabled' : 'disabled'}`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to the backend
    setAlertMessage('Settings saved successfully!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      highContrast: false,
      largeText: false,
      voiceNavigation: false,
      captions: true,
      screenReader: false,
      hapticFeedback: false,
      audioCues: true,
      visualAlerts: false,
      keyboardNavigation: true,
      reducedMotion: false
    };
    setSettings(defaultSettings);
    setAlertMessage('Settings reset to defaults');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">
            <i className="fas fa-cog me-2"></i>
            Accessibility Settings
          </h1>
          <p className="lead">
            Customize your experience to match your accessibility needs
          </p>
        </Col>
      </Row>

      {showAlert && (
        <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
          {alertMessage}
        </Alert>
      )}

      <Row>
        {/* Visual Settings */}
        <Col md="6" className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-eye me-2"></i>
                Visual Settings
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="highContrast"
                    label="High Contrast Mode"
                    checked={settings.highContrast}
                    onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
                    help="Increases contrast for better visibility"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="largeText"
                    label="Large Text"
                    checked={settings.largeText}
                    onChange={(e) => handleSettingChange('largeText', e.target.checked)}
                    help="Increases text size for better readability"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="reducedMotion"
                    label="Reduce Motion"
                    checked={settings.reducedMotion}
                    onChange={(e) => handleSettingChange('reducedMotion', e.target.checked)}
                    help="Reduces animations and transitions"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Color Theme</Form.Label>
                  <Form.Select
                    value={settings.colorTheme || 'default'}
                    onChange={(e) => handleSettingChange('colorTheme', e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="dark">Dark Mode</option>
                    <option value="light">Light Mode</option>
                    <option value="high-contrast">High Contrast</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Font Size</Form.Label>
                  <Form.Range
                    min="12"
                    max="24"
                    step="2"
                    value={settings.fontSize || 16}
                    onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value))}
                  />
                  <Form.Text className="text-muted">
                    Current size: {settings.fontSize || 16}px
                  </Form.Text>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Audio Settings */}
        <Col md="6" className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-volume-up me-2"></i>
                Audio Settings
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="voiceNavigation"
                    label="Voice Navigation"
                    checked={settings.voiceNavigation}
                    onChange={(e) => handleSettingChange('voiceNavigation', e.target.checked)}
                    help="Enables voice commands for navigation"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="captions"
                    label="Enable Captions"
                    checked={settings.captions}
                    onChange={(e) => handleSettingChange('captions', e.target.checked)}
                    help="Shows captions for audio content"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="audioCues"
                    label="Audio Cues"
                    checked={settings.audioCues}
                    onChange={(e) => handleSettingChange('audioCues', e.target.checked)}
                    help="Plays audio feedback for actions"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Voice Speed</Form.Label>
                  <Form.Range
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={settings.voiceSpeed || 1}
                    onChange={(e) => handleSettingChange('voiceSpeed', parseFloat(e.target.value))}
                  />
                  <Form.Text className="text-muted">
                    Current speed: {settings.voiceSpeed || 1}x
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Volume</Form.Label>
                  <Form.Range
                    min="0"
                    max="100"
                    step="5"
                    value={settings.volume || 50}
                    onChange={(e) => handleSettingChange('volume', parseInt(e.target.value))}
                  />
                  <Form.Text className="text-muted">
                    Current volume: {settings.volume || 50}%
                  </Form.Text>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Interaction Settings */}
        <Col md="6" className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-hand-paper me-2"></i>
                Interaction Settings
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="keyboardNavigation"
                    label="Keyboard Navigation"
                    checked={settings.keyboardNavigation}
                    onChange={(e) => handleSettingChange('keyboardNavigation', e.target.checked)}
                    help="Enables full keyboard navigation"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="hapticFeedback"
                    label="Haptic Feedback"
                    checked={settings.hapticFeedback}
                    onChange={(e) => handleSettingChange('hapticFeedback', e.target.checked)}
                    help="Provides tactile feedback for actions"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="visualAlerts"
                    label="Visual Alerts"
                    checked={settings.visualAlerts}
                    onChange={(e) => handleSettingChange('visualAlerts', e.target.checked)}
                    help="Shows visual notifications"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Click Sensitivity</Form.Label>
                  <Form.Range
                    min="1"
                    max="10"
                    step="1"
                    value={settings.clickSensitivity || 5}
                    onChange={(e) => handleSettingChange('clickSensitivity', parseInt(e.target.value))}
                  />
                  <Form.Text className="text-muted">
                    Current sensitivity: {settings.clickSensitivity || 5}/10
                  </Form.Text>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Screen Reader Settings */}
        <Col md="6" className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-eye me-2"></i>
                Screen Reader Settings
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="screenReader"
                    label="Enable Screen Reader"
                    checked={settings.screenReader}
                    onChange={(e) => handleSettingChange('screenReader', e.target.checked)}
                    help="Activates screen reader functionality"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Reading Speed</Form.Label>
                  <Form.Range
                    min="50"
                    max="300"
                    step="10"
                    value={settings.readingSpeed || 150}
                    onChange={(e) => handleSettingChange('readingSpeed', parseInt(e.target.value))}
                  />
                  <Form.Text className="text-muted">
                    Current speed: {settings.readingSpeed || 150} words per minute
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Voice Type</Form.Label>
                  <Form.Select
                    value={settings.voiceType || 'default'}
                    onChange={(e) => handleSettingChange('voiceType', e.target.value)}
                  >
                    <option value="default">Default Voice</option>
                    <option value="male">Male Voice</option>
                    <option value="female">Female Voice</option>
                    <option value="child">Child Voice</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="readHeaders"
                    label="Read Headers"
                    checked={settings.readHeaders}
                    onChange={(e) => handleSettingChange('readHeaders', e.target.checked)}
                    help="Announces section headers when reading"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="readLinks"
                    label="Read Links"
                    checked={settings.readLinks}
                    onChange={(e) => handleSettingChange('readLinks', e.target.checked)}
                    help="Announces link destinations"
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Action Buttons */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">Save Your Settings</h5>
                  <p className="text-muted mb-0">Your preferences will be saved and applied across all devices</p>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" onClick={resetToDefaults}>
                    <i className="fas fa-undo me-2"></i>
                    Reset to Defaults
                  </Button>
                  <Button variant="primary" onClick={handleSaveSettings}>
                    <i className="fas fa-save me-2"></i>
                    Save Settings
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Accessibility Tips */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-lightbulb me-2"></i>
                Accessibility Tips
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md="6">
                  <h6>🎨 Visual Accessibility</h6>
                  <ul>
                    <li>Use high contrast for better visibility</li>
                    <li>Increase text size if needed</li>
                    <li>Enable reduced motion for sensitive users</li>
                    <li>Choose colors that work for colorblind users</li>
                  </ul>
                </Col>
                <Col md="6">
                  <h6>🔊 Audio Accessibility</h6>
                  <ul>
                    <li>Enable captions for all audio content</li>
                    <li>Use clear, simple language</li>
                    <li>Provide audio descriptions for visual content</li>
                    <li>Allow users to control playback speed</li>
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

export default AccessibilitySettings;
