import React, { useEffect, useState } from 'react';
import styledcomponents from 'styled-components';
import { styled } from '@mui/material/styles';
import { useHistory } from "react-router";
import Pagination from '@mui/material/Pagination';
import Grow from "@mui/material/Grow";
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Layout from './Layout';
import Filter from './Filter';
import { getProducts, searchKeyword } from "../product";
import ProductCard from './ProductCard';


const Element = ({ className, match, location }) => {
    const [products, setProducts] = useState([])
    const [selectPage, setSelectPage] = useState(1)
    const [count, setCount] = useState(0)
    const [filterArr, setFilterArr] = useState([])
    const [open, setOpen] = useState(false);
    // const [pageNum, setPageNum] = useState(0)
    const history = useHistory();

    const categoryId = match.params.categoryId || ""
    const keyword = (location && location.state && location.state.keyword) || "all"
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e, page) => {
        // setSelectPage(page)
        // setProducts(products.slice((page - 1) * 24, 24 * page))
        searchKeyword(keyword)
            .then(data => {
                if (data) {
                    if (categoryId !== "") {
                        setProducts(data.filter(item => item.category === categoryId && item.state === 1).slice((page - 1) * 24, 24 * page))
                        setCount(Math.ceil(data.filter(item => item.category === categoryId && item.state === 1).length / 24))
                    } else {
                        setProducts(data.slice((page - 1) * 24, 24 * page))
                    }
                    window.scrollTo(0, 0);
                }
            })
    }

    useEffect(() => {
        // if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        //     console.info("This page is reloaded");
        //     history.push({
        //         state: {
        //             keyword: "all"
        //         }
        //     })

        // }
        console.log(keyword)
        searchKeyword(keyword)
            .then(data => {
                if (data) {

                    if (categoryId !== "") {
                        setProducts(data.filter(item => item.category === categoryId && item.state === 1).slice((selectPage - 1) * 24, 24 * selectPage))
                        setCount(Math.ceil(data.filter(item => item.category === categoryId && item.state === 1).length / 24))
                    } else {
                        setProducts(data.slice((selectPage - 1) * 24, 24 * selectPage))

                    }
                    setOpen(false)
                }
            })
        // getProducts()
        //     .then(data => {
        //         if (data) {
        //             setProducts(data)
        //         }
        //     })
    }, [keyword])
    return (
        <Layout>
            <div className={className}>
                <div className="prod-content">
                    {/* 
                    <nav className="breadcrumb">
                        <a className="breadcrumb-item" href="#">首頁</a>
                        <a className="breadcrumb-item" href="#">首頁下一頁</a>
                        <a className="breadcrumb-item active" href="#">當前頁</a>
                    </nav> */}
                    {/* <SplitButton /> */}
                    {keyword !== "all" ? <h5>關鍵字："{keyword}"</h5> : null}
                    <div className="dropdown-box">
                        {/* <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle dropdown-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                上架日期
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="#">新到舊</a></li>
                                <li><a className="dropdown-item" href="#">舊到新</a></li>
                            </ul>
                        </div>
                        <button className="btn btn-secondary dropdown-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            熱門商品
                        </button> */}
                    </div>

                    <div className="row">
                        {products && products.map(product => (
                            <div className="col-6 col-lg-3 mt-3">
                                <ProductCard product={product} editable={false} link={true} favor={true} />
                            </div>
                        ))}
                        {/* {products && products.map(item => (
                            <a className="col-6 col-lg-3 mt-3" href={`/product/${item.id}`} style={{ textDecoration: "none", color: "#000" }}>
                                <div className="card">
                                    <img src="https://cf.shopee.tw/file/b5772fc8fe61728bd8afd0b135c54cf3_tn" className="card-img-top card-img-size"
                                        alt="..." />
                                    <div className="card-body" style={{ fontSize: "1.2rem" }}>
                                        <h3 className="card-title">{item.name.slice(0, 10)}</h3>
                                        <p className="card-text">{item.description.slice(0, 10)}</p>
                                        <p className="card-text">${item.price}</p>
                                        <p className="card-text">數量：{item.stock}</p>
                                    </div>
                                </div>
                            </a>
                        ))} */}
                    </div>
                    <br />
                    <br />
                    <Grow in={true}>
                        <Pagination sx={{ justifyContent: "center" }} count={count} showFirstButton showLastButton onChange={handleChange} />
                    </Grow>
                </div>
            </div>
            {/* <Filter categoryId={categoryId} setFilterArr={setFilterArr} /> */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Layout >
    )
}
const Products = styledcomponents(Element)`
.prod-content{
    width: 66.666667%;
    margin: 0 auto;
    margin-top:20px;
}
.card:hover {
  -webkit-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    transform: translateY(-5px);
    -webkit-box-shadow: 0 6px 16px rgba(0,0,0,0.12);
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
}
.card-style{
    height: 350px;
}

.card-content{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.price-div{
    position: absolute;
    bottom:5px;
}
.card-position{
    position: relative;
}
.card-img-size{
    height: 200px;
}
.dropdown-box{
    background-color: rgb(221, 208, 216);
    height: 50px;
    display: flex;
    justify-content: start;
}
.dropdown-btn{
    margin: 5px auto auto 5px;
}
.price-div{
    position: absolute;
    bottom:5px;
    color: black;
}
.a-style{
    text-decoration: none;
}
.css-wjh20t-MuiPagination-ul{
    justify-content: center;
}
`

export default React.memo(Products);