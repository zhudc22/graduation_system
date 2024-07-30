// pages/index.js
import React from 'react';

export default function Home() {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    return {
        redirect: {
            destination: '/login', // 目标路由
            permanent: true,        // 指明这不是一个永久重定向
        }
    };
}
