import '@/styles/globals.css';
import {useRouter} from 'next/router';
import BasicLayout from '@/components/Layout';

function Layout({ Component, pageProps }:any) {
    const router = useRouter();
    const path = router.pathname === '/login'
    if (path) {
        return <Component {...pageProps} />
    } else {
        return(
        <BasicLayout>
            <Component {...pageProps} />
        </BasicLayout>
        )
    }
}

export default Layout;
