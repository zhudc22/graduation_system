import React, {ReactNode} from 'react';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {BookOutlined, LogoutOutlined, ProfileOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
import {useRouter} from 'next/router';
import Cookies from 'js-cookie';

interface LayoutProps {
    children: ReactNode;
}
const { Header, Content } = Layout;

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const nav = useRouter();

    const handleMenuClick = ({ key }: any) => {
        if (key === 'logout') {
            // 执行注销操作，清除 token，跳转到登录页面等
            localStorage.removeItem('token');
            Cookies.remove('token', { path: '/' });

            nav.push('/login');
        } else if (key === '/profile') {
            // 处理导航到用户信息页面
            nav.push(key);
        } else {
            nav.push(key);
        }
    };

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['/home/topic-management']}
                    onClick={({ key }) => {
                        nav.push(key);
                    }}
                    items={[
                        {
                            key: '/home/topic-management',
                            label: '课题管理',
                            icon: <BookOutlined />,
                        },
                        {
                            key: '/home/defence-list',
                            label: '答辩列表',
                            icon: <ProfileOutlined />,
                        },
                        {
                            key: '/home/teacher-student-list',
                            label: '学生列表-教师列表',
                            icon: <TeamOutlined />,
                        },
                    ]}
                    style={{ flex: 1, minWidth: 0 }}
                />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    onClick={handleMenuClick}
                    style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
                >
                    <Menu.SubMenu
                        key="user"
                        icon={<UserOutlined />}
                        title="用户"
                    >
                        <Menu.Item key="/profile" icon={<ProfileOutlined />}>
                            用户信息
                        </Menu.Item>
                        <Menu.Item key="logout" icon={<LogoutOutlined />}>
                            注销
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>一级菜单</Breadcrumb.Item>
                    <Breadcrumb.Item>二级菜单</Breadcrumb.Item>
                    <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </div>
            </Content>
        </Layout>
    );
};

export default AppLayout;
