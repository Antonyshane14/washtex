// Mock data for the demo application

export const mockStores = [
  {
    id: 'ST001',
    name: 'Downtown Store',
    location: 'Downtown, City Center',
    manager: 'John Doe',
    phone: '+91 98765 43210',
    status: 'active',
    todayOrders: 45,
    pendingOrders: 12,
    revenue: 15000,
    staff: 5,
  },
  {
    id: 'ST002',
    name: 'North Plaza Store',
    location: 'North Plaza, Sector 18',
    manager: 'Jane Smith',
    phone: '+91 98765 43211',
    status: 'active',
    todayOrders: 38,
    pendingOrders: 8,
    revenue: 12500,
    staff: 4,
  },
  {
    id: 'ST003',
    name: 'Mall Road Store',
    location: 'Mall Road, Shopping District',
    manager: 'Mike Johnson',
    phone: '+91 98765 43212',
    status: 'active',
    todayOrders: 52,
    pendingOrders: 15,
    revenue: 18000,
    staff: 6,
  },
];

export const mockCustomers = [
  {
    id: 'CUST001',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul@example.com',
    membershipType: 'Gold',
    membershipBalance: 15,
    totalBalance: 20,
    address: '123, MG Road, Bangalore',
    joinDate: '2024-01-15',
    totalOrders: 45,
    outstandingAmount: 0,
  },
  {
    id: 'CUST002',
    name: 'Priya Patel',
    phone: '+91 98765 43220',
    email: 'priya@example.com',
    membershipType: 'Silver',
    membershipBalance: 8,
    totalBalance: 15,
    address: '456, Brigade Road, Bangalore',
    joinDate: '2024-02-20',
    totalOrders: 32,
    outstandingAmount: 500,
  },
];

export const mockOrders = [
  {
    id: 'ORD001',
    customerId: 'CUST001',
    customerName: 'Rahul Sharma',
    storeId: 'ST001',
    items: [
      { id: 'ITEM001', type: 'Shirt', service: 'Wash & Iron', quantity: 3, price: 150 },
      { id: 'ITEM002', type: 'Trouser', service: 'Dry Clean', quantity: 2, price: 200 },
    ],
    totalAmount: 550,
    paidAmount: 550,
    status: 'processing',
    urgency: 'regular',
    createdAt: '2024-11-10T10:30:00',
    expectedDelivery: '2024-11-13T18:00:00',
    currentStage: 'Washing',
  },
  {
    id: 'ORD002',
    customerId: 'CUST002',
    customerName: 'Priya Patel',
    storeId: 'ST001',
    items: [
      { id: 'ITEM003', type: 'Saree', service: 'Dry Clean', quantity: 2, price: 400 },
      { id: 'ITEM004', type: 'Shirt', service: 'Iron Only', quantity: 5, price: 125 },
    ],
    totalAmount: 625,
    paidAmount: 0,
    status: 'pending',
    urgency: 'express',
    createdAt: '2024-11-11T14:20:00',
    expectedDelivery: '2024-11-12T18:00:00',
    currentStage: 'Sorting',
  },
];

export const mockFactories = [
  {
    id: 'FAC001',
    name: 'Central Processing Factory',
    location: 'Industrial Area, Phase 1',
    manager: 'David Wilson',
    capacity: 1000,
    currentLoad: 750,
    workers: 25,
    status: 'operational',
    todayProcessed: 450,
    pendingItems: 300,
  },
];

export const mockProcessingStages = [
  { key: 'received', label: 'Received', color: '#108ee9' },
  { key: 'sorted', label: 'Sorted', color: '#2db7f5' },
  { key: 'pretreated', label: 'Pre-treated', color: '#87d068' },
  { key: 'washed', label: 'Washed', color: '#52c41a' },
  { key: 'dried', label: 'Dried', color: '#fa8c16' },
  { key: 'ironed', label: 'Ironed', color: '#eb2f96' },
  { key: 'qc', label: 'Quality Check', color: '#722ed1' },
  { key: 'packed', label: 'Packed', color: '#13c2c2' },
];

