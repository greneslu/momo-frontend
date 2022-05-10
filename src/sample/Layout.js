import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';

const Layout = ({ title = "", description = "", className, children }) => (
    <div>
        <Header />
        <div className={className}>{children}</div>
        <Footer />
    </div>
)

export default Layout;