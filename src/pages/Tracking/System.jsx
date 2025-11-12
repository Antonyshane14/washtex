import React, { useState } from 'react';
import { Card, Input, Button, Timeline, Steps, Descriptions, Tag, Space, Row, Col } from 'antd';
import { ScanOutlined, SearchOutlined } from '@ant-design/icons';
import QRCode from 'qrcode.react';
import MainLayout from '../../components/Layout/MainLayout';
import { mockProcessingStages } from '../../utils/mockData';

const TrackingSystem = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingData, setTrackingData] = useState(null);

  const handleTrack = () => {
    if (!trackingCode) {
      return;
    }

    // Mock tracking data
    const mockData = {
      qrCode: trackingCode || 'ST001-ORD001-ITEM001-SRV001',
      orderId: 'ORD001',
      itemId: 'ITEM001',
      customer: 'Rahul Sharma',
      itemType: 'Shirt',
      service: 'Wash & Iron',
      currentStage: 'Washing',
      currentStageIndex: 3,
      status: 'processing',
      createdAt: '2024-11-10 10:30 AM',
      expectedDelivery: '2024-11-13 6:00 PM',
      history: [
        { stage: 'Received at Store', location: 'ST001 - Downtown Store', time: '2024-11-10 10:30 AM', status: 'completed' },
        { stage: 'QR Tag Generated', location: 'ST001 - Downtown Store', time: '2024-11-10 10:35 AM', status: 'completed' },
        { stage: 'Transferred to Factory', location: 'In Transit', time: '2024-11-10 2:00 PM', status: 'completed' },
        { stage: 'Received at Factory', location: 'FAC001 - Central Factory', time: '2024-11-10 4:00 PM', status: 'completed' },
        { stage: 'Sorted', location: 'FAC001 - Central Factory', time: '2024-11-10 4:30 PM', status: 'completed' },
        { stage: 'Pre-treated', location: 'FAC001 - Central Factory', time: '2024-11-11 9:00 AM', status: 'completed' },
        { stage: 'Washing', location: 'FAC001 - Central Factory', time: '2024-11-11 10:00 AM', status: 'current' },
        { stage: 'Drying', location: 'FAC001 - Central Factory', time: 'Pending', status: 'pending' },
        { stage: 'Ironing', location: 'FAC001 - Central Factory', time: 'Pending', status: 'pending' },
        { stage: 'Quality Check', location: 'FAC001 - Central Factory', time: 'Pending', status: 'pending' },
        { stage: 'Packed', location: 'FAC001 - Central Factory', time: 'Pending', status: 'pending' },
        { stage: 'Ready for Delivery', location: 'ST001 - Downtown Store', time: 'Pending', status: 'pending' },
      ],
    };

    setTrackingData(mockData);
  };

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Item Tracking System</h2>
      </div>

      <Card>
        <Space.Compact style={{ width: '100%' }} size="large">
          <Input
            placeholder="Enter or scan QR code to track"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            onPressEnter={handleTrack}
            prefix={<ScanOutlined />}
            size="large"
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleTrack} size="large">
            Track Item
          </Button>
        </Space.Compact>
      </Card>

      {trackingData && (
        <>
          <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
            <Col xs={24} md={16}>
              <Card title="Item Details">
                <Descriptions bordered column={2}>
                  <Descriptions.Item label="QR Code" span={2}>
                    {trackingData.qrCode}
                  </Descriptions.Item>
                  <Descriptions.Item label="Order ID">
                    {trackingData.orderId}
                  </Descriptions.Item>
                  <Descriptions.Item label="Item ID">
                    {trackingData.itemId}
                  </Descriptions.Item>
                  <Descriptions.Item label="Customer">
                    {trackingData.customer}
                  </Descriptions.Item>
                  <Descriptions.Item label="Item Type">
                    {trackingData.itemType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Service">
                    {trackingData.service}
                  </Descriptions.Item>
                  <Descriptions.Item label="Current Stage">
                    <Tag color="blue">{trackingData.currentStage}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={trackingData.status === 'processing' ? 'processing' : 'success'}>
                      {trackingData.status.toUpperCase()}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Order Date">
                    {trackingData.createdAt}
                  </Descriptions.Item>
                  <Descriptions.Item label="Expected Delivery">
                    {trackingData.expectedDelivery}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="QR Code" style={{ textAlign: 'center' }}>
                <QRCode value={trackingData.qrCode} size={200} />
                <p style={{ marginTop: '16px', fontSize: '12px', color: '#8c8c8c' }}>
                  {trackingData.qrCode}
                </p>
              </Card>
            </Col>
          </Row>

          <Card title="Processing Pipeline" style={{ marginTop: '24px' }}>
            <Steps
              current={trackingData.currentStageIndex}
              items={mockProcessingStages.map(stage => ({
                title: stage.label,
              }))}
            />
          </Card>

          <Card title="Tracking History" style={{ marginTop: '24px' }}>
            <Timeline
              items={trackingData.history.map(entry => {
                let color = 'gray';
                if (entry.status === 'completed') color = 'green';
                if (entry.status === 'current') color = 'blue';
                if (entry.status === 'pending') color = 'gray';

                return {
                  color,
                  children: (
                    <div>
                      <strong>{entry.stage}</strong>
                      <br />
                      <small style={{ color: '#8c8c8c' }}>
                        {entry.location}
                      </small>
                      <br />
                      <small style={{ color: '#8c8c8c' }}>
                        {entry.time}
                      </small>
                    </div>
                  ),
                };
              })}
            />
          </Card>
        </>
      )}
    </MainLayout>
  );
};

export default TrackingSystem;
