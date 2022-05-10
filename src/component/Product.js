import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import TextareaAutosize from '@mui/material/TextareaAutosize';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
// import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import styledComponent from 'styled-components'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Layout from '../sample/Layout';
import Comment from './Comment';
import { addItem, itemTotal } from './cartHelpers';
import { getProduct, getSpecs, getPics, getComments } from '../product';

const labels = {
    0: "0",
    0.1: "0.1",
    0.2: "0.2",
    0.3: "0.3",
    0.4: "0.4",
    0.5: "0.5",
    0.6: "0.6",
    0.7: "0.7",
    0.8: "0.8",
    0.9: "0.9",
    1.0: "1.0",
    1.1: "1.1",
    1.2: "1.2",
    1.3: "1.3",
    1.4: "1.4",
    1.5: "1.5",
    1.6: "1.6",
    1.7: "1.7",
    1.8: "1.8",
    1.9: "1.9",
    2.0: "2.0",
    2.0: "2.0",
    2.1: "2.1",
    2.2: "2.2",
    2.3: "2.3",
    2.4: "2.4",
    2.5: "2.5",
    2.6: "2.6",
    2.7: "2.7",
    2.8: "2.8",
    2.9: "2.9",
    3.0: "3.0",
    3.1: "3.1",
    3.2: "3.2",
    3.3: "3.3",
    3.4: "3.4",
    3.5: "3.5",
    3.6: "3.6",
    3.7: "3.7",
    3.8: "3.8",
    3.9: "3.9",
    4.0: "4.0",
    4.1: "4.1",
    4.2: "4.2",
    4.3: "4.3",
    4.4: "4.4",
    4.5: "4.5",
    4.6: "4.6",
    4.7: "4.7",
    4.8: "4.8",
    4.9: "4.9",
    5.0: "5.0",
};

const category = {
    0: "女生衣著",
    1: "男生衣著",
    2: "運動/健",
    3: "男女鞋",
    4: "電腦週邊",
    5: "美妝保養",
    6: "服飾飾品",
    7: "手機相機",
    8: "家電影音",
    9: "居家生活",
    10: "寵物",
    11: "戶外/旅行",
    12: "書籍"
}

