import React, { useState } from 'react';
import { Card, Table, Button, Space, DatePicker, Select, Tag, Row, Col, Statistic } from 'antd';
import { DownloadOutlined, PrinterOutlined, FileExcelOutlined } from '@ant-design/icons';
import MainLayout from '../../components/Layout/MainLayout';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AccountantBilling = () => {
  const invoices = [
    {
      id: 'INV00001',
      date: '2024-11-12',
      orderId: 'ORD001',
      customer: 'Rahul Sharma',
      amount: 550,
      gst: 99,
      total: 649,
      paymentMode: 'Cash',
      status: 'paid',
    },
    {
      id: 'INV00002',
      date: '2024-11-12',
      orderId: 'ORD002',
      customer: 'Priya Patel',
      amount: 625,
      gst: 112.5,
      total: 737.5,
      paymentMode: 'UPI',
      status: 'pending',
    },
  ];

  const columns = [
    {
      title: 'Invoice No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₹${amount}`,
    },
    {
      title: 'GST',
      dataIndex: 'gst',
      key: 'gst',
      render: (gst) => `₹${gst}`,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => <strong>₹{total}</strong>,
    },
    {
      title: 'Payment Mode',
      dataIndex: 'paymentMode',
      key: 'paymentMode',
      render: (mode) => <Tag color="blue">{mode}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'paid' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="link" size="small" icon={<PrinterOutlined />}>
            Print
          </Button>
          <Button type="link" size="small" icon={<DownloadOutlined />}>
            Download
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Billing & Invoicing</h2>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Invoices"
              value={245}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Amount"
              value={125000}
              prefix="₹"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="GST Collected"
              value={22500}
              prefix="₹"
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Space style={{ marginBottom: '16px' }} wrap>
          <RangePicker />
          <Select defaultValue="all" style={{ width: 150 }}>
            <Option value="all">All Status</Option>
            <Option value="paid">Paid</Option>
            <Option value="pending">Pending</Option>
          </Select>
          <Select defaultValue="all" style={{ width: 150 }}>
            <Option value="all">All Payment Modes</Option>
            <Option value="cash">Cash</Option>
            <Option value="card">Card</Option>
            <Option value="upi">UPI</Option>
          </Select>
          <Button type="primary" icon={<FileExcelOutlined />}>
            Export to Excel
          </Button>
        </Space>

        <Table
          dataSource={invoices}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </MainLayout>
  );
};

export default AccountantBilling;
