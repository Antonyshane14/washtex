import React, { useState } from 'react';
import { Card, Form, Select, Input, Button, Table, Space, Tag, Modal, message, Radio, Row, Col, Statistic, Divider } from 'antd';
import { DollarOutlined, CreditCardOutlined, PrinterOutlined } from '@ant-design/icons';
import MainLayout from '../../components/Layout/MainLayout';
import { mockCustomers, mockOrders } from '../../utils/mockData';

const { Option } = Select;

const StoreBilling = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentMode, setPaymentMode] = useState('cash');
  const [splitPayment, setSplitPayment] = useState(false);
  const [invoiceModalVisible, setInvoiceModalVisible] = useState(false);
  const [generatedInvoice, setGeneratedInvoice] = useState(null);

  const handleOrderSelect = (orderId) => {
    const order = mockOrders.find(o => o.id === orderId);
    setSelectedOrder(order);
  };

  const calculateGST = (amount) => {
    return (amount * 0.18).toFixed(2);
  };

  const handlePayment = (values) => {
    if (!selectedOrder) {
      message.error('Please select an order');
      return;
    }

    const gst = parseFloat(calculateGST(selectedOrder.totalAmount));
    const grandTotal = selectedOrder.totalAmount + gst;

    const invoice = {
      invoiceNo: `INV${Date.now().toString().slice(-8)}`,
      date: new Date().toLocaleString(),
      order: selectedOrder,
      paymentMode: values.paymentMode,
      paidAmount: values.paidAmount || grandTotal,
      gst: gst,
      grandTotal: grandTotal,
      transactionRef: values.transactionRef || 'N/A',
    };

    setGeneratedInvoice(invoice);
    setInvoiceModalVisible(true);
    message.success('Payment processed successfully');
  };

  const printInvoice = () => {
    window.print();
    message.success('Invoice sent to printer');
  };

  const columns = [
    {
      title: 'Item',
      dataIndex: ['type'],
      key: 'type',
    },
    {
      title: 'Service',
      dataIndex: ['service'],
      key: 'service',
    },
    {
      title: 'Quantity',
      dataIndex: ['quantity'],
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: ['price'],
      key: 'price',
      render: (price) => `₹${price}`,
    },
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Billing & Payment</h2>
      </div>

      <Row gutter={16}>
        <Col xs={24} lg={10}>
          <Card title="Select Order">
            <Select
              style={{ width: '100%' }}
              placeholder="Search order by ID or customer"
              showSearch
              size="large"
              onChange={handleOrderSelect}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {mockOrders.map(order => (
                <Option key={order.id} value={order.id}>
                  {order.id} - {order.customerName} - ₹{order.totalAmount}
                </Option>
              ))}
            </Select>

            {selectedOrder && (
              <div style={{ marginTop: '16px' }}>
                <Card size="small" title="Order Details">
                  <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                  <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
                  <p><strong>Status:</strong> <Tag color="blue">{selectedOrder.status}</Tag></p>
                  <p><strong>Created:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                  
                  <Divider />
                  
                  <Table
                    dataSource={selectedOrder.items}
                    columns={columns}
                    pagination={false}
                    size="small"
                  />
                  
                  <Divider />
                  
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Subtotal:</span>
                      <strong>₹{selectedOrder.totalAmount}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>GST (18%):</span>
                      <strong>₹{calculateGST(selectedOrder.totalAmount)}</strong>
                    </div>
                    <Divider style={{ margin: '8px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '16px' }}><strong>Grand Total:</strong></span>
                      <strong style={{ fontSize: '18px', color: '#52c41a' }}>
                        ₹{(selectedOrder.totalAmount + parseFloat(calculateGST(selectedOrder.totalAmount))).toFixed(2)}
                      </strong>
                    </div>
                  </Space>
                </Card>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          <Card title="Payment Details">
            <Form
              layout="vertical"
              onFinish={handlePayment}
              initialValues={{ paymentMode: 'cash' }}
            >
              <Form.Item
                name="paymentMode"
                label="Payment Mode"
                rules={[{ required: true }]}
              >
                <Radio.Group size="large" style={{ width: '100%' }}>
                  <Row gutter={16}>
                    <Col span={6}>
                      <Radio.Button value="cash" style={{ width: '100%', textAlign: 'center' }}>
                        Cash
                      </Radio.Button>
                    </Col>
                    <Col span={6}>
                      <Radio.Button value="card" style={{ width: '100%', textAlign: 'center' }}>
                        Card
                      </Radio.Button>
                    </Col>
                    <Col span={6}>
                      <Radio.Button value="upi" style={{ width: '100%', textAlign: 'center' }}>
                        UPI
                      </Radio.Button>
                    </Col>
                    <Col span={6}>
                      <Radio.Button value="wallet" style={{ width: '100%', textAlign: 'center' }}>
                        Wallet
                      </Radio.Button>
                    </Col>
                  </Row>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="transactionRef"
                label="Transaction Reference (for card/UPI)"
              >
                <Input placeholder="Enter transaction reference number" size="large" />
              </Form.Item>

              <Form.Item label="Split Payment">
                <Radio.Group onChange={(e) => setSplitPayment(e.target.value)} value={splitPayment}>
                  <Radio value={false}>Full Payment</Radio>
                  <Radio value={true}>Split Payment</Radio>
                </Radio.Group>
              </Form.Item>

              {splitPayment && (
                <Form.Item
                  name="paidAmount"
                  label="Amount Paid"
                  rules={[{ required: splitPayment, message: 'Enter paid amount' }]}
                >
                  <Input 
                    type="number" 
                    prefix="₹" 
                    placeholder="Enter amount paid" 
                    size="large"
                  />
                </Form.Item>
              )}

              <Form.Item label="Use Membership Balance">
                <Radio.Group defaultValue={false}>
                  <Radio value={false}>No</Radio>
                  <Radio value={true}>Yes (Deduct from membership)</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<DollarOutlined />}
                  size="large"
                  block
                  disabled={!selectedOrder}
                >
                  Process Payment & Generate Invoice
                </Button>
              </Form.Item>
            </Form>

            <Card title="Quick Stats" style={{ marginTop: '16px' }} size="small">
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic title="Today's Collection" value={45000} prefix="₹" />
                </Col>
                <Col span={8}>
                  <Statistic title="Pending Payments" value={8500} prefix="₹" valueStyle={{ color: '#fa8c16' }} />
                </Col>
                <Col span={8}>
                  <Statistic title="Transactions" value={32} />
                </Col>
              </Row>
            </Card>
          </Card>
        </Col>
      </Row>

      {/* Invoice Modal */}
      <Modal
        title="Invoice Generated"
        open={invoiceModalVisible}
        onCancel={() => setInvoiceModalVisible(false)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setInvoiceModalVisible(false)}>
            Close
          </Button>,
          <Button key="print" type="primary" icon={<PrinterOutlined />} onClick={printInvoice}>
            Print Invoice
          </Button>,
        ]}
      >
        {generatedInvoice && (
          <div className="print-area" style={{ padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0 }}>WashTex Laundry Services</h2>
              <p style={{ margin: '4px 0' }}>123 Main Street, City - 560001</p>
              <p style={{ margin: '4px 0' }}>Phone: +91 98765 43210 | Email: info@washtex.com</p>
              <p style={{ margin: '4px 0' }}>GSTIN: 29ABCDE1234F1Z5</p>
            </div>

            <Divider />

            <Row gutter={16}>
              <Col span={12}>
                <p><strong>Invoice No:</strong> {generatedInvoice.invoiceNo}</p>
                <p><strong>Date:</strong> {generatedInvoice.date}</p>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <p><strong>Order ID:</strong> {generatedInvoice.order.id}</p>
                <p><strong>Customer:</strong> {generatedInvoice.order.customerName}</p>
              </Col>
            </Row>

            <Divider />

            <Table
              dataSource={generatedInvoice.order.items}
              columns={columns}
              pagination={false}
              size="small"
            />

            <Divider />

            <Row>
              <Col span={12} offset={12}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotal:</span>
                    <span>₹{generatedInvoice.order.totalAmount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>GST (18%):</span>
                    <span>₹{generatedInvoice.gst}</span>
                  </div>
                  <Divider style={{ margin: '8px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>Grand Total:</strong>
                    <strong style={{ fontSize: '18px' }}>₹{generatedInvoice.grandTotal.toFixed(2)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Paid Amount:</span>
                    <span style={{ color: '#52c41a' }}>₹{generatedInvoice.paidAmount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Payment Mode:</span>
                    <Tag color="blue">{generatedInvoice.paymentMode.toUpperCase()}</Tag>
                  </div>
                </Space>
              </Col>
            </Row>

            <Divider />

            <p style={{ textAlign: 'center', fontSize: '12px', color: '#8c8c8c' }}>
              Thank you for choosing WashTex! Please check all items before leaving.
            </p>
          </div>
        )}
      </Modal>
    </MainLayout>
  );
};

export default StoreBilling;
