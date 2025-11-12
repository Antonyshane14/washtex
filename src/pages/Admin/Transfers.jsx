import React from 'react';
import { Card, Table, Tag, Timeline, Row, Col, Progress, Space } from 'antd';
import { CarOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import MainLayout from '../../components/Layout/MainLayout';
import { mockTransfers } from '../../utils/mockData';

const AdminTransfers = () => {
  const columns = [
    {
      title: 'Transfer ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (from) => <Tag color="blue">{from}</Tag>,
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      render: (to) => <Tag color="green">{to}</Tag>,
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => `${items} items`,
    },
    {
      title: 'Vehicle',
      dataIndex: 'vehicle',
      key: 'vehicle',
    },
    {
      title: 'Driver',
      dataIndex: 'driver',
      key: 'driver',
    },
    {
      title: 'Departure',
      dataIndex: 'departureTime',
      key: 'departureTime',
      render: (time) => new Date(time).toLocaleString(),
    },
    {
      title: 'Expected Arrival',
      dataIndex: 'expectedArrival',
      key: 'expectedArrival',
      render: (time) => new Date(time).toLocaleString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const config = {
          pending: { color: 'default', text: 'PENDING' },
          in_transit: { color: 'processing', text: 'IN TRANSIT' },
          delivered: { color: 'success', text: 'DELIVERED' },
        };
        return <Tag color={config[status].color}>{config[status].text}</Tag>;
      },
    },
  ];

  const activeTransfers = mockTransfers.filter(t => t.status === 'in_transit');
  const completedTransfers = mockTransfers.filter(t => t.status === 'delivered');

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Goods Transfer Management</h2>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Active Transfers" extra={<Tag color="processing">{activeTransfers.length} Active</Tag>}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              {activeTransfers.map(transfer => (
                <Card key={transfer.id} size="small">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>{transfer.id}</strong>
                      <Tag color="blue">{transfer.vehicle}</Tag>
                    </div>
                    <div>
                      <CarOutlined /> {transfer.driver}
                    </div>
                    <div>
                      Route: <Tag color="blue">{transfer.from}</Tag> → <Tag color="green">{transfer.to}</Tag>
                    </div>
                    <div>
                      Items: <strong>{transfer.items}</strong>
                    </div>
                    <Progress 
                      percent={65} 
                      status="active"
                      format={percent => `${percent}% Complete`}
                    />
                    <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                      Expected: {new Date(transfer.expectedArrival).toLocaleTimeString()}
                    </div>
                  </Space>
                </Card>
              ))}
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Transfer Timeline">
            <Timeline
              items={[
                {
                  color: 'green',
                  children: (
                    <div>
                      <strong>Delivered</strong> - TRF002
                      <br />
                      <small>FAC001 → ST002 (38 items)</small>
                      <br />
                      <small style={{ color: '#8c8c8c' }}>
                        {new Date(completedTransfers[0]?.actualArrival).toLocaleString()}
                      </small>
                    </div>
                  ),
                },
                {
                  color: 'blue',
                  dot: <ClockCircleOutlined />,
                  children: (
                    <div>
                      <strong>In Transit</strong> - TRF001
                      <br />
                      <small>ST001 → FAC001 (45 items)</small>
                      <br />
                      <small style={{ color: '#8c8c8c' }}>
                        ETA: {new Date(activeTransfers[0]?.expectedArrival).toLocaleTimeString()}
                      </small>
                    </div>
                  ),
                },
                {
                  color: 'gray',
                  children: (
                    <div>
                      <strong>Departed</strong> - TRF001
                      <br />
                      <small>From ST001</small>
                      <br />
                      <small style={{ color: '#8c8c8c' }}>
                        {new Date(activeTransfers[0]?.departureTime).toLocaleString()}
                      </small>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Card title="All Transfers">
        <Table
          dataSource={mockTransfers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </MainLayout>
  );
};

export default AdminTransfers;
