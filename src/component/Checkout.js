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
                    alert("??????")
                }
            }
            alert('????????????')
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
                        <p className="title center">1 . ????????????</p><hr className="mg0" />
                        <table className="table pink-table">
                            <thead>
                                <tr className="thead">
                                    <th scope="col"></th>
                                    <th scope="col">????????????</th>
                                    <th scope="col">??????</th>
                                    <th scope="col">??????</th>
                                    <th scope="col">??????</th>
                                    <th scope="col">?????????</th>
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
                                    <th scope="col" >NT.{total}???</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="col-center">
                        <div className="w50">
                            <p className="title">2 . ???????????????</p><hr className="mg0" />
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
                                    label="??????"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={name}
                                    onChange={handleChange("name")}
                                />
                                <TextField
                                    id="outlined-phone"
                                    label="??????"
                                    type="tel"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={phone}
                                    onChange={handleChange("phone")}
                                />
                                <TextField
                                    id="outlined-address"
                                    label="??????"
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
                            <p className="title">3 . ???????????????</p><hr className="mg0" />
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
                                    label="???????????????"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={receiptName}
                                    onChange={handleChange("receiptName")}
                                />
                                <TextField
                                    id="outlined-receiptPhone"
                                    label="???????????????"
                                    type="tel"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={receiptPhone}
                                    onChange={handleChange("receiptPhone")}
                                />
                                <TextField
                                    id="outlined-receiptAddr"
                                    label="???????????????"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={receiptAddr}
                                    onChange={handleChange("receiptAddr")}
                                />
                                <br />
                                <FormControlLabel control={<Checkbox onChange={handleCheckbox} checked={checked} />} label="????????????????????????" />
                            </Box>
                        </div>
                        <div className="w50">
                            <p className="title">4 . ?????????????????????</p><hr className="mg0" />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">????????????</FormLabel>
                                <RadioGroup row aria-label="payment" name="row-radio-buttons-group" defaultValue="0">
                                    <FormControlLabel value="0" control={<Radio value="0" onChange={handleChange("payment")} />} label="????????????" />
                                    <FormControlLabel value="1" control={<Radio value="1" onChange={handleChange("payment")} />} label="????????????" />
                                    <FormControlLabel value="2" control={<Radio value="2" onChange={handleChange("payment")} />} label="????????????" />
                                </RadioGroup>
                                <br />
                                <FormLabel component="legend">????????????</FormLabel>
                                <RadioGroup row aria-label="delivery" name="row-radio-buttons-group" defaultValue="0">
                                    <FormControlLabel value="0" control={<Radio value="0" onChange={handleChange("delivery")} />} label="????????????" />
                                    <FormControlLabel value="1" control={<Radio value="1" onChange={handleChange("delivery")} />} label="??????" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="col-center">

                    </div>
                    <button onClick={handleSubmit} className="btn">??????</button>
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