import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, Card, message, Row, Col, Typography } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { userRoles } from '../utils/mockData';

const { Title, Text } = Typography;
const { Option } = Select;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const user = await login(values);
      message.success(`Welcome ${user.name}!`);
      
      // Navigate based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'store_manager':
        case 'store_staff':
          navigate('/store');
          break;
        case 'factory_manager':
        case 'factory_staff':
          navigate('/factory');
          break;
        case 'accountant':
          navigate('/accountant');
          break;
        case 'delivery_personnel':
          navigate('/tracking');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      message.error(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Row justify="center" style={{ width: '100%', padding: '20px' }}>
        <Col xs={22} sm={18} md={12} lg={8} xl={6}>
          <Card 
            style={{ 
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              borderRadius: '12px'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <Title level={2} style={{ color: '#667eea', marginBottom: '8px' }}>
                WashTex
              </Title>
              <Text type="secondary">Laundry Management System</Text>
            </div>

            <Form
              name="login"
              initialValues={{ 
                role: 'admin',
                username: 'admin',
                password: 'password'
              }}
              onFinish={onFinish}
              size="large"
              layout="vertical"
            >
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: 'Please select your role!' }]}
              >
                <Select 
                  placeholder="Select your role"
                  suffixIcon={<UserOutlined />}
                >
                  {userRoles.map(role => (
                    <Option key={role.value} value={role.value}>
                      {role.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<LoginOutlined />}
                  loading={loading}
                  block
                  style={{ height: '45px', fontSize: '16px' }}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              background: '#f0f2f5', 
              borderRadius: '8px' 
            }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                <strong>Demo Credentials:</strong><br />
                Username: admin (or any name)<br />
                Password: password<br />
                Role: Select from dropdown
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
