// 暂时用不到
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    groupCodes: string[];

    [key: string]: any; // 允许其他属性
}

const withAuth = (WrappedComponent: any, allowedRoles: string[]) => {
    return (props: any) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwt.decode(token) as DecodedToken | null;
                if (decodedToken && decodedToken.groupCodes.some(role => allowedRoles.includes(role))) {
                    setLoading(false);
                } else {
                    router.push('/unauthorized'); // 无权限页面
                }
            } else {
                router.push('/login'); // 未登录重定向到登录页面
            }
        }, [router]);

        if (loading) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
