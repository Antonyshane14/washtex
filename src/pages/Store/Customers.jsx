import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, message, Descriptions } from 'antd';
import { PlusOutlined, EyeOutlined, PhoneOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import MainLayout from '../../components/Layout/MainLayout';
import { mockCustomers, mockMembershipPlans } from '../../utils/mockData';

const { Option } = Select;
const { TextArea } = Input;

const StoreCustomers = () => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

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
      filteredValue: [searchText],
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()) ||
        record.phone.includes(value),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
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
      render: (balance, record) => (
        <span>
          {balance}/{record.totalBalance} items
          {balance < 5 && <Tag color="red" style={{ marginLeft: '8px' }}>Low</Tag>}
        </span>
      ),
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
          <Button type="primary" size="small" onClick={() => createOrder(record)}>
            New Order
          </Button>
        </Space>
      ),
    },
  ];

  const viewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setViewModalVisible(true);
  };

  const createOrder = (customer) => {
    message.info(`Creating new order for ${customer.name}`);
    // Navigate to order creation page
  };

  const handleAddCustomer = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleSubmit = (values) => {
    const selectedPlan = mockMembershipPlans.find(
      p => p.name === values.membershipType
    );
    
    const newCustomer = {
      ...values,
      id: `CUST${String(customers.length + 1).padStart(3, '0')}`,
      membershipType: values.membershipType.replace(' Plan', ''),
      membershipBalance: selectedPlan?.items || values.totalBalance,
      totalBalance: selectedPlan?.items || values.totalBalance,
      totalOrders: 0,
      outstandingAmount: 0,
      joinDate: new Date().toISOString().split('T')[0],
    };
    
    setCustomers([...customers, newCustomer]);
    message.success('Customer registered successfully');
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Customer Management</h2>
        <Space>
          <Input.Search
            placeholder="Search by name or phone"
            style={{ width: 250 }}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCustomer}>
            Register New Customer
          </Button>
        </Space>
      </div>

      <Card>
        <Table
          dataSource={customers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Register Customer Modal */}
      <Modal
        title="Register New Customer"
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
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter customer name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter full name" size="large" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please enter phone number' },
              { pattern: /^[0-9]{10}$/, message: 'Please enter valid 10-digit phone number' }
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Enter 10-digit phone number" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address (Optional)"
            rules={[{ type: 'email', message: 'Please enter valid email' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter email address" size="large" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <TextArea rows={3} placeholder="Enter complete address" />
          </Form.Item>

          <Form.Item
            name="membershipType"
            label="Membership Plan"
            rules={[{ required: true, message: 'Please select membership plan' }]}
          >
            <Select placeholder="Select membership plan" size="large">
              {mockMembershipPlans.map(plan => (
                <Option key={plan.id} value={plan.name}>
                  <div>
                    <strong>{plan.name}</strong>
                    <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                      {plan.items} items - ₹{plan.price} - {plan.validityDays} days - {plan.discount}% discount
                    </div>
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="preferences"
            label="Customer Preferences (Optional)"
          >
            <TextArea rows={2} placeholder="Any special preferences or notes" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" size="large">
                Register Customer
              </Button>
              <Button onClick={() => setModalVisible(false)} size="large">
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Customer Modal */}
      <Modal
        title="Customer Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
          <Button key="order" type="primary" onClick={() => createOrder(selectedCustomer)}>
            Create New Order
          </Button>,
        ]}
        width={700}
      >
        {selectedCustomer && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Customer ID" span={2}>
              {selectedCustomer.id}
            </Descriptions.Item>
            <Descriptions.Item label="Name" span={2}>
              {selectedCustomer.name}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {selectedCustomer.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedCustomer.email}
            </Descriptions.Item>
            <Descriptions.Item label="Address" span={2}>
              {selectedCustomer.address}
            </Descriptions.Item>
            <Descriptions.Item label="Membership">
              <Tag color="gold">{selectedCustomer.membershipType}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Balance">
              {selectedCustomer.membershipBalance}/{selectedCustomer.totalBalance} items
            </Descriptions.Item>
            <Descriptions.Item label="Join Date">
              {selectedCustomer.joinDate}
            </Descriptions.Item>
            <Descriptions.Item label="Total Orders">
              {selectedCustomer.totalOrders}
            </Descriptions.Item>
            <Descriptions.Item label="Outstanding Amount" span={2}>
              <span style={{ color: selectedCustomer.outstandingAmount > 0 ? '#f5222d' : '#52c41a', fontWeight: 'bold' }}>
                ₹{selectedCustomer.outstandingAmount}
              </span>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </MainLayout>
  );
};

export default StoreCustomers;
