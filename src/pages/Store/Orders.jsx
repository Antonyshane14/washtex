import React, { useState } from 'react';
import { Card, Form, Select, Input, Button, Table, Space, Tag, Modal, message, InputNumber, Row, Col, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined, QrcodeOutlined, PrinterOutlined } from '@ant-design/icons';
import QRCode from 'qrcode.react';
import MainLayout from '../../components/Layout/MainLayout';
import { mockCustomers, mockServiceTypes, mockItemCategories, generateQRCode } from '../../utils/mockData';

const { Option } = Select;
const { TextArea } = Input;

const StoreOrders = () => {
  const [form] = Form.useForm();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [generatedQRCodes, setGeneratedQRCodes] = useState([]);

  const handleCustomerSelect = (customerId) => {
    const customer = mockCustomers.find(c => c.id === customerId);
    setSelectedCustomer(customer);
  };

  const addItem = (values) => {
    const service = mockServiceTypes.find(s => s.id === values.serviceId);
    const isExpress = values.urgency === 'express';
    const price = isExpress ? service.expressPrice : service.price;
    
    const newItem = {
      key: Date.now(),
      itemId: `ITEM${String(orderItems.length + 1).padStart(3, '0')}`,
      category: values.category,
      serviceId: values.serviceId,
      serviceName: service.name,
      quantity: values.quantity,
      urgency: values.urgency,
      price: price * values.quantity,
      specialInstructions: values.specialInstructions,
    };

    setOrderItems([...orderItems, newItem]);
    form.resetFields(['category', 'serviceId', 'quantity', 'urgency', 'specialInstructions']);
    message.success('Item added to order');
  };

  const removeItem = (key) => {
    setOrderItems(orderItems.filter(item => item.key !== key));
    message.info('Item removed');
  };

  const generateQRTags = () => {
    if (orderItems.length === 0) {
      message.warning('Please add items to generate QR codes');
      return;
    }

    if (!selectedCustomer) {
      message.warning('Please select a customer');
      return;
    }

    const orderId = `ORD${Date.now().toString().slice(-6)}`;
    const storeId = 'ST001';

    const qrCodes = orderItems.map(item => ({
      ...item,
      orderId,
      qrCode: generateQRCode(storeId, orderId, item.itemId, item.serviceId),
      customerName: selectedCustomer.name,
    }));

    setGeneratedQRCodes(qrCodes);
    setQrModalVisible(true);
  };

  const handlePrintQRCodes = () => {
    window.print();
    message.success('QR codes sent to printer');
  };

  const submitOrder = () => {
    if (!selectedCustomer) {
      message.error('Please select a customer');
      return;
    }

    if (orderItems.length === 0) {
      message.error('Please add items to the order');
      return;
    }

    Modal.confirm({
      title: 'Confirm Order',
      content: `Create order for ${selectedCustomer.name} with ${orderItems.length} items (Total: ₹${totalAmount})?`,
      onOk: () => {
        message.success('Order created successfully');
        // Reset form
        setSelectedCustomer(null);
        setOrderItems([]);
        form.resetFields();
      },
    });
  };

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

  const columns = [
    {
      title: 'Item',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Service',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Urgency',
      dataIndex: 'urgency',
      key: 'urgency',
      render: (urgency) => (
        <Tag color={urgency === 'express' ? 'red' : 'default'}>
          {urgency.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="link" 
          danger 
          icon={<DeleteOutlined />}
          onClick={() => removeItem(record.key)}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <h2>Create New Order</h2>
      </div>

      <Row gutter={16}>
        <Col xs={24} lg={10}>
          <Card title="Customer Selection">
            <Select
              style={{ width: '100%' }}
              placeholder="Search customer by name or phone"
              showSearch
              size="large"
              onChange={handleCustomerSelect}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {mockCustomers.map(customer => (
                <Option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.phone}
                </Option>
              ))}
            </Select>

            {selectedCustomer && (
              <div style={{ marginTop: '16px', padding: '16px', background: '#f0f2f5', borderRadius: '6px' }}>
                <p><strong>Name:</strong> {selectedCustomer.name}</p>
                <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                <p><strong>Membership:</strong> <Tag color="gold">{selectedCustomer.membershipType}</Tag></p>
                <p><strong>Balance:</strong> {selectedCustomer.membershipBalance}/{selectedCustomer.totalBalance} items</p>
              </div>
            )}
          </Card>

          <Card title="Add Items" style={{ marginTop: '16px' }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={addItem}
            >
              <Form.Item
                name="category"
                label="Item Category"
                rules={[{ required: true, message: 'Select category' }]}
              >
                <Select placeholder="Select item category" size="large">
                  {mockItemCategories.map(category => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="serviceId"
                label="Service Type"
                rules={[{ required: true, message: 'Select service' }]}
              >
                <Select placeholder="Select service" size="large">
                  {mockServiceTypes.map(service => (
                    <Option key={service.id} value={service.id}>
                      {service.name} - ₹{service.price} (Express: ₹{service.expressPrice})
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="quantity"
                    label="Quantity"
                    rules={[{ required: true, message: 'Enter quantity' }]}
                    initialValue={1}
                  >
                    <InputNumber min={1} max={50} style={{ width: '100%' }} size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="urgency"
                    label="Urgency"
                    rules={[{ required: true, message: 'Select urgency' }]}
                    initialValue="regular"
                  >
                    <Select size="large">
                      <Option value="regular">Regular</Option>
                      <Option value="express">Express</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="specialInstructions"
                label="Special Instructions"
              >
                <TextArea rows={2} placeholder="Any special instructions..." />
              </Form.Item>

              <Button type="dashed" htmlType="submit" icon={<PlusOutlined />} block size="large">
                Add Item to Order
              </Button>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          <Card title={`Order Items (${orderItems.length})`}>
            <Table
              dataSource={orderItems}
              columns={columns}
              pagination={false}
              rowKey="key"
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={4} index={0}>
                      <strong>Total Amount</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <strong style={{ fontSize: '16px', color: '#52c41a' }}>
                        ₹{totalAmount}
                      </strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} />
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />

            <Divider />

            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button 
                icon={<QrcodeOutlined />}
                onClick={generateQRTags}
                disabled={orderItems.length === 0}
              >
                Generate QR Tags
              </Button>
              <Button 
                type="primary" 
                size="large"
                onClick={submitOrder}
                disabled={orderItems.length === 0 || !selectedCustomer}
              >
                Create Order & Generate Receipt
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* QR Code Modal */}
      <Modal
        title="Generated QR Tags"
        open={qrModalVisible}
        onCancel={() => setQrModalVisible(false)}
        width={900}
        footer={[
          <Button key="close" onClick={() => setQrModalVisible(false)}>
            Close
          </Button>,
          <Button key="print" type="primary" icon={<PrinterOutlined />} onClick={handlePrintQRCodes}>
            Print All Tags
          </Button>,
        ]}
      >
        <div className="print-area">
          <Row gutter={[16, 16]}>
            {generatedQRCodes.map((item, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <QRCode value={item.qrCode} size={120} />
                  <div style={{ marginTop: '12px', fontSize: '12px' }}>
                    <p><strong>{item.category}</strong></p>
                    <p>{item.serviceName}</p>
                    <p>{item.customerName}</p>
                    <p style={{ fontSize: '10px', color: '#8c8c8c' }}>{item.qrCode}</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Modal>
    </MainLayout>
  );
};

export default StoreOrders;
