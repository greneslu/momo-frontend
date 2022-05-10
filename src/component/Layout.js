import React from 'react';
import Header from './Header'
import Footer from './Footer'

const Layout = ({ className, children }) => (
    <div style={{
        backgroundImage: `url("https://png.pngtree.com/back_origin_pic/05/14/94/2e1139be16239b483874dec1a4bebb6b.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
    }}>
        <Header />
        <div className={className} >{children}</div>
        <Footer />
    </div>
)

export default Layout;