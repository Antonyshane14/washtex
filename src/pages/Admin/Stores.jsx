import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, ShopOutlined, TeamOutlined } from '@ant-design/icons';
import MainLayout from '../../components/Layout/MainLayout';
import { mockStores } from '../../utils/mockData';

const { Option } = Select;

const AdminStores = () => {
  const [stores, setStores] = useState(mockStores);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Store ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Store Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Staff',
      dataIndex: 'staff',
      key: 'staff',
      render: (staff) => <Tag color="blue">{staff} members</Tag>,
    },
    {
      title: 'Today Orders',
      dataIndex: 'todayOrders',
      key: 'todayOrders',
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue) => `₹${revenue.toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} onClick={() => viewStore(record)}>
            View
          </Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => editStore(record)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const viewStore = (store) => {
    setSelectedStore(store);
    Modal.info({
      title: `Store Details - ${store.name}`,
      width: 600,
      content: (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Store ID:</strong> {store.id}</p>
          <p><strong>Location:</strong> {store.location}</p>
          <p><strong>Manager:</strong> {store.manager}</p>
          <p><strong>Phone:</strong> {store.phone}</p>
          <p><strong>Staff Count:</strong> {store.staff}</p>
          <p><strong>Today's Orders:</strong> {store.todayOrders}</p>
          <p><strong>Pending Orders:</strong> {store.pendingOrders}</p>
          <p><strong>Today's Revenue:</strong> ₹{store.revenue.toLocaleString()}</p>
          <p><strong>Status:</strong> <Tag color="green">{store.status.toUpperCase()}</Tag></p>
        </div>
      ),
    });
  };

  const editStore = (store) => {
    setSelectedStore(store);
    form.setFieldsValue(store);
    setModalVisible(true);
  };

  const handleAddStore = () => {
    setSelectedStore(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleSubmit = (values) => {
    if (selectedStore) {
      // Update existing store
      setStores(stores.map(s => s.id === selectedStore.id ? { ...s, ...values } : s));
      message.success('Store updated successfully');
    } else {
      // Add new store
      const newStore = {
        ...values,
        id: `ST${String(stores.length + 1).padStart(3, '0')}`,
        todayOrders: 0,
        pendingOrders: 0,
        revenue: 0,
      };
      setStores([...stores, newStore]);
      message.success('Store added successfully');
    }
    setModalVisible(false);
    form.resetFields();
  };

  const totalStats = {
    totalStores: stores.length,
    activeStores: stores.filter(s => s.status === 'active').length,
    totalOrders: stores.reduce((sum, s) => sum + s.todayOrders, 0),
    totalRevenue: stores.reduce((sum, s) => sum + s.revenue, 0),
  };

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Store Management</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddStore}>
          Add New Store
        </Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Stores"
              value={totalStats.totalStores}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Stores"
              value={totalStats.activeStores}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders Today"
              value={totalStats.totalOrders}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={totalStats.totalRevenue}
              prefix="₹"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Table
          dataSource={stores}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={selectedStore ? 'Edit Store' : 'Add New Store'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Store Name"
            rules={[{ required: true, message: 'Please enter store name' }]}
          >
            <Input placeholder="Enter store name" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter location' }]}
          >
            <Input placeholder="Enter location" />
          </Form.Item>

          <Form.Item
            name="manager"
            label="Manager Name"
            rules={[{ required: true, message: 'Please enter manager name' }]}
          >
            <Input placeholder="Enter manager name" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            name="staff"
            label="Staff Count"
            rules={[{ required: true, message: 'Please enter staff count' }]}
          >
            <Input type="number" placeholder="Enter staff count" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {selectedStore ? 'Update' : 'Add'} Store
              </Button>
              <Button onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </MainLayout>
  );
};

export default AdminStores;
