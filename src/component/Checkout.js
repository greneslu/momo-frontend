import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import styled from 'styled-components'
import { isAuthenticated } from "../auth";
import { addOrder } from '../order';
import { emptyCart, getCart, removeItem } from './cartHelpers';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import { checkOutOneTime, checkOutATM } from '../order';
import Layout from './Layout';
import { getUser } from '../auth';


const Element = ({ className, location }) => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [values, setValues] = useState({});
    const [checked, setChecked] = useState(false)
    const [user, setUser] = useState({})
    const history = useHistory();
    const token = isAuthenticated() && isAuthenticated().accessToken

    const { name, phone, address, payment = "0", delivery, receiptName, receiptPhone, receiptAddr } = values

    const handleSubmit = () => {
        products.forEach(item => {
            if (getCart().find(item2 => item2.id === item.id)) {
                removeItem(getCart().find(item2 => item2.id === item.id).id)
            }
        })


        if (payment === "0") {
            checkOutOneTime({
                ...values,
                products,
                total
            })
                .then(data => {
                    // var myWindow = window.open("", "response", "resizable=yes");
                    window.document.write(data);
                    addOrder({ products, total, payment: parseInt(payment), shipping: parseInt(delivery), shippingadd: receiptAddr, consignee: receiptName, tel: receiptPhone }, token)
                        .then(data => {
                            // history.push("/memberCenter", {
                            //     state: {
                            //         value: 4
                            //     }
                            // })
                        })
                })
        } else if (payment === "2") {
            checkOutATM({
                ...values,
                products,
                total
            })
                .then(data => {
                    // var myWindow = window.open("", "response", "resizable=yes");
                    // myWindow.document.write(data);
                    window.document.write(data);
                    addOrder({ products, total, payment: parseInt(payment), shipping: parseInt(delivery), shippingadd: receiptAddr, consignee: receiptName, tel: receiptPhone }, token)
                        .then(data => {
                            // history.push("/memberCenter", {
                            //     state: {
                            //         value: 4
                            //     }
                            // })
                        })
                })
        } else {
            addOrder({ products, total, payment: parseInt(payment), shipping: parseInt(delivery), shippingadd: receiptAddr, consignee: receiptName, tel: receiptPhone }, token)
                .then(data => {
                    // history.push("/memberCenter", {
                    //     state: {
                    //         value: 4
                    //     }
                    // })
                })
            const checkvalue = () => {
                if (values.shipping == null || values.payment == null) {
                    alert("空值")
                }
            }
            alert('下單成功')
            history.push("/")
        }


    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const handleCheckbox = (e) => {
        if (e.target.checked === true) {
            setValues({
                ...values,
                receiptName: user.username,
                receiptPhone: user.phone,
                receiptAddr: user.address
            })
        } else {
            setValues({
                ...values,
                receiptName: "",
                receiptPhone: "",
                receiptAddr: ""
            })
        }
        setChecked(e.target.checked)
    }

    useEffect(() => {
        getUser(token)
            .then(data => {
                setValues({
                    name: data.username,
                    phone: data.phone,
                    address: data.address
                })
                setUser(data)
            })
        setProducts(location.state.selectedArr)
        setTotal(location.state.total)
    }, [])
    return (
        <Layout>
            <div className={className} >
                <div className="pink w70 center">
                    <div className="m30">
                        <p className="title center">1 . 訂單內容</p><hr className="mg0" />
                        <table className="table pink-table">
                            <thead>
                                <tr className="thead">
                                    <th scope="col"></th>
                                    <th scope="col">商品名稱</th>
                                    <th scope="col">規格</th>
                                    <th scope="col">金額</th>
                                    <th scope="col">數量</th>
                                    <th scope="col">總金額</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item, index) =>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.spec}</td>
                                        <td>{item.price}</td>
                                        <td>{item.num}</td>
                                        <td>{item.num * item.price}</td>
                                    </tr>
                                )}
                            </tbody>
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col" >NT.{total}元</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="col-center">
                        <div className="w50">
                            <p className="title">2 . 訂購人資料</p><hr className="mg0" />
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '20ch' },
                                    textAlign: "center"
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="outlined-name"
                                    label="姓名"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={name}
                                    onChange={handleChange("name")}
                                />
                                <TextField
                                    id="outlined-phone"
                                    label="電話"
                                    type="tel"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={phone}
                                    onChange={handleChange("phone")}
                                />
                                <TextField
                                    id="outlined-address"
                                    label="地址"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={address}
                                    onChange={handleChange("address")}
                                />
                            </Box>
                        </div>
                        <div className="w50">
                            <p className="title">3 . 收貨人資料</p><hr className="mg0" />
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '20ch' },
                                    textAlign: "center"
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="outlined-receiptName"
                                    label="取貨人姓名"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={receiptName}
                                    onChange={handleChange("receiptName")}
                                />
                                <TextField
                                    id="outlined-receiptPhone"
                                    label="取貨人電話"
                                    type="tel"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={receiptPhone}
                                    onChange={handleChange("receiptPhone")}
                                />
                                <TextField
                                    id="outlined-receiptAddr"
                                    label="取件人地址"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={receiptAddr}
                                    onChange={handleChange("receiptAddr")}
                                />
                                <br />
                                <FormControlLabel control={<Checkbox onChange={handleCheckbox} checked={checked} />} label="與購買人資料相同" />
                            </Box>
                        </div>
                        <div className="w50">
                            <p className="title">4 . 付款及運送資訊</p><hr className="mg0" />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">付款方式</FormLabel>
                                <RadioGroup row aria-label="payment" name="row-radio-buttons-group" defaultValue="0">
                                    <FormControlLabel value="0" control={<Radio value="0" onChange={handleChange("payment")} />} label="線上刷卡" />
                                    <FormControlLabel value="1" control={<Radio value="1" onChange={handleChange("payment")} />} label="貨到付款" />
                                    <FormControlLabel value="2" control={<Radio value="2" onChange={handleChange("payment")} />} label="銀行轉帳" />
                                </RadioGroup>
                                <br />
                                <FormLabel component="legend">運送方式</FormLabel>
                                <RadioGroup row aria-label="delivery" name="row-radio-buttons-group" defaultValue="0">
                                    <FormControlLabel value="0" control={<Radio value="0" onChange={handleChange("delivery")} />} label="超商取貨" />
                                    <FormControlLabel value="1" control={<Radio value="1" onChange={handleChange("delivery")} />} label="宅配" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="col-center">

                    </div>
                    <button onClick={handleSubmit} className="btn">送出</button>
                </div>
            </div>
        </Layout>)
}

const Checkout = styled(Element)`
.center{
    margin:0 auto;
    text-align:center;
}
.w70{
    width:70%;
}
.w50{
    width:50%;
}
.col-center{
    display:flex;
}
.m30{
    margin:30px 0 50px 0;
    padding-top:15px;
}
.pink{
    border:dotted 6px #fce4ec;
    padding:10px;
    color:#d1445ba4;
}
.pink-table{
    color:#d1445ba4;
}
.btn{
    border:0;
    background-color:#d1445ba4;
    color:#fff;
    border-radius:10px;
    cursor:pointer;
    width:300px;
    margin-top:100px;
}
`

export default Checkout;