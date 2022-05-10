// import React from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import MyOrder from './MyOrder';
import { isAuthenticated } from "../auth";
import { getMyOrders } from "../order";
import MyProduct from './MyProduct';
import Layout from './Layout';
import User from './User';
import MyFavor from './MyFavor';
import DataCard from './DataCard';
import Chart from './Chart';




function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const Element = ({ className, location }) => {
    const [value, setValue] = useState(location && location.state && location.state.state.value || 0);
    const [data, setData] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getMyOrders(isAuthenticated().accessToken)
            .then(data => {
                var date = new Date()
                var y = date.getFullYear()
                var m = date.getMonth();
                var firstDay = new Date(y, m, 1);
                var lastDay = new Date(y, m + 1, 0);
                setData(data.filter(item => new Date(item.setuptime) > firstDay && new Date(item.setuptime) < lastDay))
            })
    }, [])

    return (
        <>
            <Layout>
                <div className={className}>
                    <Box sx={{ width: '100%' }}>
                        <Tabs value={value} onChange={handleChange} centered TabIndicatorProps={{ style: { background: "#f7bacf" } }}
                        >
                            <Tab label="我的訂單" value={0} />
                            <Tab label="我的收藏" value={1} />
                            <Tab label="我的賣場" value={2} />
                            <Tab label="數據中心" value={3} />
                            <Tab label="基本資料" value={4} />
                        </Tabs>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                        // alignItems="center"
                        // justifyContent="center"
                        // style={{ minHeight: '100vh' }}
                        >

                            <Grid item xs={3}>
                                <TabPanel value={value} index={0}>
                                    <Container maxWidth="lg">
                                        <MyOrder title="買家訂單" isSeller={false} />
                                    </Container>
                                </TabPanel>

                                <TabPanel value={value} index={1}>
                                    <Container maxWidth="lg">
                                        <MyFavor />
                                    </Container>
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <Container maxWidth="lg">
                                        <MyOrder title="賣家訂單" isSeller={true} />
                                        <br />
                                        <br />
                                        <MyProduct />
                                    </Container>
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <Container maxWidth="lg">
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <DataCard data={data} title="銷售額" type="1" />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <DataCard data={data} title="訂單" type="2" />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <DataCard data={data} title="平均訂單金額" type="3" />
                                            </Grid>
                                            {/* <Grid item xs={3}>
                                                <DataCard data={data} />
                                            </Grid> */}
                                        </Grid>
                                        <br />
                                        <br />
                                        {/* <Chart data={data} /> */}
                                    </Container>
                                </TabPanel>
                                <TabPanel value={value} index={4}>
                                    <Container maxWidth="lg">
                                        <User />
                                    </Container>
                                </TabPanel>
                            </Grid>

                        </Grid>

                    </Box>
                </div >
            </Layout >
        </>
    )
}

const MemberCenter = styled(Element)`

.list-group-position{
    position: absolute;
    top: 20px;
    left: 20px;
}
.list-style{
    width: 150px;
}
.list-group-Btn{
    background-color: pink;
    font-weight: bolder;
    color:rgba(252, 252, 252, 0.87);
    margin:1px;
    border:none;
}
.pinkBtn:hover{
    background-color:rgb(255, 230, 234);
}

.create-product:hover{
    background-color:rgb(142, 110, 150);
    color:white;
}
.create-product{
    background-color: #fff;
    color:rgb(142, 110, 150);
    border:solid 1px rgb(142, 110, 150);
}
.member-box{
    margin-top: 20px;
    width: 900px;
}
.account-content{
    width:900px;
    background-color: rgb(250, 237, 237);
    padding-bottom:50px;
    padding-top:50px;
}
.accountWrap{
    height:220px;

}
.accountWrap a{
    font-size: 20px;
    text-decoration: none;
    display: block;
    text-align: center;
    color: black;
}
.photo{
    width:150px;
    height:150px;
    border-radius: 50%;
    background-color:rgb(248, 231, 210);
    text-align: center;
    color:rgb(117, 79, 85);
}
.account{
    display: flex;
    justify-content: center;
}
.update-wrap{
    width:80%;
    margin:0 auto;
}
.input-wrap input{
    border:solid rgb(245, 201, 201) 1px;
}
.input-wrap{
    width:60%;
    margin:0 auto;
    text-align: center;
}
.pinkBtn{
    border:solid 2px pink;
    color:black;
    white-space: nowrap;
}
.btn-mg{
    margin-top:30px;
    margin-left:80%;
}
.btn-pink{
    color: black;
}

.btn-pink:not(.collapsed) {
    background-color: pink;
    color: #fff;
}
.title{
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;;
}
.title h5{
    font-size: 30px;
}
.card-style{
    height: 350px;
}
.card-text{
    font-size: 10px;
}
.card-content{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: black;
}
.price-div{
    position: absolute;
    bottom:5px;
    color: black;
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
.a-style{
    text-decoration: none;
}
.css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: #f7bacf;
}
`

export default MemberCenter;