const Element = ({ className, match }) => {
    const [product, setProduct] = useState({})
    const [star, setStar] = useState(2)
    const [values, setValues] = useState({});
    const [specs, setSpecs] = useState([])
    const [spec, setSpec] = useState({})
    const [pic, setPic] = useState([])
    const [comments, setComments] = useState([])
    const [average, setAverage] = useState(0)

    const { num } = values;
    const productId = match.params.productId
    const addIntoCart = () => {
        const number = parseInt(num)
        if(number <= spec.stock){
            addItem({
                ...product,
                spec: spec.spec,
                num: number
            })
            window.location.reload();
            alert("商品已加入購物車")
        }else{
            alert("下單數量超過上限,請重試")
            // return ( <Alert severity="error">下單數量超過上限,請重試</Alert> )
        }
        
    }

    const handleButton = () => {

    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
        console.log(values)
    }

    const handleClick = (event) => {
        event.preventDefault();
    }

    const handleSpecBtn = (obj) => {
        const arr = []
        specs.forEach(item => {
            arr.push({
                ...item,
                isSel: false
            })
        })
        const index = specs.indexOf(obj)
        arr[index] = {
            ...obj,
            isSel: true
        }

        setSpecs(arr)
        setSpec(obj)
        // let arr = [
        //     ...specs
        // ]
        // const index = specs.indexOf(obj)
        // arr[index] = {
        //     ...obj,
        //     isSel: true
        // }

        // setSpecs(arr)
        // let a = e.target;
        // a.classList.toggle("alreadyClick")
        // a.siblings.classList.remove("alreadyClick")
    }

    useEffect(() => {
        getProduct(productId)
            .then(data => {
                setProduct(data)
            })
        getSpecs(productId)
            .then(data1 => {
                const arr = []
                data1.forEach((item, index) => {
                    if (index === 0) {
                        arr.push({
                            ...item,
                            isSel: true
                        })
                    } else {
                        arr.push({
                            ...item,
                            isSel: false
                        })
                    }

                })
                setSpecs(arr)
                setSpec(arr[0])
            })

        getPics(productId)
            .then(pics => {
                setPic(pics)
            })

        getComments(productId)
            .then(data => {
                let ave = 0
                data.forEach(item => {
                    ave += item.star
                })
                setComments(data)
                setAverage((ave / data.length) || 0)
            })
    }, [])
    return (
        <Layout>
            <div className={className}>
                <div className="bg">
                <div className="content">
                    <div role="presentation" onClick={handleClick}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link className="pink-link" underline="hover" color="#af4448" to="/">
                                首頁
                            </Link>
                            <Link className="pink-link"
                                underline="hover"
                                color="inherit"
                                to={`/products/${product.category}`}
                            >
                                {category[product.category]}
                            </Link>
                            <Typography color="text.primary">{product.name}</Typography>
                        </Breadcrumbs>
                    </div>
                    <br />
                    <Paper elevation={3} >

                        <div className="info">
                            <div id="carouselExampleIndicators" className="carousel slide slide-500" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    {pic.map((item, index) => {
                                        return index === 0 ? (
                                            <button type="button slide-indicator" data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                        ) : (
                                            <button type="button slide-indicator" data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to={index} aria-label={`Slide ${index}`}></button>
                                        )
                                    })}
                                    {/* <button type="button slide-indicator" data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button slide-indicator" data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button slide-indicator" data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide-to="2" aria-label="Slide 3"></button> */}
                                </div>
                                <div className="carousel-inner">
                                    {pic.map((item, index) => (
                                        <div className={`carousel-item picDiv ${index === 0 ? "active" : ""}`}>
                                            <img src={item.picname}
                                                className="d-block w-100 productImg" alt="..." />
                                        </div>
                                    ))}

                                    {/* <div className="carousel-item">
                                        <img src="https://7ego.7-11.com.tw/Files/market/106354/image/MAI_214356379_X700X700.jpg"
                                            className="d-block w-100 productImg" alt="..." />
                                    </div> */}
                                </div>
                                <button className="carousel-control-prev slide-indicator" type="button"
                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next slide-indicator" type="button"
                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <Box sx={{ width: '100%', maxWidth: 500, padding: "50px 10px 10px 0" }}>
                                <Typography variant="h5" gutterBottom component="div">
                                    {product.name}
                                </Typography>
                                <Box
                                    sx={{
                                        width: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Rating
                                        name="text-feedback"
                                        value={average}
                                        readOnly
                                        precision={0.1}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    <Box sx={{ ml: 2 }}>({labels[average]})</Box>
                                </Box>
                                <Typography variant="h5" gutterBottom component="div" marginTop={5}>

                                    <Box sx={{ '& button': { m: 1 } }}>
                                        規格：
                                        {specs.map(data => (
                                            <Button variant={`${data.isSel ? "contained" : "outlined"}`} className='btn btn-pink ' size="small" onClick={() => handleSpecBtn(data)} >
                                                {data.spec}
                                            </Button>
                                        ))}
                                        {/* <Button variant="contained" size="small">
                                            20ml
                                        </Button>
                                        <Button variant="outlined" size="small">
                                            50ml
                                        </Button>
                                        <Button variant="outlined" size="small">
                                            100ml
                                        </Button> */}
                                    </Box>
                                </Typography>

                                <Typography variant="h5" gutterBottom component="div" marginTop={5}>
                                    數量：
                                    <TextField
                                        type="number"
                                        label={`目前剩餘庫存: ${spec.stock}`}
                                        id="outlined-size-small"
                                        defaultValue="Small"
                                        size="small"
                                        sx={{ width: "200px" }}
                                        value={num}
                                        onChange={handleChange("num")}
                                        inputProps={{ min: 0, max: spec.stock }}
                                    // inputProps={{inputProps: {min:0,max:spec.stock}}}
                                    />
                                </Typography>

                                <Typography variant="h5" gutterBottom component="div" marginTop={5}>
                                    售價：{product.price}元
                                </Typography>
                                <Typography variant="h5" gutterBottom component="div" marginTop={5}>

                                    <Box sx={{ '& button': { ml: 40 } }}>
                                        {/* 庫存：100 */}

                                        <Button class="btn btn-pink " variant="contained" onClick={addIntoCart}>
                                        加入購物車 <i class="fas fa-cart-plus "></i> 
                                        </Button>
                                    </Box>
                                    {/* <button className="btn btnRed" onClick={addIntoCart}>加入購物車</button> */}
                                </Typography>
                            </Box>
                            {/* <div className="detail">
                                <ul className="detailList">
                                    <li>JO MALONE 英國梨與小蒼蘭香水 100ml</li>
                                    <li>5.0(<a href="#">199</a>)</li>
                                    <li>售價：4420元</li>
                                    <li>庫存：100</li>
                                </ul>
                                <div className="btnWrap">
                                    <button className="btn btnRed" onClick={addIntoCart}>加入購物車</button>
                                </div>
                            </div> */}
                        </div>
                        <hr />
                        <div className="discription">
                            <h6>商品描述</h6>
                            <p>{product.description}</p>
                        </div>
                        <hr />
                        <Comment comments={comments} />
                        {/* <div className="commentWrap">
                            <Box sx={{ marginBottom: "20px" }}>
                                <Rating
                                    name="simple-controlled"
                                    value={star}
                                    onChange={(event, newValue) => {
                                        setValues(newValue);
                                    }}
                                    sx={{ display: "block", textAlign: "center" }}
                                />
                                <TextareaAutosize
                                    aria-label="empty textarea"
                                    placeholder=""
                                    minRows={10}
                                    style={{ width: 500 }}
                                />
                            </Box>
                            <Button variant="contained">送出評論</Button>
                        </div> */}
                    </Paper>
                </div>
                </div>
            </div>
        </Layout >
    )
}

const Product = styled(Element)`
.content{
    width:66.666667%;
    margin:20px auto 0;
    // background-color: rgb(250, 237, 237);
}
.info{
    display: flex;
    justify-content:space-evenly;
}
.productImg{
    max-width: 100%; 
    max-height: 100%; 
    position: absolute; 
    top: 50%; left: 50%; 
    transform: translate(-50%, -50%);
}
.discription{
    margin-top: 50px;
    text-align: center;
}
.discription h6{
    font-size: 30px;
}
.discription p{
    margin: 20px 80px 70px;
    font-size: 20px;
    text-align: left;
}
.btnRed{
    background-color:rgb(240, 147, 147);
}
.btn-right-15{
    margin-right:15px;
}
.slide-indicator{
    background-color: rgb(165, 165, 165);
}
.slide-500{
    width:400px;
    height:400px;
}
.btnWrap{
    text-align: right;
    margin-top:90px;
}
.breadcrumbWrap{
    background-color: #fff;
}
.commentWrap{
    text-align: center;
    padding:30px;
}
.commentField{
    width:400px;
    height:200px;
    margin-right: 30px;
}
.btn-left-40{
    margin-left:40px ;
}
.checked {
    color: orange;
}
.picDiv{
    width:400px;
    height:400px;
}
.alreadyClick{
    color:red;
}
.btn-pink{
    background-color: #ffffff;
    color: #f7bacf;
    border:solid 1px #f7bacf;
}
.btn-pink:hover{
    background-color: #f7bacf;
    color: #ffffff;
    border:solid 1px #f7bacf;
}
.MuiButton-outlined{
    background-color: #ffffff;
    color: #f7bacf;
    border:solid 1px #f7bacf;
}
.MuiButton-outlined:hover{
    background-color: #f7bacf;
    color: #ffffff;
}
.MuiButton-contained{
    background-color: #f7bacf;
    color: #ffffff;
}
.MuiButton-contained:hover{
    background-color: #f7bacf;
    color: #ffffff;
}
.pink-link{
    color:#af4448;
}
.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused{
    color:#f7bacf;
}
.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #f7bacf
}
.bg{
    background-image: url("https://png.pngtree.com/back_origin_pic/05/14/94/2e1139be16239b483874dec1a4bebb6b.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
`

export default Product;