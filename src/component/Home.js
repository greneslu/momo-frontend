import React from 'react';
import Layout from './Layout';
import Recommendation from './Recommendation';
import Carousel from './Carousel';
import { test } from '../Test'
const Home = () => {

    return (<>
        <Layout>
            {/* <Search /> */}
            <Carousel />
            <Recommendation />
            <button onClick={test} >測試產品輸入</button>
            {/* <Sidebar /> */}
            {/* <ProductsTest /> */}
            {/* <Advertisment /> */}
        </Layout>
    </>
    )
}

export default Home;