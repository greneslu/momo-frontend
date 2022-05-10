// import React from 'react';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ExternalTable from './ExternalTable';
import { addProduct } from "../product";
import { isAuthenticated } from "../auth";


const categorySel = [
    {
        value: '0',
        label: '女生衣著',
    },
    {
        value: '1',
        label: '男生衣著',
    },
    {
        value: '2',
        label: '運動/健身',
    },
    {
        value: '3',
        label: '男女鞋',
    },
    {
        value: '4',
        label: '電腦週邊',
    },
    {
        value: '5',
        label: '美妝保養',
    },
    {
        value: '6',
        label: '服飾飾品',
    },
    {
        value: '7',
        label: '手機相機',
    },
    {
        value: '8',
        label: '家電影音',
    },
    {
        value: '9',
        label: '居家生活',
    },
    {
        value: '10',
        label: '寵物',
    },
    {
        value: '11',
        label: '戶外/旅行',
    },
    {
        value: '12',
        label: '書籍',
    }
];

const Element = ({ className, product, productsFetch }) => {
    const [values, setValues] = useState(product)
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [base64, setBase64] = useState([]);
    const [specArr, setSpecArr] = useState([]);

    const { name, description, price, stock, category } = values

    const token = isAuthenticated() && isAuthenticated().accessToken
    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/memberCenter" />
        }
    }
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }


    const clickSubmit = (event) => {
        event.preventDefault()
        console.log(values)
        addProduct({
            name, description, price, stock, url: base64, category, specs: specArr
        }, token)
            .then(data => {
                if (data) {
                    alert("商品修改成功")
                    setValues({
                        name: "",
                        description: "",
                        price: "",
                        stock: "",
                        imageURLs: [],
                        base64: []
                    })
                    setSpecArr([])
                    productsFetch()
                } else {
                    alert("商品修改失敗")
                }
            })
    }

    const handleImages = (e) => {
        setImages([...e.target.files])
    }

    useEffect(() => {
        if (images.length < 1) return
        const arr = []
        // images.forEach(image => arr.push(URL.createObjectURL(image)))
        const arr1 = []
        images.forEach(file => {
            arr.push(URL.createObjectURL(file))
            var reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function (e) {
                var image = new Image() //新建一個img標籤（還沒嵌入DOM節點)
                image.src = e.target.result
                image.onload = function () {
                    var canvas = document.createElement('canvas'),
                        context = canvas.getContext('2d'),
                        imageWidth = image.width / 3,    //壓縮後圖片的大小
                        imageHeight = image.height / 3;
                    canvas.width = imageWidth;
                    canvas.height = imageHeight;
                    context.drawImage(image, 0, 0, imageWidth, imageHeight);

                    arr1.push(canvas.toDataURL('image/jpeg'))
                }
            }
        })
        setImageURLs(arr)
        setBase64(arr1)
        console.log(arr1)
    }, [images])

    return (
        <div className={className}>
            <Button size="small" data-bs-toggle="modal" data-bs-target="#updateProduct" sx={{ color: "#f7bacf" }} >更新商品</Button>

            <div className="modal fade" id="updateProduct" tabIndex="-1" aria-labelledby="updateProductLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">&emsp;修改商品</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="productInformation">
                                    <form action="">
                                        {/* <b>商品圖片</b>&emsp; */}
                                        <label className="uploadImg">
                                            <input type="file" id="img" className="img" accept="image/*" multiple onChange={handleImages} />
                                            {/* <i className="fa fa-photo"></i>&ensp; */}
                                            上傳圖片
                                        </label>
                                        {imageURLs && imageURLs.map(item => (
                                            <img src={item} height={100} style={{ margin: "20px" }} alt="" />
                                        ))}
                                        {/* <img src={imagesSrc} height={100} style={{ margin: "20px" }} alt="" /> */}
                                        <br /><br />
                                    </form>

                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '72ch' },
                                            textAlign: "center"
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            id="outlined-productname"
                                            label="商品名稱"
                                            type="text"
                                            value={name}
                                            onChange={handleChange("name")}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Box>
                                    <br />
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '47.5%' },
                                            textAlign: "center"
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            id="outlined-select-category"
                                            select
                                            label="商品分類"
                                            value={category}
                                            onChange={handleChange("category")}
                                        >
                                            {categorySel.map((option) => (
                                                <MenuItem key={option.value} value={option.value}  >
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            id="outlined-price"
                                            label="商品價格"
                                            type="text"
                                            placeholder="$"
                                            value={price}
                                            onChange={handleChange("price")}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        {/* <TextField
                                            id="outlined-stock"
                                            label="商品數量"
                                            type="text"
                                            value={stock}
                                            onChange={handleChange("stock")}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        /> */}
                                        <br /><br />
                                    </Box>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '72ch' },
                                            textAlign: "center"
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            id="outlined-description"
                                            label="商品描述"
                                            type="text"
                                            rows={4}
                                            multiline
                                            value={description}
                                            onChange={handleChange("description")}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <br /><br />
                                    </Box>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '62ch' },
                                            textAlign: "center"
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <ExternalTable setSpecArr={setSpecArr} specArr={specArr} />
                                    </Box>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="downBtn">
                                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                <button id="cancelBtn" className="btn-secondary cancelBtn" data-bs-dismiss="modal">取消</button>
                                <button id="updateBtn" className="updateBtn" onClick={clickSubmit} data-bs-dismiss="modal">更新</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

const ProductUpdate = styled(Element)`
*{
    font-family:微軟正黑體;
}

.productInformation{
    margin: 0 auto;
    // background-color: #f163b13d;
}

.container{
    margin: 50px;
    padding: 10px;
    width: 700px;
    // background-color: #f163b13d;
    
    /*定位對齊*/
    margin: 0 auto;
}

.downBtn{
    margin: auto;
}

.updateBtn{
    font-size: 16px;
    color: white;  
    background: #f163b1;
    width: 100px;
    height: 35px;
    margin: 10px;
    margin-top: 25px;
    margin-bottom: 25px;
    border-radius: 20px;
    border: 0px;
}
.updateBtn:hover{
    background: #f163b1c0;
}
.cancelBtn{
    font-size: 16px;
    width: 100px;
    height: 35px;
    margin: 10px;
    margin-top: 25px;
    margin-bottom: 25px;
    border-radius: 20px;
    border: 0px;
}

/* 上傳圖片的按鈕 */
.uploadImg{
    padding: 7px;
    border:1px solid;
    margin-left: 15px;
}
.uploadImg:hover{
    // color: #00000085;
    color: #f163b1c0;
}
.img{
    display: none;
}
.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused{
    color:#f7bacf;
}
.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #f7bacf
}
`

export default ProductUpdate;