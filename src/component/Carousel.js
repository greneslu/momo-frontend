// import React from 'react';
import styled from 'styled-components'

const Element = ({ className }) => (
    <div className={className}>
        <div id="carouselExampleIndicators" className="carousel slide w-50" style={{ margin: '0 auto' }} data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://img2.momoshop.com.tw/ecm/img/online/10/999/00/000/bt_0_247_01/bt_0_247_01_P1_5_e2.jpg?t=1639065627716"
                        className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://img2.momoshop.com.tw/ecm/img/online/10/999/00/000/bt_0_247_01/bt_0_247_01_P1_5_e2.jpg?t=1639065627716"
                        className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://img2.momoshop.com.tw/ecm/img/online/10/999/00/000/bt_0_247_01/bt_0_247_01_P1_5_e2.jpg?t=1639065627716"
                        className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>

)

const Carousel = styled(Element)`

`

export default Carousel;