import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Tag, 
  Space, 
  Button, 
  Input, 
  Select, 
  Modal, 
  Timeline, 
  Row, 
  Col, 
  Statistic,
  Progress,
  Descriptions,
  Badge,
  Avatar,
  Divider,
  Typography
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  EnvironmentOutlined,
  CarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  PhoneOutlined,
  UserOutlined,
  ShopOutlined,
  BuildOutlined
} from '@ant-design/icons';
import MainLayout from '../../components/Layout/MainLayout';

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const AdminOrderTracking = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');

  // Mock order data with tracking information - Hyderabad based
  const orders = [
    {
      id: 'ORD-HYD-001',
      customerName: 'Rajesh Kumar',
      customerPhone: '+91 9876543210',
      outlet: 'Banjara Hills Store',
      outletLocation: { lat: 17.4239, lng: 78.4738, address: 'Road No 12, Banjara Hills, Hyderabad, Telangana 500034' },
      itemCount: 45,
      services: ['Washing', 'Dry Cleaning', 'Ironing'],
      serviceBreakdown: {
        washing: { items: 25, status: 'completed', stage: 'Drying Complete' },
        dryCleaning: { items: 15, status: 'active', stage: 'Chemical Treatment' },
        ironing: { items: 5, status: 'pending', stage: 'Not Started' }
      },
      currentStage: 'Processing - Dry Cleaning',
      stageProgress: 45,
      orderDate: '2025-11-10 09:30 AM',
      expectedDelivery: '2025-11-15 05:00 PM',
      deliveryPerson: {
        name: 'Ravi Teja',
        phone: '+91 9988776655',
        currentLocation: { lat: 17.4326, lng: 78.4071, address: 'Jubilee Hills Check Post, Hyderabad' },
        vehicle: 'Tempo - TS09 UA 1234'
      },
      factory: 'Gachibowli Processing Center',
      factoryLocation: { lat: 17.4435, lng: 78.3479, address: 'DLF Cyber City, Gachibowli, Hyderabad, Telangana 500032' },
      timeline: [
        { stage: 'Order Created', time: '2025-11-10 09:30 AM', status: 'completed', location: 'Banjara Hills Store' },
        { stage: 'Picked Up from Store', time: '2025-11-10 11:00 AM', status: 'completed', location: 'Banjara Hills Store', person: 'Ravi Teja' },
        { stage: 'In Transit to Factory', time: '2025-11-10 11:30 AM', status: 'completed', location: 'Jubilee Hills Check Post', person: 'Ravi Teja' },
        { stage: 'Arrived at Factory', time: '2025-11-10 12:15 PM', status: 'completed', location: 'Gachibowli Processing Center' },
        { stage: 'Initial Sorting & Inspection', time: '2025-11-10 12:30 PM', status: 'completed', location: 'Reception Area', details: 'Items sorted by service type' },
        { 
          stage: 'Washing Service', 
          time: '2025-11-10 01:00 PM', 
          status: 'completed', 
          location: 'Washing Department',
          substages: [
            { name: 'Pre-wash Inspection', status: 'completed', time: '2025-11-10 01:00 PM', details: '25 items - Stain checking' },
            { name: 'Loading Machine', status: 'completed', time: '2025-11-10 01:15 PM', details: 'Machine W-07' },
            { name: 'Washing Cycle', status: 'completed', time: '2025-11-10 01:20 PM', details: 'Hot water wash with detergent' },
            { name: 'Rinsing', status: 'completed', time: '2025-11-10 02:00 PM', details: 'Double rinse cycle' },
            { name: 'Spinning', status: 'completed', time: '2025-11-10 02:20 PM', details: 'High speed spin' },
            { name: 'Drying', status: 'completed', time: '2025-11-10 02:40 PM', details: 'Tumble dry - Medium heat' }
          ]
        },
        { 
          stage: 'Dry Cleaning Service', 
          time: '2025-11-11 10:00 AM', 
          status: 'active', 
          location: 'Dry Cleaning Department',
          substages: [
            { name: 'Pre-cleaning Inspection', status: 'completed', time: '2025-11-11 10:00 AM', details: '15 items - Fabric & stain analysis' },
            { name: 'Stain Pre-treatment', status: 'completed', time: '2025-11-11 10:30 AM', details: 'Special stain remover applied' },
            { name: 'Chemical Treatment', status: 'active', time: '2025-11-11 11:00 AM', details: 'Perchloroethylene cleaning in progress' },
            { name: 'Drying Chamber', status: 'pending', time: 'Pending', details: 'Temperature controlled drying' },
            { name: 'Deodorization', status: 'pending', time: 'Pending', details: 'Chemical odor removal' },
            { name: 'Final Inspection', status: 'pending', time: 'Pending', details: 'Quality check' }
          ]
        },
        { stage: 'Ironing Service', time: 'Pending', status: 'pending', location: 'Ironing Section', details: '5 items waiting' },
        { stage: 'Quality Check', time: 'Pending', status: 'pending', location: 'QC Department' },
        { stage: 'Packaging', time: 'Pending', status: 'pending', location: 'Packing Area' },
        { stage: 'Ready for Delivery', time: 'Pending', status: 'pending', location: 'Dispatch Section' },
        { stage: 'Out for Delivery', time: 'Pending', status: 'pending', location: 'En route to customer' },
        { stage: 'Delivered', time: 'Pending', status: 'pending', location: 'Customer Address - Banjara Hills' }
      ]
    },
    {
      id: 'ORD-HYD-002',
      customerName: 'Priya Sharma',
      customerPhone: '+91 8765432109',
      outlet: 'Kukatpally Store',
      outletLocation: { lat: 17.4948, lng: 78.3911, address: 'KPHB Colony, Kukatpally, Hyderabad, Telangana 500072' },
      itemCount: 32,
      services: ['Washing', 'Steam Ironing'],
      serviceBreakdown: {
        washing: { items: 28, status: 'completed', stage: 'Drying Complete' },
        steamIroning: { items: 28, status: 'active', stage: 'Steam Press in Progress' },
        dryCleaning: { items: 0, status: 'not_applicable', stage: 'N/A' }
      },
      currentStage: 'Processing - Steam Ironing',
      stageProgress: 75,
      orderDate: '2025-11-09 02:15 PM',
      expectedDelivery: '2025-11-13 04:00 PM',
      deliveryPerson: {
        name: 'Venkat Reddy',
        phone: '+91 9123456789',
        currentLocation: { lat: 17.4435, lng: 78.3479, address: 'Gachibowli Processing Center' },
        vehicle: 'Bike - TS09 FB 5678'
      },
      factory: 'Gachibowli Processing Center',
      factoryLocation: { lat: 17.4435, lng: 78.3479, address: 'DLF Cyber City, Gachibowli, Hyderabad, Telangana 500032' },
      timeline: [
        { stage: 'Order Created', time: '2025-11-09 02:15 PM', status: 'completed', location: 'Kukatpally Store' },
        { stage: 'Picked Up from Store', time: '2025-11-09 03:00 PM', status: 'completed', location: 'Kukatpally Store', person: 'Venkat Reddy' },
        { stage: 'In Transit to Factory', time: '2025-11-09 03:30 PM', status: 'completed', location: 'Miyapur X Roads', person: 'Venkat Reddy' },
        { stage: 'Arrived at Factory', time: '2025-11-09 04:15 PM', status: 'completed', location: 'Gachibowli Processing Center' },
        { stage: 'Initial Sorting & Inspection', time: '2025-11-09 04:30 PM', status: 'completed', location: 'Reception Area' },
        { 
          stage: 'Washing Service', 
          time: '2025-11-09 05:00 PM', 
          status: 'completed', 
          location: 'Washing Department',
          substages: [
            { name: 'Pre-wash Inspection', status: 'completed', time: '2025-11-09 05:00 PM', details: '28 items checked' },
            { name: 'Loading Machine', status: 'completed', time: '2025-11-09 05:15 PM', details: 'Machine W-03' },
            { name: 'Washing Cycle', status: 'completed', time: '2025-11-09 05:20 PM', details: 'Regular wash - 40°C' },
            { name: 'Rinsing', status: 'completed', time: '2025-11-09 06:00 PM', details: 'Fabric softener added' },
            { name: 'Spinning', status: 'completed', time: '2025-11-09 06:20 PM', details: 'High speed extraction' },
            { name: 'Drying', status: 'completed', time: '2025-11-10 09:00 AM', details: 'Tumble dry complete' }
          ]
        },
        { 
          stage: 'Steam Ironing Service', 
          time: '2025-11-10 10:00 AM', 
          status: 'active', 
          location: 'Ironing Section',
          substages: [
            { name: 'Sorting by Fabric Type', status: 'completed', time: '2025-11-10 10:00 AM', details: 'Cotton, Linen, Synthetic separated' },
            { name: 'Steam Press - Cotton Items', status: 'completed', time: '2025-11-10 10:30 AM', details: '15 items pressed - Station I-02' },
            { name: 'Steam Press - Linen Items', status: 'active', time: '2025-11-10 11:00 AM', details: '8 items in progress - Station I-05' },
            { name: 'Steam Press - Synthetic Items', status: 'pending', time: 'Pending', details: '5 items waiting' },
            { name: 'Folding & Hanging', status: 'pending', time: 'Pending', details: 'Final arrangement' }
          ]
        },
        { stage: 'Quality Check', time: 'Pending', status: 'pending', location: 'QC Department' },
        { stage: 'Packaging', time: 'Pending', status: 'pending', location: 'Packing Area' },
        { stage: 'Ready for Delivery', time: 'Pending', status: 'pending', location: 'Dispatch Section' },
        { stage: 'Out for Delivery', time: 'Pending', status: 'pending', location: 'En route' },
        { stage: 'Delivered', time: 'Pending', status: 'pending', location: 'Customer Address - Kukatpally' }
      ]
    },
    {
      id: 'ORD-HYD-003',
      customerName: 'Mohammed Azharuddin',
      customerPhone: '+91 9012345678',
      outlet: 'Secunderabad Store',
      outletLocation: { lat: 17.4399, lng: 78.4983, address: 'SD Road, Secunderabad, Telangana 500003' },
      itemCount: 18,
      services: ['Dry Cleaning', 'Specialized Treatment'],
      serviceBreakdown: {
        dryCleaning: { items: 15, status: 'completed', stage: 'Complete' },
        specializedTreatment: { items: 3, status: 'completed', stage: 'Suit Press Complete' },
        washing: { items: 0, status: 'not_applicable', stage: 'N/A' }
      },
      currentStage: 'Out for Delivery',
      stageProgress: 90,
      orderDate: '2025-11-08 10:00 AM',
      expectedDelivery: '2025-11-12 04:00 PM',
      deliveryPerson: {
        name: 'Srinivas Rao',
        phone: '+91 8887776665',
        currentLocation: { lat: 17.4416, lng: 78.4881, address: 'Paradise Circle, Secunderabad' },
        vehicle: 'Van - TS09 UC 9012'
      },
      factory: 'Gachibowli Processing Center',
      factoryLocation: { lat: 17.4435, lng: 78.3479, address: 'DLF Cyber City, Gachibowli, Hyderabad, Telangana 500032' },
      timeline: [
        { stage: 'Order Created', time: '2025-11-08 10:00 AM', status: 'completed', location: 'Secunderabad Store' },
        { stage: 'Picked Up from Store', time: '2025-11-08 11:30 AM', status: 'completed', location: 'Secunderabad Store', person: 'Srinivas Rao' },
        { stage: 'In Transit to Factory', time: '2025-11-08 12:00 PM', status: 'completed', location: 'Ameerpet Metro', person: 'Srinivas Rao' },
        { stage: 'Arrived at Factory', time: '2025-11-08 01:00 PM', status: 'completed', location: 'Gachibowli Processing Center' },
        { stage: 'Initial Sorting & Inspection', time: '2025-11-08 01:15 PM', status: 'completed', location: 'Reception Area' },
        { 
          stage: 'Dry Cleaning Service', 
          time: '2025-11-08 02:00 PM', 
          status: 'completed', 
          location: 'Dry Cleaning Department',
          substages: [
            { name: 'Pre-cleaning Inspection', status: 'completed', time: '2025-11-08 02:00 PM', details: '15 items - Blazers, trousers, suits' },
            { name: 'Stain Pre-treatment', status: 'completed', time: '2025-11-08 02:30 PM', details: 'Oil stain treatment applied' },
            { name: 'Chemical Treatment', status: 'completed', time: '2025-11-08 03:00 PM', details: 'PERC cleaning - Machine DC-04' },
            { name: 'Drying Chamber', status: 'completed', time: '2025-11-08 04:30 PM', details: 'Low temperature drying' },
            { name: 'Deodorization', status: 'completed', time: '2025-11-08 05:00 PM', details: 'Fresh scent applied' },
            { name: 'Final Inspection', status: 'completed', time: '2025-11-08 05:30 PM', details: 'No marks or residue' }
          ]
        },
        { 
          stage: 'Specialized Treatment - Suit Press', 
          time: '2025-11-09 10:00 AM', 
          status: 'completed', 
          location: 'Premium Service Section',
          substages: [
            { name: 'Suit Jacket Press', status: 'completed', time: '2025-11-09 10:00 AM', details: '2 blazers - Professional press' },
            { name: 'Trouser Press with Crease', status: 'completed', time: '2025-11-09 10:45 AM', details: 'Sharp crease formation' },
            { name: 'Shirt Hand Press', status: 'completed', time: '2025-11-09 11:15 AM', details: '1 formal shirt' },
            { name: 'Finishing Touch', status: 'completed', time: '2025-11-09 11:30 AM', details: 'Lint removal, button check' }
          ]
        },
        { stage: 'Quality Check', time: '2025-11-10 10:00 AM', status: 'completed', location: 'QC Department', details: 'All items passed inspection' },
        { stage: 'Packaging', time: '2025-11-10 11:00 AM', status: 'completed', location: 'Packing Area', details: 'Premium packaging with covers' },
        { stage: 'Ready for Delivery', time: '2025-11-11 09:00 AM', status: 'completed', location: 'Dispatch Section' },
        { stage: 'Out for Delivery', time: '2025-11-12 01:00 PM', status: 'active', location: 'Paradise Circle, Secunderabad', person: 'Srinivas Rao', details: 'ETA: 30 minutes' },
        { stage: 'Delivered', time: 'Pending', status: 'pending', location: 'Customer Address - Secunderabad' }
      ]
    },
    {
      id: 'ORD-HYD-004',
      customerName: 'Lakshmi Devi',
      customerPhone: '+91 7654321098',
      outlet: 'Kondapur Store',
      outletLocation: { lat: 17.4621, lng: 78.3647, address: 'Botanical Garden Road, Kondapur, Hyderabad, Telangana 500084' },
      itemCount: 60,
      services: ['Washing', 'Dry Cleaning', 'Ironing', 'Stain Removal'],
      serviceBreakdown: {
        washing: { items: 35, status: 'completed', stage: 'Complete' },
        dryCleaning: { items: 20, status: 'completed', stage: 'Complete' },
        stainRemoval: { items: 5, status: 'completed', stage: 'Complete' },
        ironing: { items: 60, status: 'active', stage: 'Quality Check - Inspection' }
      },
      currentStage: 'Quality Check',
      stageProgress: 85,
      orderDate: '2025-11-09 08:00 AM',
      expectedDelivery: '2025-11-13 06:00 PM',
      deliveryPerson: {
        name: 'Kumar Swamy',
        phone: '+91 9876501234',
        currentLocation: { lat: 17.4435, lng: 78.3479, address: 'Gachibowli Processing Center' },
        vehicle: 'Tempo - TS09 UD 3456'
      },
      factory: 'Gachibowli Processing Center',
      factoryLocation: { lat: 17.4435, lng: 78.3479, address: 'DLF Cyber City, Gachibowli, Hyderabad, Telangana 500032' },
      timeline: [
        { stage: 'Order Created', time: '2025-11-09 08:00 AM', status: 'completed', location: 'Kondapur Store' },
        { stage: 'Picked Up from Store', time: '2025-11-09 09:30 AM', status: 'completed', location: 'Kondapur Store', person: 'Kumar Swamy' },
        { stage: 'In Transit to Factory', time: '2025-11-09 10:00 AM', status: 'completed', location: 'HITEC City', person: 'Kumar Swamy' },
        { stage: 'Arrived at Factory', time: '2025-11-09 10:45 AM', status: 'completed', location: 'Gachibowli Processing Center' },
        { stage: 'Initial Sorting & Inspection', time: '2025-11-09 11:00 AM', status: 'completed', location: 'Reception Area', details: '60 items sorted by service type' },
        { 
          stage: 'Specialized Stain Removal', 
          time: '2025-11-09 11:30 AM', 
          status: 'completed', 
          location: 'Stain Treatment Section',
          substages: [
            { name: 'Stain Identification', status: 'completed', time: '2025-11-09 11:30 AM', details: 'Oil, curry, wine stains identified' },
            { name: 'Chemical Application', status: 'completed', time: '2025-11-09 12:00 PM', details: 'Enzyme-based stain removers' },
            { name: 'Soaking Treatment', status: 'completed', time: '2025-11-09 12:30 PM', details: '30 minutes soaking' },
            { name: 'Spot Cleaning', status: 'completed', time: '2025-11-09 01:00 PM', details: 'Manual spot treatment' },
            { name: 'Pre-treatment Complete', status: 'completed', time: '2025-11-09 01:30 PM', details: 'Ready for main wash' }
          ]
        },
        { 
          stage: 'Washing Service', 
          time: '2025-11-09 02:00 PM', 
          status: 'completed', 
          location: 'Washing Department',
          substages: [
            { name: 'Pre-wash Inspection', status: 'completed', time: '2025-11-09 02:00 PM', details: '35 items segregated' },
            { name: 'Loading Machine', status: 'completed', time: '2025-11-09 02:15 PM', details: 'Machines W-02, W-05' },
            { name: 'Washing Cycle', status: 'completed', time: '2025-11-09 02:20 PM', details: 'Heavy duty wash - 60°C' },
            { name: 'Rinsing', status: 'completed', time: '2025-11-09 03:00 PM', details: 'Triple rinse for stain removal' },
            { name: 'Spinning', status: 'completed', time: '2025-11-09 03:30 PM', details: 'High speed centrifuge' },
            { name: 'Drying', status: 'completed', time: '2025-11-09 05:00 PM', details: 'Industrial dryer - Complete' }
          ]
        },
        { 
          stage: 'Dry Cleaning Service', 
          time: '2025-11-09 02:00 PM', 
          status: 'completed', 
          location: 'Dry Cleaning Department',
          substages: [
            { name: 'Pre-cleaning Inspection', status: 'completed', time: '2025-11-09 02:00 PM', details: '20 delicate items' },
            { name: 'Stain Pre-treatment', status: 'completed', time: '2025-11-09 02:30 PM', details: 'Specialized pre-treatment' },
            { name: 'Chemical Treatment', status: 'completed', time: '2025-11-09 03:00 PM', details: 'Green Earth cleaning - DC-06' },
            { name: 'Drying Chamber', status: 'completed', time: '2025-11-09 04:30 PM', details: 'Gentle drying cycle' },
            { name: 'Deodorization', status: 'completed', time: '2025-11-09 05:00 PM', details: 'Natural fragrance' },
            { name: 'Final Inspection', status: 'completed', time: '2025-11-09 05:30 PM', details: 'Stains removed successfully' }
          ]
        },
        { 
          stage: 'Ironing Service', 
          time: '2025-11-10 09:00 AM', 
          status: 'completed', 
          location: 'Ironing Section',
          substages: [
            { name: 'Sorting by Fabric', status: 'completed', time: '2025-11-10 09:00 AM', details: 'All 60 items categorized' },
            { name: 'Steam Press - Delicate', status: 'completed', time: '2025-11-10 09:30 AM', details: '20 items - Low heat' },
            { name: 'Steam Press - Regular', status: 'completed', time: '2025-11-10 10:30 AM', details: '30 items - Medium heat' },
            { name: 'Heavy Duty Press', status: 'completed', time: '2025-11-10 11:30 AM', details: '10 items - High heat' },
            { name: 'Folding & Hanging', status: 'completed', time: '2025-11-10 12:00 PM', details: 'Professional folding' }
          ]
        },
        { 
          stage: 'Quality Check', 
          time: '2025-11-11 02:00 PM', 
          status: 'active', 
          location: 'QC Department',
          substages: [
            { name: 'Visual Inspection', status: 'completed', time: '2025-11-11 02:00 PM', details: 'Checking for stains, tears' },
            { name: 'Stain Verification', status: 'completed', time: '2025-11-11 02:30 PM', details: 'All stains removed' },
            { name: 'Ironing Quality Check', status: 'active', time: '2025-11-11 03:00 PM', details: 'Checking press quality' },
            { name: 'Button & Zipper Check', status: 'pending', time: 'Pending', details: 'Hardware inspection' },
            { name: 'Final Count Verification', status: 'pending', time: 'Pending', details: 'Confirm 60 items' }
          ]
        },
        { stage: 'Packaging', time: 'Pending', status: 'pending', location: 'Packing Area' },
        { stage: 'Ready for Delivery', time: 'Pending', status: 'pending', location: 'Dispatch Section' },
        { stage: 'Out for Delivery', time: 'Pending', status: 'pending', location: 'En route' },
        { stage: 'Delivered', time: 'Pending', status: 'pending', location: 'Customer Address - Kondapur' }
      ]
    }
  ];

  const getStatusColor = (stage) => {
    const statusColors = {
      'Order Created': 'blue',
      'Picked Up from Store': 'cyan',
      'In Transit to Factory': 'orange',
      'Arrived at Factory': 'purple',
      'Processing': 'geekblue',
      'Quality Check': 'gold',
      'Ready for Delivery': 'lime',
      'Out for Delivery': 'orange',
      'Delivered': 'green'
    };
    return statusColors[stage] || 'default';
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return '#ff4d4f';
    if (progress < 60) return '#faad14';
    if (progress < 90) return '#1890ff';
    return '#52c41a';
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchText.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.currentStage === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <strong>{text}</strong>
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div>{text}</div>
            <small style={{ color: '#888' }}>{record.customerPhone}</small>
          </div>
        </Space>
      )
    },
    {
      title: 'Outlet',
      dataIndex: 'outlet',
      key: 'outlet',
      render: (text, record) => (
        <Space>
          <ShopOutlined />
          <div>
            <div>{text}</div>
            <small style={{ color: '#888' }}>{record.outletLocation.address}</small>
          </div>
        </Space>
      )
    },
    {
      title: 'Items',
      dataIndex: 'itemCount',
      key: 'itemCount',
      render: (count) => <Badge count={count} showZero style={{ backgroundColor: '#52c41a' }} />
    },
    {
      title: 'Current Stage',
      dataIndex: 'currentStage',
      key: 'currentStage',
      render: (stage) => <Tag color={getStatusColor(stage)}>{stage}</Tag>
    },
    {
      title: 'Progress',
      dataIndex: 'stageProgress',
      key: 'stageProgress',
      render: (progress) => (
        <Progress 
          percent={progress} 
          size="small" 
          strokeColor={getProgressColor(progress)}
        />
      )
    },
    {
      title: 'Delivery Person',
      key: 'deliveryPerson',
      render: (_, record) => (
        <Space>
          <Avatar icon={<CarOutlined />} style={{ backgroundColor: '#1890ff' }} />
          <div>
            <div>{record.deliveryPerson.name}</div>
            <small style={{ color: '#888' }}>{record.deliveryPerson.vehicle}</small>
          </div>
        </Space>
      )
    },
    {
      title: 'Expected Delivery',
      dataIndex: 'expectedDelivery',
      key: 'expectedDelivery',
      render: (date) => (
        <Space>
          <ClockCircleOutlined />
          {date}
        </Space>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedOrder(record);
            setDetailsVisible(true);
          }}
        >
          Track
        </Button>
      )
    }
  ];

  // Summary statistics
  const totalOrders = orders.length;
  const inTransit = orders.filter(o => o.currentStage.includes('Transit') || o.currentStage.includes('Delivery')).length;
  const processing = orders.filter(o => o.currentStage.includes('Processing') || o.currentStage.includes('Quality')).length;
  const delivered = orders.filter(o => o.currentStage === 'Delivered').length;

  return (
    <MainLayout>
      <div style={{ padding: '24px' }}>
        <h1>Order Tracking Dashboard</h1>
        <p style={{ color: '#888', marginBottom: '24px' }}>Track all orders in real-time with delivery personnel location</p>

        {/* Statistics */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Orders"
                value={totalOrders}
                prefix={<ShopOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="In Transit"
                value={inTransit}
                prefix={<CarOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Processing"
                value={processing}
                prefix={<BuildOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Delivered"
                value={delivered}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card style={{ marginBottom: '24px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={12} lg={8}>
              <Search
                placeholder="Search by Order ID or Customer"
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Select
                style={{ width: '100%' }}
                placeholder="Filter by Status"
                value={filterStatus}
                onChange={setFilterStatus}
              >
                <Option value="all">All Orders</Option>
                <Option value="In Transit to Factory">In Transit to Factory</Option>
                <Option value="Processing">Processing</Option>
                <Option value="Quality Check">Quality Check</Option>
                <Option value="Out for Delivery">Out for Delivery</Option>
                <Option value="Delivered">Delivered</Option>
              </Select>
            </Col>
          </Row>
        </Card>

        {/* Orders Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={filteredOrders}
            rowKey="id"
            scroll={{ x: 1200 }}
            pagination={{ pageSize: 10 }}
          />
        </Card>

        {/* Order Details Modal */}
        <Modal
          title={`Order Details - ${selectedOrder?.id}`}
          open={detailsVisible}
          onCancel={() => setDetailsVisible(false)}
          footer={null}
          width={900}
        >
          {selectedOrder && (
            <>
              {/* Order Information */}
              <Card title="Order Information" size="small" style={{ marginBottom: '16px' }}>
                <Descriptions column={2} bordered size="small">
                  <Descriptions.Item label="Order ID">{selectedOrder.id}</Descriptions.Item>
                  <Descriptions.Item label="Order Date">{selectedOrder.orderDate}</Descriptions.Item>
                  <Descriptions.Item label="Customer">{selectedOrder.customerName}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{selectedOrder.customerPhone}</Descriptions.Item>
                  <Descriptions.Item label="Outlet">{selectedOrder.outlet}</Descriptions.Item>
                  <Descriptions.Item label="Factory">{selectedOrder.factory}</Descriptions.Item>
                  <Descriptions.Item label="Total Items">{selectedOrder.itemCount} items</Descriptions.Item>
                  <Descriptions.Item label="Expected Delivery">{selectedOrder.expectedDelivery}</Descriptions.Item>
                  <Descriptions.Item label="Services" span={2}>
                    <Space>
                      {selectedOrder.services.map((service, idx) => (
                        <Tag key={idx} color="blue">{service}</Tag>
                      ))}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Current Stage" span={2}>
                    <Tag color={getStatusColor(selectedOrder.currentStage)} style={{ fontSize: '14px' }}>
                      {selectedOrder.currentStage}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              {/* Service Breakdown */}
              <Card title="Service-wise Progress" size="small" style={{ marginBottom: '16px' }}>
                <Row gutter={[16, 16]}>
                  {Object.keys(selectedOrder.serviceBreakdown).map((serviceKey) => {
                    const service = selectedOrder.serviceBreakdown[serviceKey];
                    if (service.status === 'not_applicable') return null;
                    
                    const statusColor = service.status === 'completed' ? 'success' : 
                                      service.status === 'active' ? 'processing' : 'default';
                    const statusIcon = service.status === 'completed' ? <CheckCircleOutlined /> : 
                                      service.status === 'active' ? <ClockCircleOutlined spin /> : 
                                      <ClockCircleOutlined />;
                    
                    return (
                      <Col span={12} key={serviceKey}>
                        <Card size="small" style={{ background: '#fafafa' }}>
                          <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Text strong>{serviceKey.replace(/([A-Z])/g, ' $1').trim()}</Text>
                              <Badge status={statusColor} text={service.status.toUpperCase()} />
                            </div>
                            <div>
                              <Text type="secondary">Items: </Text>
                              <Text strong>{service.items}</Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {statusIcon}
                              <Text style={{ fontSize: '12px' }}>{service.stage}</Text>
                            </div>
                          </Space>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Card>

              {/* Delivery Person Information */}
              <Card title="Delivery Personnel" size="small" style={{ marginBottom: '16px' }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Space direction="vertical">
                      <Space>
                        <UserOutlined />
                        <strong>Name:</strong> {selectedOrder.deliveryPerson.name}
                      </Space>
                      <Space>
                        <PhoneOutlined />
                        <strong>Phone:</strong> {selectedOrder.deliveryPerson.phone}
                      </Space>
                      <Space>
                        <CarOutlined />
                        <strong>Vehicle:</strong> {selectedOrder.deliveryPerson.vehicle}
                      </Space>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space direction="vertical">
                      <Space>
                        <EnvironmentOutlined style={{ color: '#1890ff' }} />
                        <strong>Current Location:</strong>
                      </Space>
                      <div style={{ paddingLeft: '24px', color: '#666' }}>
                        {selectedOrder.deliveryPerson.currentLocation.address}
                      </div>
                      <div style={{ paddingLeft: '24px', fontSize: '12px', color: '#999' }}>
                        Lat: {selectedOrder.deliveryPerson.currentLocation.lat}, 
                        Lng: {selectedOrder.deliveryPerson.currentLocation.lng}
                      </div>
                    </Space>
                  </Col>
                </Row>
              </Card>

              {/* Progress */}
              <Card title="Overall Progress" size="small" style={{ marginBottom: '16px' }}>
                <Progress 
                  percent={selectedOrder.stageProgress} 
                  strokeColor={getProgressColor(selectedOrder.stageProgress)}
                  status="active"
                />
              </Card>

              {/* Timeline */}
              <Card title="Detailed Order Timeline" size="small">
                <Timeline>
                  {selectedOrder.timeline.map((item, index) => {
                    let color = 'gray';
                    let icon = <ClockCircleOutlined />;
                    
                    if (item.status === 'completed') {
                      color = 'green';
                      icon = <CheckCircleOutlined />;
                    } else if (item.status === 'active') {
                      color = 'blue';
                      icon = <ClockCircleOutlined spin />;
                    }

                    return (
                      <Timeline.Item key={index} color={color} dot={icon}>
                        <div>
                          <strong style={{ fontSize: '14px' }}>{item.stage}</strong>
                          <div style={{ color: '#888', fontSize: '12px', marginTop: '4px' }}>
                            <Space>
                              <ClockCircleOutlined />
                              {item.time}
                            </Space>
                          </div>
                          <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>
                            <Space>
                              <EnvironmentOutlined />
                              {item.location}
                            </Space>
                          </div>
                          {item.person && (
                            <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>
                              <Space>
                                <UserOutlined />
                                {item.person}
                              </Space>
                            </div>
                          )}
                          {item.details && (
                            <div style={{ color: '#999', fontSize: '11px', marginTop: '4px', fontStyle: 'italic' }}>
                              {item.details}
                            </div>
                          )}
                          
                          {/* Substages */}
                          {item.substages && item.substages.length > 0 && (
                            <div style={{ marginTop: '12px', marginLeft: '20px', padding: '12px', background: '#f5f5f5', borderRadius: '4px' }}>
                              <Text type="secondary" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                                Detailed Steps:
                              </Text>
                              <Timeline style={{ marginTop: '8px' }}>
                                {item.substages.map((substage, subIndex) => {
                                  let subColor = 'gray';
                                  let subIcon = <ClockCircleOutlined />;
                                  
                                  if (substage.status === 'completed') {
                                    subColor = 'green';
                                    subIcon = <CheckCircleOutlined style={{ fontSize: '10px' }} />;
                                  } else if (substage.status === 'active') {
                                    subColor = 'blue';
                                    subIcon = <ClockCircleOutlined spin style={{ fontSize: '10px' }} />;
                                  }
                                  
                                  return (
                                    <Timeline.Item 
                                      key={subIndex} 
                                      color={subColor} 
                                      dot={subIcon}
                                      style={{ paddingBottom: '8px' }}
                                    >
                                      <div style={{ fontSize: '12px' }}>
                                        <strong>{substage.name}</strong>
                                        <div style={{ color: '#888', fontSize: '11px', marginTop: '2px' }}>
                                          <ClockCircleOutlined style={{ fontSize: '10px' }} /> {substage.time}
                                        </div>
                                        <div style={{ color: '#666', fontSize: '11px', marginTop: '2px' }}>
                                          {substage.details}
                                        </div>
                                      </div>
                                    </Timeline.Item>
                                  );
                                })}
                              </Timeline>
                            </div>
                          )}
                        </div>
                      </Timeline.Item>
                    );
                  })}
                </Timeline>
              </Card>
            </>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};

export default AdminOrderTracking;
