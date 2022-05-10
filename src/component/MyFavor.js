import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import ProductCard from './ProductCard';
import { getFavor } from '../favorite';


const Element = ({ className }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(getFavor())
    }, [])

    return (
        <>
            <div className="title">
                <h5>我的收藏</h5>
            </div>
            <div className="row">
                {products && products.map(product => (
                    <div className="col-6 col-lg-3 mt-3">
                        <ProductCard product={product} link={true} favor={true} />
                    </div>)
                )}
            </div>
        </>
    )
}
const MyFavor = styled(Element)`
`

export default MyFavor
