import React, { useState } from 'react';
import { Card, Input, Button, Form, Select, Upload, Space, Tag, message, Table, Modal } from 'antd';
import { ScanOutlined, CameraOutlined, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';
import MainLayout from '../../components/Layout/MainLayout';

const { Option } = Select;
const { TextArea } = Input;

const FactoryQuality = () => {
  const [form] = Form.useForm();
  const [damageReports, setDamageReports] = useState([
    {
      id: 'DMG001',
      qrCode: 'ST001-ORD001-ITEM001-SRV001',
      damageType: 'Color Fade',
      description: 'Slight color fading observed',
      reportedBy: 'Sanjay Singh',
      timestamp: new Date().toLocaleString(),
      status: 'pending',
    },
  ]);

  const handleReportDamage = (values) => {
    const newReport = {
      id: `DMG${String(damageReports.length + 1).padStart(3, '0')}`,
      ...values,
      reportedBy: 'QC Team',
      timestamp: new Date().toLocaleString(),
      status: 'pending',
    };

    setDamageReports([newReport, ...damageReports]);
    message.success('Damage report submitted');
    form.resetFields();
  };

  const handlePassQC = () => {
    const qrCode = form.getFieldValue('qrCode');
    if (!qrCode) {
      message.warning('Please scan an item');
      return;
    }
    message.success('Item passed quality check');
    form.resetFields();
  };

  const columns = [
    {
      title: 'Report ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'QR Code',
      dataIndex: 'qrCode',
      key: 'qrCode',
    },
    {
      title: 'Damage Type',
      dataIndex: 'damageType',
      key: 'damageType',
      render: (type) => <Tag color="red">{type}</Tag>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Reported By',
      dataIndex: 'reportedBy',
      key: 'reportedBy',
    },
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          pending: 'orange',
          resolved: 'green',
          escalated: 'red',
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Quality Control</h2>
      </div>

      <Card title="QC Inspection" style={{ marginBottom: '16px' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleReportDamage}
        >
          <Form.Item
            name="qrCode"
            label="Scan Item"
            rules={[{ required: true, message: 'Please scan item' }]}
          >
            <Input
              placeholder="Scan QR code"
              prefix={<ScanOutlined />}
              size="large"
            />
          </Form.Item>

          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button 
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={handlePassQC}
              size="large"
              style={{ background: '#52c41a', borderColor: '#52c41a' }}
            >
              Pass QC
            </Button>
            <Button 
              danger
              icon={<WarningOutlined />}
              onClick={() => {/* Show damage form */}}
              size="large"
            >
              Report Damage
            </Button>
          </Space>
        </Form>
      </Card>

      <Card title="Report Damage/Issue" style={{ marginBottom: '16px' }}>
        <Form
          layout="vertical"
          onFinish={handleReportDamage}
        >
          <Form.Item
            name="qrCode"
            label="Item QR Code"
            rules={[{ required: true, message: 'Please enter QR code' }]}
          >
            <Input placeholder="Enter or scan QR code" size="large" />
          </Form.Item>

          <Form.Item
            name="damageType"
            label="Damage Type"
            rules={[{ required: true, message: 'Please select damage type' }]}
          >
            <Select placeholder="Select damage type" size="large">
              <Option value="Tear">Tear/Rip</Option>
              <Option value="Color Fade">Color Fade</Option>
              <Option value="Stain Not Removed">Stain Not Removed</Option>
              <Option value="Shrinkage">Shrinkage</Option>
              <Option value="Button Missing">Button Missing</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={3} placeholder="Describe the damage or issue" />
          </Form.Item>

          <Form.Item
            name="photos"
            label="Upload Photos"
          >
            <Upload
              listType="picture-card"
              maxCount={5}
            >
              <div>
                <CameraOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" danger size="large" block>
              Submit Damage Report
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Damage Reports">
        <Table
          dataSource={damageReports}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </MainLayout>
  );
};

export default FactoryQuality;
