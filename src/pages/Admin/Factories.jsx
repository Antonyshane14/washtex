import React from 'react';
import { Card, Table, Progress, Tag, Row, Col, Statistic, Space } from 'antd';
import { BuildOutlined, TeamOutlined, InboxOutlined, CheckCircleOutlined } from '@ant-design/icons';
import MainLayout from '../../components/Layout/MainLayout';
import { mockFactories } from '../../utils/mockData';

const AdminFactories = () => {
  const columns = [
    {
      title: 'Factory ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Factory Name',
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
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      render: (capacity, record) => (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <div>{record.currentLoad} / {capacity} items</div>
          <Progress 
            percent={Math.round((record.currentLoad / capacity) * 100)} 
            status="active"
            size="small"
          />
        </Space>
      ),
    },
    {
      title: 'Workers',
      dataIndex: 'workers',
      key: 'workers',
      render: (workers) => <Tag color="blue">{workers} workers</Tag>,
    },
    {
      title: 'Today Processed',
      dataIndex: 'todayProcessed',
      key: 'todayProcessed',
    },
    {
      title: 'Pending Items',
      dataIndex: 'pendingItems',
      key: 'pendingItems',
      render: (pending) => <Tag color="orange">{pending}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'operational' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  const factory = mockFactories[0];

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Factory Management</h2>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Capacity"
              value={factory.capacity}
              prefix={<BuildOutlined />}
              suffix="items"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Current Load"
              value={factory.currentLoad}
              valueStyle={{ color: '#1890ff' }}
              suffix={`/ ${factory.capacity}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Today Processed"
              value={factory.todayProcessed}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Items"
              value={factory.pendingItems}
              prefix={<InboxOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Factory Overview">
        <Table
          dataSource={mockFactories}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Capacity Utilization">
            <div style={{ padding: '20px' }}>
              <Progress 
                type="circle" 
                percent={Math.round((factory.currentLoad / factory.capacity) * 100)}
                width={200}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p><strong>Current Load:</strong> {factory.currentLoad} items</p>
                <p><strong>Total Capacity:</strong> {factory.capacity} items</p>
                <p><strong>Available:</strong> {factory.capacity - factory.currentLoad} items</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Workforce Details">
            <Space direction="vertical" size="large" style={{ width: '100%', padding: '20px' }}>
              <div>
                <TeamOutlined style={{ fontSize: '24px', marginRight: '10px' }} />
                <strong>Total Workers:</strong> {factory.workers}
              </div>
              <div>
                <strong>Active Shifts:</strong> 2 (Morning & Evening)
              </div>
              <div>
                <strong>Average Productivity:</strong> 18 items/hour
              </div>
              <div>
                <strong>Quality Rate:</strong> <Progress percent={95} size="small" status="active" />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default AdminFactories;
