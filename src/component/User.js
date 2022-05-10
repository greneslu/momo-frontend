// import React from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import moment from 'moment';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { getUser, isAuthenticated, putUser, changePw } from "../auth";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const formatDate = (d) => {
    return moment(new Date(d)).format("YYYY-MM-DD")
}

const genderSel = [
    {
        value: '0',
        label: '女生',
    },
    {
        value: '1',
        label: '男生',
    }
];

const Element = ({ className }) => {
    const [gender, setGender] = useState("");
    const [user, setUser] = useState({});
    const [date, setDate] = useState(formatDate());
    const [error, setError] = useState();
    const [image, setImage] = useState("");

    const [values, setValues] = useState({
        oldPassword: '',
        password: '',
        password2: '',
        showOldPassword: false,
        showPassword: false,
        showPassword2: false,
    })
    const [showSave, setShowSave] = useState(false)
    const [showSavePassword, setShowSavePassword] = useState(false)

    const token = isAuthenticated() && isAuthenticated().accessToken

    const handleClose = (value) => {
        if (value === 0) {
            setShowSave(false);
        } else {
            setShowSavePassword(false)
        }
    };

    const handleChange = name => event => {
        if (name === "gender") {
            setGender(event.target.value)
        } else if (name === "birthday") {
            setDate(moment(new Date(event.target.value)).format("YYYY-MM-DD"))
        } else if (name === "photo") {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = function (event) {
                // 文件里的文本会在这里被打印出来
                var image = new Image() //新建一個img標籤（還沒嵌入DOM節點)
                image.src = event.target.result
                image.onload = function () {
                    var canvas = document.createElement('canvas'),
                        context = canvas.getContext('2d'),
                        imageWidth = image.width / 3,    //壓縮後圖片的大小
                        imageHeight = image.height / 3;
                    canvas.width = imageWidth;
                    canvas.height = imageHeight;
                    context.drawImage(image, 0, 0, imageWidth, imageHeight);

                    // arr1.push(canvas.toDataURL('image/jpeg'))
                    // console.log(canvas.toDataURL('image/jpeg'))
                    setImage(canvas.toDataURL('image/jpeg'))

                    const obj = {
                        ...user,
                        // birthday: date,
                        // gender: gender,
                        userphoto: canvas.toDataURL('image/jpeg')
                    }
                    putUser(obj, token)
                        .then(data => {
                            if (data) {
                                setShowSave(true)
                                console.log(data)
                                setUser(data)
                            }
                        })
                }
                // console.log(event.target.result)
                // setImage(canvas.toDataURL('image/jpeg'))
            };


            // setImage(canvas.toDataURL('image/jpeg'))
            // }
        } else {
            setValues({ ...values, [name]: event.target.value })
        }
    }

    const handleUser = name => event => {
        setUser({ ...user, [name]: event.target.value })
    }

    const handleClickShowPassword = (value) => {
        if (value === 1) {
            setValues({
                ...values,
                showOldPassword: !values.showOldPassword,
            });
        } else if (value === 2) {
            setValues({
                ...values,
                showPassword: !values.showPassword,
            });
        } else {
            setValues({
                ...values,
                showPassword2: !values.showPassword2,
            });
        }

    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (user, token) => {
        console.log(image)
        const obj = {
            ...user,
            birthday: date,
            gender: gender,
            // userphoto: image
        }
        putUser(obj, token)
            .then(data => {
                if (data) {
                    setShowSave(true)
                    setUser(data)
                }
            })
    }

    const handleSubmitPw = (token) => {
        const obj = {
            oldPassword: values.oldPassword,
            password: values.password,
            password2: values.password2
        }

        changePw(obj, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setShowSavePassword(true)
                } else {
                    setError(0)
                    setShowSavePassword(true)
                }
            })

    }

    const handleImages = (e) => {
        console.log(e.target.files)
        // setImage([...e.target.files])
    }

    useEffect(() => {
        getUser(token)
            .then(data => {
                setUser(data)
                setGender(data.gender)
                setDate(moment(data.birthday).format("YYYY-MM-DD"))
            })
    }, [])

    return (<div className={className}>
        <Paper elevation={3} sx={{ padding: "1% 5% 5% 5%" }}>
            {/* <input type="file" id="img" className="img" accept="image/*" onChange={handleImages} > */}

            <Box sx={{ textAlign: "center" }}>
                <input
                    accept="image/*"
                    // className={classes.input}   
                    id="contained-button-file"
                    hidden
                    type="file"
                    onChange={handleChange("photo")}
                />
                <label htmlFor="contained-button-file">
                    <Avatar
                        sx={{ height: '200px', width: '200px', backgroundColor: '#fff0f5', cursor: "pointer" }}
                        src={user.userphoto}
                    />
                </label>
            </Box>
            <br />
            <br />
            {/* </input> */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ backgroundColor: '#f7bacf' }}
                >
                    <Typography sx={{ color: '#fff' }}>基本資料</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                            textAlign: "center"
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        {/* <TextField
                            id="outlined-number"
                            label="姓名"
                            type="text"
                            value={user.username}
                            onChange={handleUser("username")}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /> */}
                        <TextField
                            id="outlined-select-gender"
                            select
                            label="性別"
                            value={gender}
                            onChange={handleChange("gender")}
                        >
                            {genderSel.map((option) => (
                                <MenuItem key={option.value} value={option.value}  >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-birthday"
                            label="生日"
                            type="date"
                            value={date}
                            onChange={handleChange("birthday")}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        <br />
                        <TextField
                            id="outlined-phone"
                            label="電話"
                            type="tel"
                            value={user.phone}
                            onChange={handleUser("phone")}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="outlined-addr"
                            label="地址"
                            type="text"
                            value={user.address}
                            onChange={handleUser("address")}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        <br />
                        <Button class="btn btn-pink" variant="contained" disableElevation onClick={() => handleSubmit(user, token)}>
                            儲存
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{ backgroundColor: '#f7bacf' }}
                >
                    <Typography sx={{ color: '#fff' }}>變更密碼</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                            textAlign: "center"
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <FormControl sx={{ m: 1, width: '90%', marginLeft: "5%" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-oldPassword">舊密碼</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-oldPassword"
                                type={values.showOldPassword ? 'text' : 'password'}
                                value={values.oldPassword}
                                onChange={handleChange('oldPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => handleClickShowPassword(1)}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showOldPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="oldPassword"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '90%', marginLeft: "5%" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">新密碼</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => handleClickShowPassword(2)}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '90%', marginLeft: "5%" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password2">確認新密碼</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password2"
                                type={values.showPassword2 ? 'text' : 'password'}
                                value={values.password2}
                                onChange={handleChange('password2')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => handleClickShowPassword(3)}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="password2"
                            />
                        </FormControl>
                        <Button class="btn btn-pink" variant="contained" disableElevation onClick={() => handleSubmitPw(token)}>
                            更換密碼
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={showSave}
                onClose={() => handleClose(0)}
                key="1"
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    儲存成功!
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={showSavePassword}
                onClose={() => handleClose(1)}
                key="1"
            >
                <Alert onClose={handleClose} severity={`${error === 1 || error === 2 ? "error" : "success"}`} sx={{ width: '100%' }}>
                    {error === 1 ? "原密碼輸入錯誤!" : error === 2 ? "新密碼不一致!" : "儲存成功!"}
                </Alert>
            </Snackbar>
        </Paper>
    </div >)
}

const User = styled(Element)`
.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused{
    color:#f7bacf;
}
.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #f7bacf
}

`

export default User;