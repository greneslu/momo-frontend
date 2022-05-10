import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getMyOrders, changeStatus,getSellerOrders } from "../order";
import { isAuthenticated } from "../auth";
import AlertBar from "./AlertBar";
import CommentDialog from './CommentDialog';
import StatusChange from './StatusChange';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import Box from '@mui/material/Box';
import HailOutlinedIcon from '@mui/icons-material/HailOutlined';

const statusObj = {
    0: "取消訂單",
    1: "等待出貨",
    2: "賣家已出貨",
    3: "已完成訂單",
}

const paymentobj = {
    0: "線上刷卡",
    1: "貨到付款",
    2: "銀行轉帳"
}

const shippingobj = {
    0: "超商取貨",
    1: "宅配"
}

function Row(props) {
    const { row, orderFetch, isSeller } = props;
    const [open, setOpen] = React.useState(false);
    const token = isAuthenticated() && isAuthenticated().accessToken

    const completeOrder = () => {
        let completeord = {
            ...row,
            status: 3
        }
        changeStatus(completeord, token)
            .then(data => {
                orderFetch()
            })
    }


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    No.{row.id}
                </TableCell>
                <TableCell align="right">
                    {isSeller ? <StatusChange status={row.status} order={row} /> : statusObj[row.status]}
                </TableCell>
                <TableCell align="right">{shippingobj[row.shipping]}</TableCell>
                <TableCell align="right">{paymentobj[row.payment]}</TableCell>
                <TableCell align="center">{row.setuptime}</TableCell>
                <TableCell>
                    {!isSeller && row.status === 2 ? <Button onClick={completeOrder} className='btn btn-pink' variant="contained">完成訂單</Button>
                        : row.status === 1 || row.status === 0 ? "" : <Button disabled className='btn' variant="contained">完成訂單</Button>}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                訂單明細
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <caption><HailOutlinedIcon color="disabled" /> 收貨人: {row.consignee}  ||  <CallOutlinedIcon color="disabled"  /> 收貨人電話: {row.tel} ||
                                    <HomeOutlinedIcon color="disabled" /> 收貨地址: {row.shippingadd}</caption>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>商品編號</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>商品名稱</TableCell>
                                        <TableCell>規格</TableCell>
                                        <TableCell align="right">商品單價</TableCell>
                                        <TableCell align="right">數量</TableCell>
                                        <TableCell align="right">總金額 $ {row.alltotal}</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.data.map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell component="th" scope="row">
                                                #{item.prid}
                                            </TableCell>
                                            <TableCell>
                                                <img src={item.cover} width={90} />
                                            </TableCell>
                                            <TableCell>{item.name.slice(0, 20)}</TableCell>
                                            <TableCell >{item.spec}</TableCell>
                                            <TableCell align="right">$ {item.prprice}</TableCell>
                                            <TableCell align="right">
                                                {item.num}
                                            </TableCell>
                                            <TableCell align="right">$ {item.prtotal}</TableCell>
                                            <TableCell>
                                                {!isSeller && item.iscommented === 0 ? <CommentDialog product={item} orderFetch={orderFetch} /> :
                                                    !isSeller ? <Button variant="outlined" disabled>已評論</Button> : null}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


const MyOrder = (props) => {
    const { isSeller } = props
    const [orders, setOrders] = useState([])

    const token = isAuthenticated() && isAuthenticated().accessToken
    const user = isAuthenticated()

    const orderFetch = () => {
        var map = {}
        var arr = [];
        getMyOrders(token)
            .then(data => {
                for (var i = 0; i < data.length; i++) {
                    var ai = data[i];
                    if (!map[ai.id]) {
                        arr.push({
                            id: ai.id,
                            status: ai.status,
                            shipping: ai.shipping,
                            payment: ai.payment,
                            setuptime: ai.setuptime,
                            userid: ai.userid,

                            data: [ai]
                        });
                        map[ai.id] = ai;
                    } else {
                        for (var j = 0; j < arr.length; j++) {
                            var dj = arr[j];
                            if (dj.id == ai.id) {
                                dj.data.push(ai);
                                break;
                            }
                        }
                    }
                }
                arr.forEach(item => {
                    let alltotal = 0
                    item.data.forEach(item2 => {
                        alltotal = alltotal + item2.prtotal
                    })
                    const index = arr.indexOf(arr.find(arrObj => arrObj === item))
                    arr[index] = {
                        ...item,
                        alltotal
                    }
                })
                setOrders(arr.filter(item => item.userid === user.id))
            })
    }


    useEffect(() => {

        var map = {}
        var arr = [];
        if(isSeller){
            getSellerOrders(token)
            .then(data => {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    var ai = data[i];
                    if (!map[ai.id]) {
                        arr.push({
                            id: ai.id,
                            status: ai.status,
                            shipping: ai.shipping,
                            payment: ai.payment,
                            setuptime: ai.setuptime,
                            userid: ai.userid,
                            tel: ai.tel,
                            consignee: ai.consignee,
                            shippingadd: ai.shippingadd,
                            data: [ai]
                        });
                        map[ai.id] = ai;
                    } else {
                        for (var j = 0; j < arr.length; j++) {
                            var dj = arr[j];
                            if (dj.id == ai.id) {
                                dj.data.push(ai);
                                break;
                            }
                        }
                    }
                }
                arr.forEach(item => {
                    let alltotal = 0
                    item.data.forEach(item2 => {
                        alltotal = alltotal + item2.prtotal
                    })
                    const index = arr.indexOf(arr.find(arrObj => arrObj === item))
                    arr[index] = {
                        ...item,
                        alltotal
                    }
                })
                setOrders(arr)
            })
        }else{
            getMyOrders(token)
            .then(data => {
                // console.log(data)
                for (var i = 0; i < data.length; i++) {
                    var ai = data[i];
                    if (!map[ai.id]) {
                        arr.push({
                            id: ai.id,
                            status: ai.status,
                            shipping: ai.shipping,
                            payment: ai.payment,
                            setuptime: ai.setuptime,
                            userid: ai.userid,
                            tel: ai.tel,
                            consignee: ai.consignee,
                            shippingadd: ai.shippingadd,
                            data: [ai]
                        });
                        map[ai.id] = ai;
                    } else {
                        for (var j = 0; j < arr.length; j++) {
                            var dj = arr[j];
                            if (dj.id == ai.id) {
                                dj.data.push(ai);
                                break;
                            }
                        }
                    }
                }
                arr.forEach(item => {
                    let alltotal = 0
                    item.data.forEach(item2 => {
                        alltotal = alltotal + item2.prtotal
                    })
                    const index = arr.indexOf(arr.find(arrObj => arrObj === item))
                    arr[index] = {
                        ...item,
                        alltotal
                    }
                })
                console.log(arr)
                // if (isSeller) {
                //     setOrders(arr.filter(item => item.sellerid === user.id))
                // } else {
                    setOrders(arr)
                // }
            })
        }
        
    }, [])

    return (
        <>
            <h4>{props.title}</h4>
            <Paper elevation={3}>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <TableContainer >
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>訂單編號</TableCell>
                                    <TableCell align="right">訂單狀況 </TableCell>
                                    <TableCell align="right">運送方式</TableCell>
                                    <TableCell align="right">付款方式</TableCell>
                                    <TableCell align="center">訂單日期</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((row) => (
                                    <Row key={row.name} row={row} orderFetch={orderFetch} isSeller={isSeller} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Paper>
        </>
    );
}

export default MyOrder;

