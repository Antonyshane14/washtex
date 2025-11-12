import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, message, Row, Col, Statistic, Tabs } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import MainLayout from '../../components/Layout/MainLayout';
import { mockCustomers, mockMembershipPlans } from '../../utils/mockData';

const { Option } = Select;
const { TextArea } = Input;

const AdminCustomers = () => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Membership',
      dataIndex: 'membershipType',
      key: 'membershipType',
      render: (type) => {
        const colors = {
          Bronze: 'default',
          Silver: 'blue',
          Gold: 'gold',
          Platinum: 'purple',
        };
        return <Tag color={colors[type]}>{type}</Tag>;
      },
    },
    {
      title: 'Balance',
      dataIndex: 'membershipBalance',
      key: 'membershipBalance',
      render: (balance, record) => `${balance}/${record.totalBalance}`,
    },
    {
      title: 'Total Orders',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
    },
    {
      title: 'Outstanding',
      dataIndex: 'outstandingAmount',
      key: 'outstandingAmount',
      render: (amount) => (
        <span style={{ color: amount > 0 ? '#f5222d' : '#52c41a' }}>
          ₹{amount}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} onClick={() => viewCustomer(record)}>
            View
          </Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => editCustomer(record)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const viewCustomer = (customer) => {
    Modal.info({
      title: `Customer Details - ${customer.name}`,
      width: 600,
      content: (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Customer ID:</strong> {customer.id}</p>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <p><strong>Membership:</strong> <Tag color="gold">{customer.membershipType}</Tag></p>
          <p><strong>Balance:</strong> {customer.membershipBalance}/{customer.totalBalance} items</p>
          <p><strong>Join Date:</strong> {customer.joinDate}</p>
          <p><strong>Total Orders:</strong> {customer.totalOrders}</p>
          <p><strong>Outstanding Amount:</strong> ₹{customer.outstandingAmount}</p>
        </div>
      ),
    });
  };

  const editCustomer = (customer) => {
    setSelectedCustomer(customer);
    form.setFieldsValue(customer);
    setModalVisible(true);
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleSubmit = (values) => {
    if (selectedCustomer) {
      setCustomers(customers.map(c => c.id === selectedCustomer.id ? { ...c, ...values } : c));
      message.success('Customer updated successfully');
    } else {
      const newCustomer = {
        ...values,
        id: `CUST${String(customers.length + 1).padStart(3, '0')}`,
        totalOrders: 0,
        outstandingAmount: 0,
        joinDate: new Date().toISOString().split('T')[0],
      };
      setCustomers([...customers, newCustomer]);
      message.success('Customer added successfully');
    }
    setModalVisible(false);
    form.resetFields();
  };

  const totalStats = {
    totalCustomers: customers.length,
    goldMembers: customers.filter(c => c.membershipType === 'Gold').length,
    totalOrders: customers.reduce((sum, c) => sum + c.totalOrders, 0),
    outstanding: customers.reduce((sum, c) => sum + c.outstandingAmount, 0),
  };

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Customer Management</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCustomer}>
          Add New Customer
        </Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Customers"
              value={totalStats.totalCustomers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Gold Members"
              value={totalStats.goldMembers}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={totalStats.totalOrders}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Outstanding"
              value={totalStats.outstanding}
              prefix="₹"
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Tabs
          items={[
            {
              key: 'all',
              label: 'All Customers',
              children: (
                <Table
                  dataSource={customers}
                  columns={columns}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                />
              ),
            },
            {
              key: 'gold',
              label: 'Gold Members',
              children: (
                <Table
                  dataSource={customers.filter(c => c.membershipType === 'Gold')}
                  columns={columns}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                />
              ),
            },
            {
              key: 'outstanding',
              label: 'Outstanding Payments',
              children: (
                <Table
                  dataSource={customers.filter(c => c.outstandingAmount > 0)}
                  columns={columns}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                />
              ),
            },
          ]}
        />
      </Card>

      <Modal
        title={selectedCustomer ? 'Edit Customer' : 'Add New Customer'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter customer name' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ type: 'email', message: 'Please enter valid email' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <TextArea rows={3} placeholder="Enter complete address" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="membershipType"
                label="Membership Type"
                rules={[{ required: true, message: 'Please select membership' }]}
              >
                <Select placeholder="Select membership">
                  {mockMembershipPlans.map(plan => (
                    <Option key={plan.id} value={plan.name.replace(' Plan', '')}>
                      {plan.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="totalBalance"
                label="Membership Balance (Items)"
                rules={[{ required: true, message: 'Please enter balance' }]}
              >
                <Input type="number" placeholder="Enter item count" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {selectedCustomer ? 'Update' : 'Add'} Customer
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

export default AdminCustomers;
