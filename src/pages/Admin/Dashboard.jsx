import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Progress, Typography, Space, Badge, Button } from 'antd';
import {
  ShoppingOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  WarningOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import MainLayout from '../../components/Layout/MainLayout';
import { mockStores, mockRevenueData, mockNotifications, mockOrders } from '../../utils/mockData';

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const recentOrders = mockOrders.slice(0, 5);

  const storePerformance = mockStores.map(store => ({
    name: store.name,
    orders: store.todayOrders,
    revenue: store.revenue / 1000,
  }));

  const statusDistribution = [
    { name: 'Pending', value: 35, color: '#fa8c16' },
    { name: 'Processing', value: 45, color: '#1890ff' },
    { name: 'Completed', value: 120, color: '#52c41a' },
  ];

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
      title: 'Store',
      dataIndex: 'storeId',
      key: 'storeId',
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
          cancelled: 'red',
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Stage',
      dataIndex: 'currentStage',
      key: 'currentStage',
    },
  ];

  const alertColumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const icons = {
          sla_breach: <ClockCircleOutlined />,
          damage: <WarningOutlined />,
        };
        return <Space>{icons[type]} {type.replace('_', ' ').toUpperCase()}</Space>;
      },
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => {
        const colors = {
          high: 'red',
          medium: 'orange',
          low: 'blue',
        };
        return <Badge color={colors[priority]} text={priority.toUpperCase()} />;
      },
    },
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <Title level={2}>Admin Dashboard</Title>
        <Text type="secondary">Real-time overview of system operations</Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders Today"
              value={135}
              prefix={<ShoppingOutlined />}
              suffix={<Tag color="green"><ArrowUpOutlined /> 12%</Tag>}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Orders"
              value={80}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed Today"
              value={120}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Today's Revenue"
              value={45500}
              prefix="₹"
              suffix={<Tag color="green"><ArrowUpOutlined /> 8%</Tag>}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={16}>
          <Card title="Revenue Trends (Last 7 Days)">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => value.split('-')[2]} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#1890ff" strokeWidth={2} name="Revenue (₹)" />
                <Line type="monotone" dataKey="orders" stroke="#52c41a" strokeWidth={2} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Order Status Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Store Performance */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24}>
          <Card title="Store Performance Today">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={storePerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="orders" fill="#1890ff" name="Orders" />
                <Bar yAxisId="right" dataKey="revenue" fill="#52c41a" name="Revenue (₹K)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Stores Overview */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {mockStores.map(store => (
          <Col xs={24} sm={12} lg={8} key={store.id}>
            <Card 
              title={store.name}
              extra={<Tag color="green">{store.status}</Tag>}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text type="secondary">Manager:</Text> <Text strong>{store.manager}</Text>
                </div>
                <div>
                  <Text type="secondary">Today's Orders:</Text> <Text strong>{store.todayOrders}</Text>
                </div>
                <div>
                  <Text type="secondary">Pending:</Text> <Text strong>{store.pendingOrders}</Text>
                </div>
                <div>
                  <Text type="secondary">Revenue:</Text> <Text strong style={{ color: '#52c41a' }}>₹{store.revenue}</Text>
                </div>
                <Progress 
                  percent={Math.round((store.todayOrders / 60) * 100)} 
                  status="active"
                  format={percent => `${percent}% capacity`}
                />
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Alert Center */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24}>
          <Card 
            title="Alert Center" 
            extra={<Badge count={mockNotifications.filter(n => !n.read).length} />}
          >
            <Table
              dataSource={mockNotifications}
              columns={alertColumns}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Orders and Order Tracking */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Recent Orders">
            <Table
              dataSource={recentOrders}
              columns={columns}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card 
            title="Live Order Tracking"
            extra={
              <Button 
                type="primary" 
                icon={<EnvironmentOutlined />}
                onClick={() => navigate('/admin/tracking')}
              >
                View All
              </Button>
            }
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ padding: '20px', textAlign: 'center', background: '#f5f5f5', borderRadius: '8px' }}>
                <EnvironmentOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                <Title level={4} style={{ marginTop: '16px' }}>Track All Orders</Title>
                <Text type="secondary">
                  View real-time location of delivery personnel and track order progress through all stages
                </Text>
              </div>
              <div style={{ marginTop: '16px' }}>
                <Row gutter={8}>
                  <Col span={12}>
                    <Card size="small">
                      <Statistic 
                        title="In Transit" 
                        value={4} 
                        valueStyle={{ fontSize: '24px', color: '#faad14' }}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card size="small">
                      <Statistic 
                        title="Processing" 
                        value={5} 
                        valueStyle={{ fontSize: '24px', color: '#722ed1' }}
                      />
                    </Card>
                  </Col>
                </Row>
              </div>
              <Button 
                type="primary" 
                size="large" 
                block 
                icon={<EnvironmentOutlined />}
                onClick={() => navigate('/admin/tracking')}
              >
                Open Tracking Dashboard
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default AdminDashboard;
