import React, {ReactNode} from 'react';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {BookOutlined, LogoutOutlined, ProfileOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
import {useRouter} from 'next/router';
import Cookies from 'js-cookie';

interface LayoutProps {
    children: ReactNode;
}

const {Header, Content} = Layout;

const AppLayout: React.FC<LayoutProps> = ({children}) => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const nav = useRouter();

    const handleMenuClick = ({key}: any) => {
        if (key === 'logout') {
            // 执行注销操作，清除 token，跳转到登录页面等
            localStorage.removeItem('token');
            Cookies.remove('token', {path: '/'});

            nav.push('/login');
        } else {
            nav.push(key);
        }
    };

    return (
        <Layout className="min-h-screen">
            <Header className="fixed flex items-center justify-between w-full">
                <div className='flex-1'>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['/admin/topic-management']}
                        onClick={({key}) => {
                            nav.push(key);
                        }}
                        items={[
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
                        ]}
                        className="flex-1"
                    />
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    onClick={handleMenuClick}
                    className="flex items-center flex-grow justify-end"
                >
                    <Menu.SubMenu
                        key="user"
                        icon={<UserOutlined/>}
                        title="用户"
                    >
                        <Menu.Item key="/profile" icon={<ProfileOutlined/>}>
                            用户信息
                        </Menu.Item>
                        <Menu.Item key="logout" icon={<LogoutOutlined/>}>
                            注销
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Header>
            <Content className="pt-16 px-12">
                <Breadcrumb className="my-4">
                    <Breadcrumb.Item>一级菜单</Breadcrumb.Item>
                    <Breadcrumb.Item>二级菜单</Breadcrumb.Item>
                    <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    className=" rounded-lg p-6 shadow-md"
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
