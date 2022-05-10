import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Pagination from '@mui/material/Pagination';
import Grow from "@mui/material/Grow";
import Tab from '@mui/material/Tab';
import AddProduct from './AddProduct';
import ProductCard from './ProductCard';
import { getProducts } from "../product";
import { isAuthenticated } from "../auth";


const Element = ({ className }) => {
    const [value, setValue] = useState(1);
    const [count, setCount] = useState(0)
    const [selectPage, setSelectPage] = useState(1)
    const [products, setProducts] = useState([])
    const userId = isAuthenticated() && isAuthenticated().id
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handlePageChange = (e, page) => {
        // setSelectPage(page)
        // setProducts(products.slice((page - 1) * 24, 24 * page))
        getProducts()
            .then(data => {
                if (data) {
                    setProducts(data.filter(item => item.userBean.id === userId && item.state === value).slice((page - 1) * 24, 24 * page))
                    window.scrollTo(0, 600);
                }
            })
    }
    // const productsFetch = (obj) => {
    //     // setProducts(arr)
    //     const arr = [...products]
    //     arr.push(obj)

    //     setProducts(arr)
    // }
    const productsFetch = () => {
        getProducts()
            .then(data => {
                if (data) {
                    setProducts(data.filter(item => item.userBean.id === userId).filter(item => item.state === value))
                }
            })
    }
    useEffect(() => {
        setOpen(true)
        getProducts()
            .then(data => {
                if (data) {
                    setProducts(data.filter(item => item.userBean.id === userId && item.state === value).slice((selectPage - 1) * 24, 24 * selectPage))
                    setCount(Math.ceil(data.filter(item => item.userBean.id === userId && item.state === value).length / 24))
                    setOpen(false)
                }
            })
    }, [value])

    return (
        <>
            <div className="title">
                <h5>我的商品</h5>

                {/* <button className="btn create-product">新增商品</button> */}
                <AddProduct productsFetch={productsFetch} products={products} />
            </div>
            <Box sx={{ width: '100%'}}>
                <Tabs value={value} onChange={handleChange} centered TabIndicatorProps={{ style: { background: "#f7bacf" } }}>
                    <Tab label="上架" value={1} />
                    <Tab label="下架" value={0} />
                </Tabs>
            </Box>
            <div className="row">
                {products && products.map(product => (
                    <div className="col-6 col-lg-3 mt-3">
                        <ProductCard product={product} productsFetch={productsFetch} editable={true} link={false} />
                    </div>)
                )}
            </div>
            <br />
            <br />
            <Grow in={true}>
                <Pagination sx={{ justifyContent: "center" }} count={count} showFirstButton showLastButton onChange={handlePageChange} />
            </Grow>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </>
    )
}
const MyProduct = styled(Element)`
`

export default MyProduct
