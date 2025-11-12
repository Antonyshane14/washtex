import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import './index.css';

console.log('🚀 Main.jsx loaded');

const root = document.getElementById('root');

if (!root) {
  console.error('❌ Root element not found!');
} else {
  console.log('✅ Root element found');
  
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1890ff',
              borderRadius: 6,
            },
          }}
        >
          <App />
        </ConfigProvider>
      </React.StrictMode>
    );
    console.log('✅ React rendered');
  } catch (error) {
    console.error('❌ Render error:', error);
  }
}
