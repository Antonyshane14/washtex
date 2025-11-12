import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown, Space, Typography, Badge } from 'antd';
import {
  DashboardOutlined,
  ShopOutlined,
  UserOutlined,
  SwapOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  FileTextOutlined,
  QrcodeOutlined,
  TeamOutlined,
  ShoppingOutlined,
  DollarOutlined,
  BuildOutlined,
  InboxOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const getMenuItems = () => {
    const role = user?.role;

    if (role === 'admin') {
      return [
        {
          key: '/admin',
          icon: <DashboardOutlined />,
          label: 'Dashboard',
        },
        {
          key: '/admin/stores',
          icon: <ShopOutlined />,
          label: 'Stores',
        },
        {
          key: '/admin/factories',
          icon: <BuildOutlined />,
          label: 'Factories',
        },
        {
          key: '/admin/customers',
          icon: <TeamOutlined />,
          label: 'Customers',
        },
        {
          key: '/admin/transfers',
          icon: <SwapOutlined />,
          label: 'Transfers',
        },
        {
          key: '/admin/tracking',
          icon: <QrcodeOutlined />,
          label: 'Order Tracking',
        },
        {
          key: '/reports',
          icon: <FileTextOutlined />,
          label: 'Reports',
        },
        {
          key: '/settings',
          icon: <SettingOutlined />,
          label: 'Settings',
        },
      ];
    }

    if (role === 'store_manager' || role === 'store_staff') {
      return [
        {
          key: '/store',
          icon: <DashboardOutlined />,
          label: 'Dashboard',
        },
        {
          key: '/store/customers',
          icon: <UserOutlined />,
          label: 'Customers',
        },
        {
          key: '/store/orders',
          icon: <ShoppingOutlined />,
          label: 'Orders',
        },
        {
          key: '/store/billing',
          icon: <DollarOutlined />,
          label: 'Billing',
        },
        {
          key: '/tracking',
          icon: <QrcodeOutlined />,
          label: 'Tracking',
        },
        {
          key: '/reports',
          icon: <FileTextOutlined />,
          label: 'Reports',
        },
      ];
    }

    if (role === 'factory_manager' || role === 'factory_staff') {
      return [
        {
          key: '/factory',
          icon: <DashboardOutlined />,
          label: 'Dashboard',
        },
        {
          key: '/factory/reception',
          icon: <InboxOutlined />,
          label: 'Reception',
        },
        {
          key: '/factory/processing',
          icon: <SwapOutlined />,
          label: 'Processing',
        },
        {
          key: '/factory/quality',
          icon: <CheckCircleOutlined />,
          label: 'Quality Control',
        },
        {
          key: '/tracking',
          icon: <QrcodeOutlined />,
          label: 'Tracking',
        },
        {
          key: '/reports',
          icon: <FileTextOutlined />,
          label: 'Reports',
        },
      ];
    }

    if (role === 'accountant') {
      return [
        {
          key: '/accountant',
          icon: <DashboardOutlined />,
          label: 'Dashboard',
        },
        {
          key: '/accountant/billing',
          icon: <DollarOutlined />,
          label: 'Billing',
        },
        {
          key: '/accountant/membership',
          icon: <TeamOutlined />,
          label: 'Membership',
        },
        {
          key: '/reports',
          icon: <FileTextOutlined />,
          label: 'Reports',
        },
      ];
    }

    return [
      {
        key: '/tracking',
        icon: <QrcodeOutlined />,
        label: 'Tracking',
      },
    ];
  };

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo">
          {collapsed ? 'WT' : 'WashTex'}
        </div>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={getMenuItems()}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
        <Header
          style={{
            padding: '0 24px',
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <div>
            <Text strong style={{ fontSize: '16px' }}>
              {user?.role.replace('_', ' ').toUpperCase()}
            </Text>
          </div>
          <Space size="large">
            <Badge count={5}>
              <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
            </Badge>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                <Text>{user?.name}</Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ margin: '24px', minHeight: 'calc(100vh - 112px)' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
