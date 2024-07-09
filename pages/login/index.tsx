import React from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, message} from 'antd';
import {post} from '@/utils/request';
import {useRouter} from 'next/router';
import Cookies from 'js-cookie';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        const formData=new FormData();
        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });
        post('/user/login',formData,'form-data')
            .then((res) => {
                if(res.code === '0') {
                    localStorage.setItem('token', res.data.token)
                    Cookies.set('token', res.data.token, { expires: 7 }); // 设置 Cookie，有效期7天
                    message.success(res.msg)
                    router.push('/')
                } else {
                    message.error(res.msg)
                }
            })
            .catch((err) => {
                message.error(err.message)
            })
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100" style={{backgroundImage: "url('/bg.png')"}}>
            <div className="w-full flex justify-center pt-10">
                <img src="/logo.png" alt="毕设管理系统" />
            </div>
            <div className="flex flex-col items-center justify-center mt-24">
                <div className="p-8 bg-white shadow-lg rounded-lg max-w-sm w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center">毕设管理系统</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="id"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;