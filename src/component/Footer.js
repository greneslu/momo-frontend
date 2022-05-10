import React from 'react';
import styled from 'styled-components'

const Element = () => (
    <footer className="text-center text-lg-start bg-light text-muted">
        <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 mt-5">
                    <h6 className="text-uppercase fw-bold mb-4">
                        客服中心
                    </h6>
                    <p>
                        <a href="#!" className="text-reset">幫助中心</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">付款方式</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">運費補助</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">退貨退款</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">延長訂單撥款</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">聯絡客服</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">防詐騙宣導</a>
                    </p>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 mt-5">
                    <h6 className="text-uppercase fw-bold mb-4">
                        關於購物
                    </h6>
                    <p>
                        <a href="#!" className="text-reset">哞哞條款</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">隱私權政策</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">限時特賣</a>
                    </p>
                    <p>
                        <a href="#!" className="text-reset">聯絡媒體</a>
                    </p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 mt-5">
                    <h6 className="text-uppercase fw-bold mb-4">
                        關注我們
                    </h6>
                    <p>
                        <i className="fab fa-facebook-square me-3"></i>Facebook
                    </p>
                    <p>
                        <i className="fab fa-instagram-square me-3"></i>Instagram
                    </p>
                    <p>
                        <i className="fab fa-line me-3 me-3"></i>Line
                    </p>
                    <p>
                        <i className="fab fa-twitter-square me-3"></i>Twitter
                    </p>
                    <p>
                        <i className="fas fa-share me-3"></i>分享
                    </p>
                </div>
            </div>
        </div>
        <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
            © 2021 Copyright
            <a className="text-reset fw-bold" href="https://mdbootstrap.com/"></a>
        </div>
    </footer >
)
const Footer = styled(Element)`

`
export default Footer;