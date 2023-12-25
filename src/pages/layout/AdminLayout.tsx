import React, { useState, } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  UnorderedListOutlined,
  DeleteOutlined,
  FileImageOutlined,
  CommentOutlined,
  ControlOutlined,
  BookOutlined,
  MailOutlined,
  HomeOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import UserInformation from './Users/UserInformation/user';
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/admin">Dashboard</Link>, '1', <PieChartOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem(<Link to="/admin/user">List</Link>, '3',),
    getItem(<Link to="/admin/user/add">Add</Link>, '4'),
  ]),
  getItem(<Link to="/admin/product">Product</Link>, '10', <UnorderedListOutlined />,
    [
      getItem(<Link to="/admin/product">List</Link>, '11',),
      getItem(<Link to="/admin/product/add">Add</Link>, '12'),
      getItem(<Link to="/admin/product/recycle"><DeleteOutlined /></Link>, '13'),

    ]),
  getItem(<Link to="/admin/size">Size</Link>, '14', <ControlOutlined />,
    [
      getItem(<Link to="/admin/size">List</Link>, '15',),
      getItem(<Link to="/admin/size/add">Add</Link>, '16'),

    ]),
  getItem(<Link to="/admin/tintuc">Tin tức</Link>, '25', <DesktopOutlined />,
    [
      getItem(<Link to="/admin/tintuc/add">Thêm tin tức</Link>, '27'),
    ]),
  getItem(<Link to="/admin/comments">Comment</Link>, '28', <CommentOutlined />,
  ),
  getItem('Danh mục', 'sub20', <UnorderedListOutlined />, [
    getItem(<Link to="/admin/category">List</Link>, '37',),
    getItem(<Link to="/admin/category/add">Add</Link>, '4'),
  ]),
  getItem('Thông tin', 'sub21', <BookOutlined />, [
    getItem(<Link to="/admin/information">List</Link>, '38',),
    getItem(<Link to="/admin/information/add">Add</Link>, '40'),
  ]),
  getItem('Liên hệ', 'sub22', <MailOutlined />, [
    getItem(<Link to="/admin/contact">List</Link>, '39',),
  ]),
  getItem('Role', 'sub4', <UnorderedListOutlined />, [
    getItem(<Link to="/admin/role">List</Link>, '34',),
    getItem(<Link to="/admin/role/add">Add</Link>, '35'),
  ]),
  getItem('Color', 'sub5', <UnorderedListOutlined />, [
    getItem(<Link to="/admin/color">List</Link>, '36',),
    getItem(<Link to="/admin/color/add">Add</Link>, '37'),
  ]),
  getItem(<Link to="/admin/sale">Sale</Link>, '38', <TeamOutlined />,),
  getItem(<Link to="/">Trang chủ</Link>, '50', <HomeOutlined />,),
];

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Implement your search functionality here
    console.log(`Searching for "${searchTerm}"`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <header className="bg-gray-50">
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex items-center sm:justify-between sm:gap-4">
              <div className="relative hidden sm:block">
                <label className="sr-only" form="search"> Search </label>

                <input
                  className="h-10 w-full rounded-lg border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
                  id="search"
                  type="search"
                  placeholder="Search website..."
                  value={searchTerm}
                  onChange={handleInputChange}
                />

                <button
                  type="button"
                  className="absolute end-1 top-1/2 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                  onClick={handleSearch}
                >
                  <span className="sr-only">Search</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              <div
                className="flex flex-1 items-center justify-between gap-8 sm:justify-end"
              >
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700 sm:hidden"
                  >
                    <span className="sr-only">Search</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>

                  <a
                    href="#"
                    className="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
                  >
                    <span className="sr-only">Academy</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </a>

                  <a
                    href="#"
                    className="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
                  >
                    <span className="sr-only">Notifications</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </a>
                </div>
                <UserInformation />
              </div>
            </div>
          </div>
        </header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;