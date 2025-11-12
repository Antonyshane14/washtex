import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Card, Button } from 'antd';

function SimpleApp() {
  return (
    <Router>
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Card>
          <h1>WashTex - Debugging</h1>
          <p>If you see this, React Router and Ant Design are working!</p>
          <Button type="primary">Test Button</Button>
        </Card>
      </div>
    </Router>
  );
}

export default SimpleApp;
