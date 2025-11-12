import React from 'react';
import { Card, Row, Col, Statistic, Progress, Table, Tag, Space } from 'antd';
import { InboxOutlined, CheckCircleOutlined, ClockCircleOutlined, TeamOutlined, WarningOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import MainLayout from '../../components/Layout/MainLayout';
import { mockProcessingStages } from '../../utils/mockData';

const FactoryDashboard = () => {
  const stageData = [
    { stage: 'Received', count: 85 },
    { stage: 'Sorted', count: 75 },
    { stage: 'Washing', count: 60 },
    { stage: 'Drying', count: 45 },
    { stage: 'Ironing', count: 30 },
    { stage: 'QC', count: 25 },
    { stage: 'Packed', count: 20 },
  ];

  const serviceTypeData = [
    { name: 'Wash & Iron', value: 45, color: '#1890ff' },
    { name: 'Dry Clean', value: 30, color: '#52c41a' },
    { name: 'Iron Only', value: 15, color: '#fa8c16' },
    { name: 'Others', value: 10, color: '#722ed1' },
  ];

  const workerData = [
    { id: 'W001', name: 'Rajesh Kumar', station: 'Washing', itemsProcessed: 45, efficiency: 92 },
    { id: 'W002', name: 'Amit Patel', station: 'Ironing', itemsProcessed: 38, efficiency: 88 },
    { id: 'W003', name: 'Sanjay Singh', station: 'Quality Check', itemsProcessed: 42, efficiency: 95 },
    { id: 'W004', name: 'Pradeep Reddy', station: 'Packing', itemsProcessed: 40, efficiency: 90 },
  ];

  const workerColumns = [
    {
      title: 'Worker ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Station',
      dataIndex: 'station',
      key: 'station',
      render: (station) => <Tag color="blue">{station}</Tag>,
    },
    {
      title: 'Items Processed',
      dataIndex: 'itemsProcessed',
      key: 'itemsProcessed',
    },
    {
      title: 'Efficiency',
      dataIndex: 'efficiency',
      key: 'efficiency',
      render: (efficiency) => (
        <Progress 
          percent={efficiency} 
          size="small" 
          status={efficiency >= 90 ? 'success' : 'normal'}
        />
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Factory Dashboard</h2>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Current Workload"
              value={750}
              suffix="/ 1000"
              prefix={<InboxOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress percent={75} showInfo={false} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Today Processed"
              value={450}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Items"
              value={300}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Workers"
              value={25}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={16}>
          <Card title="Processing Pipeline">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#1890ff" name="Items" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Service Type Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={16}>
          <Card title="Worker Productivity">
            <Table
              dataSource={workerData}
              columns={workerColumns}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Quality Metrics">
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Quality Pass Rate</span>
                  <strong>95%</strong>
                </div>
                <Progress percent={95} status="success" />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Damage Rate</span>
                  <strong>2%</strong>
                </div>
                <Progress percent={2} status="exception" strokeColor="#f5222d" />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Rework Rate</span>
                  <strong>3%</strong>
                </div>
                <Progress percent={3} strokeColor="#fa8c16" />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title="Processing Stages Status">
            <Row gutter={[16, 16]}>
              {mockProcessingStages.map((stage, index) => (
                <Col xs={12} sm={8} md={6} lg={3} key={stage.key}>
                  <Card size="small" style={{ textAlign: 'center', borderTop: `3px solid ${stage.color}` }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: stage.color }}>
                      {Math.floor(Math.random() * 50) + 10}
                    </div>
                    <div style={{ fontSize: '12px', marginTop: '8px' }}>
                      {stage.label}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default FactoryDashboard;
