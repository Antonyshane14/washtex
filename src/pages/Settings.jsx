import React from 'react';
import { Card, Tabs, Form, Input, Button, Select, Space, Table, Tag, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MainLayout from '../components/Layout/MainLayout';
import { mockServiceTypes, mockItemCategories, userRoles } from '../utils/mockData';

const { Option } = Select;

const Settings = () => {
  const handleSaveService = (values) => {
    message.success('Service configuration saved');
  };

  const serviceColumns = [
    { title: 'Service Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Regular Price', dataIndex: 'price', key: 'price', render: (val) => `₹${val}` },
    { title: 'Express Price', dataIndex: 'expressPrice', key: 'expressPrice', render: (val) => `₹${val}` },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="link" icon={<EditOutlined />} size="small">Edit</Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small">Delete</Button>
        </Space>
      ),
    },
  ];

  const userColumns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Role', dataIndex: 'role', key: 'role', render: (role) => <Tag color="blue">{role}</Tag> },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: () => <Tag color="green">Active</Tag> },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="link" size="small">Edit</Button>
          <Button type="link" danger size="small">Deactivate</Button>
        </Space>
      ),
    },
  ];

  const mockUsers = [
    { username: 'admin', role: 'Admin', email: 'admin@washtex.com', status: 'active' },
    { username: 'store1', role: 'Store Manager', email: 'store1@washtex.com', status: 'active' },
    { username: 'factory1', role: 'Factory Manager', email: 'factory1@washtex.com', status: 'active' },
  ];

  const tabItems = [
    {
      key: 'services',
      label: 'Service Configuration',
      children: (
        <div>
          <Card title="Add New Service" style={{ marginBottom: '16px' }}>
            <Form layout="vertical" onFinish={handleSaveService}>
              <Form.Item name="name" label="Service Name" rules={[{ required: true }]}>
                <Input placeholder="e.g., Wash & Iron" />
              </Form.Item>
              <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                <Select placeholder="Select category">
                  <Option value="Regular">Regular</Option>
                  <Option value="Premium">Premium</Option>
                  <Option value="Special">Special</Option>
                </Select>
              </Form.Item>
              <Form.Item name="price" label="Regular Price (₹)" rules={[{ required: true }]}>
                <Input type="number" placeholder="Enter price" />
              </Form.Item>
              <Form.Item name="expressPrice" label="Express Price (₹)" rules={[{ required: true }]}>
                <Input type="number" placeholder="Enter express price" />
              </Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Add Service
              </Button>
            </Form>
          </Card>

          <Card title="Existing Services">
            <Table
              dataSource={mockServiceTypes}
              columns={serviceColumns}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </div>
      ),
    },
    {
      key: 'users',
      label: 'User Management',
      children: (
        <div>
          <Card title="Add New User" style={{ marginBottom: '16px' }}>
            <Form layout="vertical">
              <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                <Input placeholder="Enter username" />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input placeholder="Enter email" />
              </Form.Item>
              <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                <Select placeholder="Select role">
                  {userRoles.map(role => (
                    <Option key={role.value} value={role.value}>
                      {role.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password placeholder="Enter password" />
              </Form.Item>
              <Button type="primary" icon={<PlusOutlined />}>
                Add User
              </Button>
            </Form>
          </Card>

          <Card title="Existing Users">
            <Table
              dataSource={mockUsers}
              columns={userColumns}
              rowKey="username"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </div>
      ),
    },
    {
      key: 'system',
      label: 'System Configuration',
      children: (
        <Card>
          <Form layout="vertical">
            <Form.Item label="GST Rate (%)">
              <Input defaultValue="18" type="number" />
            </Form.Item>
            <Form.Item label="Default Currency">
              <Select defaultValue="INR">
                <Option value="INR">INR (₹)</Option>
                <Option value="USD">USD ($)</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Session Timeout (minutes)">
              <Input defaultValue="30" type="number" />
            </Form.Item>
            <Form.Item label="Enable Notifications">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item label="Enable WhatsApp Integration">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item label="Enable SMS Notifications">
              <Switch defaultChecked />
            </Form.Item>
            <Button type="primary">
              Save Configuration
            </Button>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <h2>System Settings</h2>
      </div>

      <Card>
        <Tabs items={tabItems} />
      </Card>
    </MainLayout>
  );
};

export default Settings;
