import React, { useState } from 'react';
import { Card, Input, Button, Table, Space, Tag, message, Modal, Descriptions } from 'antd';
import { ScanOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import MainLayout from '../../components/Layout/MainLayout';

const FactoryReception = () => {
  const [scannedCode, setScannedCode] = useState('');
  const [receivedItems, setReceivedItems] = useState([]);

  const mockTransferData = {
    transferId: 'TRF001',
    fromStore: 'ST001',
    expectedItems: 45,
    receivedItems: 42,
    items: [
      { qrCode: 'ST001-ORD001-ITEM001-SRV001', category: 'Shirt', service: 'Wash & Iron', verified: true },
      { qrCode: 'ST001-ORD001-ITEM002-SRV002', category: 'Trouser', service: 'Dry Clean', verified: true },
      { qrCode: 'ST001-ORD002-ITEM003-SRV002', category: 'Saree', service: 'Dry Clean', verified: false },
    ],
  };

  const handleScan = () => {
    if (!scannedCode) {
      message.warning('Please enter or scan a QR code');
      return;
    }

    const item = mockTransferData.items.find(i => i.qrCode === scannedCode);
    
    if (item) {
      if (receivedItems.find(i => i.qrCode === scannedCode)) {
        message.warning('Item already scanned');
      } else {
        setReceivedItems([...receivedItems, { ...item, scannedAt: new Date().toLocaleTimeString() }]);
        message.success('Item received and verified');
        setScannedCode('');
      }
    } else {
      message.error('QR code not found in transfer batch');
    }
  };

  const reportDiscrepancy = () => {
    Modal.confirm({
      title: 'Report Discrepancy',
      content: 'Are you sure you want to report a discrepancy for this batch?',
      onOk: () => {
        message.success('Discrepancy report submitted');
      },
    });
  };

  const completReception = () => {
    Modal.confirm({
      title: 'Complete Reception',
      content: `Received ${receivedItems.length} out of ${mockTransferData.expectedItems} items. Complete reception?`,
      onOk: () => {
        message.success('Reception completed successfully');
        setReceivedItems([]);
      },
    });
  };

  const columns = [
    {
      title: 'QR Code',
      dataIndex: 'qrCode',
      key: 'qrCode',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Scanned At',
      dataIndex: 'scannedAt',
      key: 'scannedAt',
    },
    {
      title: 'Status',
      dataIndex: 'verified',
      key: 'verified',
      render: (verified) => (
        <Tag color={verified ? 'green' : 'orange'} icon={verified ? <CheckCircleOutlined /> : <WarningOutlined />}>
          {verified ? 'VERIFIED' : 'PENDING'}
        </Tag>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Goods Reception</h2>
      </div>

      <Card title="Transfer Batch Information" style={{ marginBottom: '16px' }}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Transfer ID">{mockTransferData.transferId}</Descriptions.Item>
          <Descriptions.Item label="From Store">{mockTransferData.fromStore}</Descriptions.Item>
          <Descriptions.Item label="Expected Items">{mockTransferData.expectedItems}</Descriptions.Item>
          <Descriptions.Item label="Received Items">
            <Tag color={receivedItems.length === mockTransferData.expectedItems ? 'green' : 'orange'}>
              {receivedItems.length} / {mockTransferData.expectedItems}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Scan Items" style={{ marginBottom: '16px' }}>
        <Space.Compact style={{ width: '100%' }} size="large">
          <Input
            placeholder="Scan or enter QR code"
            value={scannedCode}
            onChange={(e) => setScannedCode(e.target.value)}
            onPressEnter={handleScan}
            prefix={<ScanOutlined />}
          />
          <Button type="primary" onClick={handleScan}>
            Verify Item
          </Button>
        </Space.Compact>
      </Card>

      <Card title={`Received Items (${receivedItems.length})`}>
        <Table
          dataSource={receivedItems}
          columns={columns}
          pagination={false}
          rowKey="qrCode"
        />
        
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button danger onClick={reportDiscrepancy}>
            Report Discrepancy
          </Button>
          <Button type="primary" onClick={completeReception} disabled={receivedItems.length === 0}>
            Complete Reception
          </Button>
        </div>
      </Card>
    </MainLayout>
  );
};

export default FactoryReception;
