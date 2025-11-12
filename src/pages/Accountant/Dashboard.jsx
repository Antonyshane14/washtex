import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag } from 'antd';
import { DollarOutlined, CreditCardOutlined, WalletOutlined, BankOutlined } from '@ant-design/icons';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import MainLayout from '../../components/Layout/MainLayout';
import { mockRevenueData } from '../../utils/mockData';

const AccountantDashboard = () => {
  const paymentModeData = [
    { name: 'Cash', value: 45000, color: '#52c41a' },
    { name: 'Card', value: 32000, color: '#1890ff' },
    { name: 'UPI', value: 28000, color: '#722ed1' },
    { name: 'Wallet', value: 15000, color: '#fa8c16' },
  ];

  const outstandingPayments = [
    { customer: 'Rahul Sharma', orderId: 'ORD003', amount: 1500, dueDate: '2024-11-15', days: 3 },
    { customer: 'Priya Patel', orderId: 'ORD005', amount: 2200, dueDate: '2024-11-18', days: 6 },
    { customer: 'Amit Kumar', orderId: 'ORD007', amount: 800, dueDate: '2024-11-20', days: 8 },
  ];

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₹${amount}`,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Status',
      dataIndex: 'days',
      key: 'days',
      render: (days) => {
        if (days <= 3) return <Tag color="orange">Due Soon</Tag>;
        if (days <= 7) return <Tag color="blue">Pending</Tag>;
        return <Tag color="red">Overdue</Tag>;
      },
    },
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Accountant Dashboard</h2>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Today's Revenue"
              value={45500}
              prefix="₹"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Outstanding"
              value={8500}
              prefix="₹"
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Monthly Revenue"
              value={1250000}
              prefix="₹"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Profit Margin"
              value={28.5}
              suffix="%"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={16}>
          <Card title="Revenue Trend (Last 7 Days)">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => value.split('-')[2]} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#52c41a" strokeWidth={2} name="Revenue (₹)" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Payment Mode Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentModeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ₹${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentModeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title="Outstanding Payments">
            <Table
              dataSource={outstandingPayments}
              columns={columns}
              pagination={false}
              rowKey="orderId"
            />
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default AccountantDashboard;