export const mockServiceTypes = [
  { id: 'SRV001', name: 'Wash & Iron', category: 'Regular', price: 50, expressPrice: 75 },
  { id: 'SRV002', name: 'Dry Clean', category: 'Premium', price: 100, expressPrice: 150 },
  { id: 'SRV003', name: 'Iron Only', category: 'Regular', price: 25, expressPrice: 40 },
  { id: 'SRV004', name: 'Stain Removal', category: 'Special', price: 150, expressPrice: 200 },
  { id: 'SRV005', name: 'Steam Press', category: 'Premium', price: 80, expressPrice: 120 },
];

export const mockItemCategories = [
  'Shirt',
  'Trouser',
  'Saree',
  'Kurta',
  'Jeans',
  'T-Shirt',
  'Dress',
  'Suit',
  'Blazer',
  'Bedsheet',
  'Curtain',
  'Blanket',
];

export const mockMembershipPlans = [
  {
    id: 'MEM001',
    name: 'Bronze Plan',
    items: 10,
    price: 800,
    validityDays: 30,
    discount: 5,
  },
  {
    id: 'MEM002',
    name: 'Silver Plan',
    items: 20,
    price: 1500,
    validityDays: 60,
    discount: 10,
  },
  {
    id: 'MEM003',
    name: 'Gold Plan',
    items: 30,
    price: 2000,
    validityDays: 90,
    discount: 15,
  },
  {
    id: 'MEM004',
    name: 'Platinum Plan',
    items: 50,
    price: 3000,
    validityDays: 180,
    discount: 20,
  },
];

export const mockRevenueData = [
  { date: '2024-11-01', revenue: 15000, orders: 45 },
  { date: '2024-11-02', revenue: 18000, orders: 52 },
  { date: '2024-11-03', revenue: 16500, orders: 48 },
  { date: '2024-11-04', revenue: 20000, orders: 58 },
  { date: '2024-11-05', revenue: 17500, orders: 50 },
  { date: '2024-11-06', revenue: 22000, orders: 65 },
  { date: '2024-11-07', revenue: 19000, orders: 55 },
];

export const mockTransfers = [
  {
    id: 'TRF001',
    from: 'ST001',
    to: 'FAC001',
    items: 45,
    status: 'in_transit',
    vehicle: 'KA-01-AB-1234',
    driver: 'Ravi Kumar',
    departureTime: '2024-11-12T08:00:00',
    expectedArrival: '2024-11-12T10:00:00',
  },
  {
    id: 'TRF002',
    from: 'FAC001',
    to: 'ST002',
    items: 38,
    status: 'delivered',
    vehicle: 'KA-01-CD-5678',
    driver: 'Suresh Reddy',
    departureTime: '2024-11-11T14:00:00',
    expectedArrival: '2024-11-11T16:00:00',
    actualArrival: '2024-11-11T15:45:00',
  },
];

export const mockDamageReports = [
  {
    id: 'DMG001',
    orderId: 'ORD001',
    itemId: 'ITEM001',
    customerId: 'CUST001',
    customerName: 'Rahul Sharma',
    damageType: 'Color Fade',
    description: 'Slight color fading observed after wash',
    reportedBy: 'Factory QC Team',
    reportedAt: '2024-11-11T15:30:00',
    status: 'pending',
    compensationAmount: 300,
    images: [],
  },
];

export const mockNotifications = [
  {
    id: 'NOT001',
    type: 'sla_breach',
    title: 'SLA Breach Alert',
    message: 'Order ORD002 is exceeding expected delivery time',
    priority: 'high',
    createdAt: '2024-11-12T09:00:00',
    read: false,
  },
  {
    id: 'NOT002',
    type: 'damage',
    title: 'Damage Reported',
    message: 'Damage reported for Order ORD001 - Item ITEM001',
    priority: 'medium',
    createdAt: '2024-11-11T15:30:00',
    read: false,
  },
];

export const userRoles = [
  { value: 'admin', label: 'Admin' },
  { value: 'store_manager', label: 'Store Manager' },
  { value: 'store_staff', label: 'Store Staff' },
  { value: 'factory_manager', label: 'Factory Manager' },
  { value: 'factory_staff', label: 'Factory Staff' },
  { value: 'delivery_personnel', label: 'Delivery Personnel' },
  { value: 'accountant', label: 'Accountant' },
  { value: 'customer', label: 'Customer' },
];

export const generateQRCode = (storeId, orderId, itemId, serviceCode) => {
  return `${storeId}-${orderId}-${itemId}-${serviceCode}`;
};
