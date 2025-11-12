import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Progress, Typography, Space } from 'antd';
import {
  ShoppingOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  InboxOutlined,
  CarOutlined,
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MainLayout from '../../components/Layout/MainLayout';
import { mockOrders } from '../../utils/mockData';

const { Title, Text } = Typography;

const StoreDashboard = () => {
  const todayData = [
    { hour: '9AM', orders: 5, revenue: 2500 },
    { hour: '10AM', orders: 8, revenue: 4000 },
    { hour: '11AM', orders: 12, revenue: 6000 },
    { hour: '12PM', orders: 10, revenue: 5000 },
    { hour: '1PM', orders: 6, revenue: 3000 },
    { hour: '2PM', orders: 9, revenue: 4500 },
    { hour: '3PM', orders: 11, revenue: 5500 },
  ];

  const recentOrders = mockOrders.slice(0, 5);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => items.length,
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => `₹${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          pending: 'orange',
          processing: 'blue',
          completed: 'green',
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Urgency',
      dataIndex: 'urgency',
      key: 'urgency',
      render: (urgency) => (
        <Tag color={urgency === 'express' ? 'red' : 'default'}>
          {urgency.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <Title level={2}>Store Dashboard</Title>
        <Text type="secondary">Today's Overview</Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Daily Intake"
              value={45}
              prefix={<ShoppingOutlined />}
              suffix="orders"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Pickups"
              value={12}
              prefix={<InboxOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Ready for Delivery"
              value={28}
              prefix={<CarOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Today's Revenue"
              value={15000}
              prefix="₹"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24}>
          <Card title="Today's Performance">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={todayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="orders" fill="#1890ff" name="Orders" />
                <Bar yAxisId="right" dataKey="revenue" fill="#52c41a" name="Revenue (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Quick Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} md={12} lg={8}>
          <Card title="Processing Status">
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Text>At Factory</Text>
                  <Text strong>35 items</Text>
                </div>
                <Progress percent={70} status="active" />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Text>In Store</Text>
                  <Text strong>28 items</Text>
                </div>
                <Progress percent={56} status="active" strokeColor="#52c41a" />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Text>In Transit</Text>
                  <Text strong>15 items</Text>
                </div>
                <Progress percent={30} status="active" strokeColor="#fa8c16" />
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card title="Pending Factory Transfers">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ padding: '12px', background: '#f0f2f5', borderRadius: '6px' }}>
                <Text strong>Batch #001</Text>
                <br />
                <Text type="secondary">45 items - Ready to transfer</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Scheduled: Today 2:00 PM
                </Text>
              </div>
              <div style={{ padding: '12px', background: '#f0f2f5', borderRadius: '6px' }}>
                <Text strong>Batch #002</Text>
                <br />
                <Text type="secondary">32 items - Preparing</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Scheduled: Today 5:00 PM
                </Text>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card title="Service Distribution">
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Wash & Iron</Text>
                <Text strong>45%</Text>
              </div>
              <Progress percent={45} showInfo={false} strokeColor="#1890ff" />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Dry Clean</Text>
                <Text strong>30%</Text>
              </div>
              <Progress percent={30} showInfo={false} strokeColor="#52c41a" />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Iron Only</Text>
                <Text strong>15%</Text>
              </div>
              <Progress percent={15} showInfo={false} strokeColor="#fa8c16" />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Others</Text>
                <Text strong>10%</Text>
              </div>
              <Progress percent={10} showInfo={false} strokeColor="#722ed1" />
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title="Recent Orders">
            <Table
              dataSource={recentOrders}
              columns={columns}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default StoreDashboard;
