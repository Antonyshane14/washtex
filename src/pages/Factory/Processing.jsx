import React, { useState } from 'react';
import { Card, Input, Button, Select, Space, Tag, message, Timeline, Steps } from 'antd';
import { ScanOutlined, CheckCircleOutlined } from '@ant-design/icons';
import MainLayout from '../../components/Layout/MainLayout';
import { mockProcessingStages } from '../../utils/mockData';

const { Option } = Select;

const FactoryProcessing = () => {
  const [scannedCode, setScannedCode] = useState('');
  const [currentStage, setCurrentStage] = useState('received');
  const [workerId, setWorkerId] = useState('');
  const [processingHistory, setProcessingHistory] = useState([]);

  const handleStageUpdate = () => {
    if (!scannedCode) {
      message.warning('Please scan an item QR code');
      return;
    }

    if (!workerId) {
      message.warning('Please select worker');
      return;
    }

    const stageInfo = mockProcessingStages.find(s => s.key === currentStage);
    
    const historyEntry = {
      qrCode: scannedCode,
      stage: stageInfo.label,
      stageKey: currentStage,
      workerId: workerId,
      timestamp: new Date().toLocaleString(),
      color: stageInfo.color,
    };

    setProcessingHistory([historyEntry, ...processingHistory]);
    message.success(`Item moved to ${stageInfo.label}`);
    setScannedCode('');
  };

  const stageIndex = mockProcessingStages.findIndex(s => s.key === currentStage);

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Processing Tracking</h2>
      </div>

      <Card title="Stage Update Interface" style={{ marginBottom: '16px' }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Input
            placeholder="Scan item QR code"
            value={scannedCode}
            onChange={(e) => setScannedCode(e.target.value)}
            onPressEnter={handleStageUpdate}
            prefix={<ScanOutlined />}
            size="large"
          />

          <Select
            placeholder="Select current processing stage"
            value={currentStage}
            onChange={setCurrentStage}
            style={{ width: '100%' }}
            size="large"
          >
            {mockProcessingStages.map(stage => (
              <Option key={stage.key} value={stage.key}>
                <Tag color={stage.color}>{stage.label}</Tag>
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Select worker"
            value={workerId}
            onChange={setWorkerId}
            style={{ width: '100%' }}
            size="large"
          >
            <Option value="W001">Rajesh Kumar - Washing Station</Option>
            <Option value="W002">Amit Patel - Ironing Station</Option>
            <Option value="W003">Sanjay Singh - QC Station</Option>
            <Option value="W004">Pradeep Reddy - Packing Station</Option>
          </Select>

          <Button 
            type="primary" 
            icon={<CheckCircleOutlined />}
            onClick={handleStageUpdate}
            size="large"
            block
          >
            Update Stage
          </Button>
        </Space>
      </Card>

      <Card title="Processing Pipeline">
        <Steps
          current={stageIndex}
          items={mockProcessingStages.map(stage => ({
            title: stage.label,
            icon: stage.key === currentStage ? <CheckCircleOutlined /> : null,
          }))}
        />
      </Card>

      <Card title="Recent Updates" style={{ marginTop: '16px' }}>
        <Timeline
          items={processingHistory.map(entry => ({
            color: entry.color,
            children: (
              <div>
                <strong>{entry.stage}</strong>
                <br />
                <small>QR: {entry.qrCode}</small>
                <br />
                <small>Worker: {entry.workerId}</small>
                <br />
                <small style={{ color: '#8c8c8c' }}>{entry.timestamp}</small>
              </div>
            ),
          }))}
        />
      </Card>
    </MainLayout>
  );
};

export default FactoryProcessing;
