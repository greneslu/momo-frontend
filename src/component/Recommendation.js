import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import AddProduct from './AddProduct';
import ProductCard from './ProductCard';
import { getProducts } from "../product";

const Element = ({ className }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
            .then(data => {
                if (data) {
                    setProducts(data.slice(0, 20))
                }
            })
    }, [])
    return (
        <div className={className}>
            <div className="prod-content">

                {/* <nav className="breadcrumb">
                    <a className="breadcrumb-item" href="#">首頁</a>
                    <a className="breadcrumb-item" href="#">首頁下一頁</a>
                    <a className="breadcrumb-item active" href="#">當前頁</a>
                </nav> */}

                <div className="mt-5">
                    <h5>人氣商品推薦</h5>
                    <div className="dropdown">
                        {/* <button className="btn btn-secondary dropdown-toggle dropdown-btn btn-sm" type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            商品價格
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#">高到低</a></li>
                            <li><a className="dropdown-item" href="#">低到高</a></li>
                        </ul> */}
                    </div>
                    <div className="dropdown">
                        {/* <button className="btn btn-secondary dropdown-toggle dropdown-btn btn-sm" type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            上架日期
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#">新到舊</a></li>
                            <li><a className="dropdown-item" href="#">舊到新</a></li>
                        </ul> */}
                    </div>

                </div>

                <div className="row">
                    {products && products.map(product => (
                        <div className="col-6 col-lg-3 mt-3" style={{ textDecoration: "none", color: "#000" }}>
                            <ProductCard product={product} link={true} favor={true} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
const Recommendation = styled(Element)`
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
`

export default Recommendation;