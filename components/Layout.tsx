import React, {ReactNode, useEffect, useState} from 'react';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {BookOutlined, LogoutOutlined, ProfileOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
import {useRouter} from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

interface LayoutProps {
    children: ReactNode;
}


interface MenuItem {
    key: string;
    label: string;
    icon: ReactNode;
}


const {Header, Content} = Layout;

const AppLayout: React.FC<LayoutProps> = ({children}) => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const nav = useRouter();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const handleMenuClick = ({key}: { key: string }) => {
        if (key === 'logout') {
            // 执行注销操作，清除 token，跳转到登录页面等
            localStorage.removeItem('token');
            Cookies.remove('token', {path: '/'});
            nav.push('/login');
        } else {
            nav.push(key);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwt.decode(token) as unknown;
                const {groupCodes} = decoded as { groupCodes: number[] };

                let items: MenuItem[] = [];

                if (groupCodes.includes(2)) {
                    items = [
                        {
                            key: '/admin/topic-management',
                            label: '课题管理',
                            icon: <BookOutlined/>,
                        },
                        {
                            key: '/admin/defence-list',
                            label: '答辩列表',
                            icon: <ProfileOutlined/>,
                        },
                        {
                            key: '/admin/teacher-student-list',
                            label: '学生列表-教师列表',
                            icon: <TeamOutlined/>,
                        },
                    ];
                } else if (groupCodes.includes(1)) {
                    items = [
                        {
                            key: '/teacher/topic-management',
                            label: '课题管理',
                            icon: <BookOutlined/>,
                        },
                        {
                            key: '/teacher/defence-list',
                            label: '答辩列表',
                            icon: <ProfileOutlined/>,
                        },
                        {
                            key: '/teacher/teacher-student-list',
                            label: '学生列表-教师列表',
                            icon: <TeamOutlined/>,
                        },
                    ];
                } else if (groupCodes.includes(0)) {
                    items = [
                        {
                            key: '/student/topic-management',
                            label: '课题管理',
                            icon: <BookOutlined/>,
                        },
                        {
                            key: '/student/defence-list',
                            label: '答辩列表',
                            icon: <ProfileOutlined/>,
                        },
                        {
                            key: '/student/teacher-student-list',
                            label: '学生列表-教师列表',
                            icon: <TeamOutlined/>,
                        },
                    ];
                }

                setMenuItems(items);
            } catch (error) {
                console.error('Failed to decode JWT:', error);
            }
        }
    }, []);

    return (
        <Layout className="min-h-screen">
            <Header className="fixed flex items-center justify-between w-full">
                <div className="flex-1">
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['/admin/topic-management']}
                        onClick={handleMenuClick}
                        items={menuItems}
                        className="flex-1"
                    />
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    onClick={handleMenuClick}
                    className="flex items-center flex-grow justify-end"
                >
                    <Menu.SubMenu key="user" icon={<UserOutlined/>} title="用户">
                        <Menu.Item key="/profile" icon={<ProfileOutlined/>}>
                            用户信息
                        </Menu.Item>
                        <Menu.Item key="logout" icon={<LogoutOutlined/>}>
                            注销
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Header>
            <Content className=" container mx-auto pt-16  ">
                <Breadcrumb className="my-4">
                    <Breadcrumb.Item>一级菜单</Breadcrumb.Item>
                    <Breadcrumb.Item>二级菜单</Breadcrumb.Item>
                    <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    className="rounded-lg p-6 shadow-md"
                    style={{
                        background: colorBgContainer,
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
