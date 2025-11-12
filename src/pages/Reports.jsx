import React, { useState } from 'react';
import { Card, Tabs, Select, DatePicker, Button, Space, Table, Row, Col, Statistic } from 'antd';
import { DownloadOutlined, PrinterOutlined, FileExcelOutlined } from '@ant-design/icons';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MainLayout from '../components/Layout/MainLayout';
import { mockRevenueData } from '../utils/mockData';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Reports = () => {
  const operationalData = [
    { store: 'ST001', orders: 145, pending: 12, completed: 133, revenue: 45000 },
    { store: 'ST002', orders: 128, pending: 8, completed: 120, revenue: 38000 },
    { store: 'ST003', orders: 156, pending: 15, completed: 141, revenue: 52000 },
  ];

  const serviceData = [
    { service: 'Wash & Iron', count: 245, revenue: 36750 },
    { service: 'Dry Clean', count: 180, revenue: 54000 },
    { service: 'Iron Only', count: 156, revenue: 11700 },
    { service: 'Stain Removal', count: 45, revenue: 13500 },
  ];

  const operationalColumns = [
    { title: 'Store', dataIndex: 'store', key: 'store' },
    { title: 'Total Orders', dataIndex: 'orders', key: 'orders' },
    { title: 'Pending', dataIndex: 'pending', key: 'pending' },
    { title: 'Completed', dataIndex: 'completed', key: 'completed' },
    { title: 'Revenue', dataIndex: 'revenue', key: 'revenue', render: (val) => `₹${val}` },
  ];

  const serviceColumns = [
    { title: 'Service', dataIndex: 'service', key: 'service' },
    { title: 'Count', dataIndex: 'count', key: 'count' },
    { title: 'Revenue', dataIndex: 'revenue', key: 'revenue', render: (val) => `₹${val}` },
  ];

  const tabItems = [
    {
      key: 'operational',
      label: 'Operational Reports',
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic title="Total Orders" value={429} />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic title="Completed" value={394} valueStyle={{ color: '#52c41a' }} />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic title="Pending" value={35} valueStyle={{ color: '#fa8c16' }} />
              </Card>
            </Col>
          </Row>

          <Card title="Store-wise Performance">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={operationalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="store" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#1890ff" name="Orders" />
                <Bar dataKey="completed" fill="#52c41a" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Detailed Report" style={{ marginTop: '16px' }}>
            <Table
              dataSource={operationalData}
              columns={operationalColumns}
              pagination={false}
              rowKey="store"
            />
          </Card>
        </div>
      ),
    },
    {
      key: 'financial',
      label: 'Financial Reports',
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={6}>
              <Card>
                <Statistic title="Total Revenue" value={135000} prefix="₹" />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card>
                <Statistic title="GST Collected" value={24300} prefix="₹" />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card>
                <Statistic title="Outstanding" value={8500} prefix="₹" valueStyle={{ color: '#fa8c16' }} />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card>
                <Statistic title="Profit" value={38500} prefix="₹" valueStyle={{ color: '#52c41a' }} />
              </Card>
            </Col>
          </Row>

          <Card title="Revenue Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => value.split('-')[2]} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#52c41a" strokeWidth={2} name="Revenue (₹)" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      ),
    },
    {
      key: 'service',
      label: 'Service Analysis',
      children: (
        <div>
          <Card title="Service-wise Performance">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#1890ff" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Service Details" style={{ marginTop: '16px' }}>
            <Table
              dataSource={serviceData}
              columns={serviceColumns}
              pagination={false}
              rowKey="service"
            />
          </Card>
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Reports & Analytics</h2>
        <Space>
          <RangePicker />
          <Select defaultValue="all" style={{ width: 150 }}>
            <Option value="all">All Stores</Option>
            <Option value="ST001">Store 001</Option>
            <Option value="ST002">Store 002</Option>
          </Select>
          <Button icon={<FileExcelOutlined />}>Export Excel</Button>
          <Button icon={<PrinterOutlined />}>Print</Button>
        </Space>
      </div>

      <Card>
        <Tabs items={tabItems} />
      </Card>
    </MainLayout>
  );
};

export default Reports;
