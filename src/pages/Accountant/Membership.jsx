import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, message, Row, Col, Progress } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import MainLayout from '../../components/Layout/MainLayout';
import { mockMembershipPlans, mockCustomers } from '../../utils/mockData';

const { Option } = Select;

const AccountantMembership = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const customerMemberships = mockCustomers.map(customer => ({
    ...customer,
    usagePercent: Math.round((customer.membershipBalance / customer.totalBalance) * 100),
  }));

  const customerColumns = [
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Plan',
      dataIndex: 'membershipType',
      key: 'membershipType',
      render: (type) => <Tag color="gold">{type}</Tag>,
    },
    {
      title: 'Balance',
      dataIndex: 'membershipBalance',
      key: 'membershipBalance',
      render: (balance, record) => `${balance}/${record.totalBalance} items`,
    },
    {
      title: 'Usage',
      dataIndex: 'usagePercent',
      key: 'usagePercent',
      render: (percent) => (
        <Progress 
          percent={100 - percent} 
          status={percent < 20 ? 'exception' : 'active'}
          size="small"
        />
      ),
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="link" size="small">
            Renew
          </Button>
          <Button type="link" size="small">
            Upgrade
          </Button>
        </Space>
      ),
    },
  ];

  const planColumns = [
    {
      title: 'Plan Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price}`,
    },
    {
      title: 'Validity',
      dataIndex: 'validityDays',
      key: 'validityDays',
      render: (days) => `${days} days`,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (discount) => `${discount}%`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Button type="link" icon={<EditOutlined />} size="small">
          Edit
        </Button>
      ),
    },
  ];

  const handleAddPlan = (values) => {
    message.success('Membership plan added successfully');
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Membership Management</h2>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {mockMembershipPlans.map(plan => (
          <Col xs={24} sm={12} lg={6} key={plan.id}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#1890ff' }}>{plan.name}</h3>
                <div style={{ fontSize: '32px', fontWeight: 'bold', margin: '16px 0' }}>
                  ₹{plan.price}
                </div>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>{plan.items} items</div>
                  <div>{plan.validityDays} days validity</div>
                  <div><Tag color="green">{plan.discount}% discount</Tag></div>
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card 
        title="Membership Plans" 
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
            Add New Plan
          </Button>
        }
        style={{ marginBottom: '16px' }}
      >
        <Table
          dataSource={mockMembershipPlans}
          columns={planColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Card title="Customer Memberships">
        <Table
          dataSource={customerMemberships}
          columns={customerColumns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="Add New Membership Plan"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddPlan}
        >
          <Form.Item
            name="name"
            label="Plan Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="e.g., Diamond Plan" />
          </Form.Item>

          <Form.Item
            name="items"
            label="Number of Items"
            rules={[{ required: true }]}
          >
            <Input type="number" placeholder="e.g., 100" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price (₹)"
            rules={[{ required: true }]}
          >
            <Input type="number" placeholder="e.g., 5000" />
          </Form.Item>

          <Form.Item
            name="validityDays"
            label="Validity (Days)"
            rules={[{ required: true }]}
          >
            <Input type="number" placeholder="e.g., 365" />
          </Form.Item>

          <Form.Item
            name="discount"
            label="Discount (%)"
            rules={[{ required: true }]}
          >
            <Input type="number" placeholder="e.g., 25" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Add Plan
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

export default AccountantMembership;
