// import React from 'react';
import { useHistory } from "react-router";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Footer from './Footer';
import { signup } from "../auth";
import { signin, authenticate, googlelogin, facebooklogin, signUpWithOath } from "../auth";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Element = ({ className }) => {
    const [show, setShow] = useState(false)
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const [message, setMessage] = useState({})
    const [values, setValues] = useState({
        email: '',
        username: '',
        password: '',
        showPassword: false,
    })

    const google = () => {
        let uid = ""
        googlelogin()
            .then(data => {
                uid = data.uid
                let oathRequest = {
                    "email": data.email,
                    "uid": uid,
                    "displayName": data.displayName,
                    "photoURL": data.photoURL
                }
                signUpWithOath(oathRequest)
                    .then(user => {
                        const email = user.email
                        signin({ email, password: uid })
                            .then(data => {
                                authenticate(data)
                                history.push("/")
                            })
                    })
            })
    }
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const { email, password, username } = values

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const handleClose = () => {
        setShow(false);
    };
    const clickSubmit = (event) => {
        event.preventDefault()
        signup({ email, password, username })
            .then(data => {
                console.log(data)
                if (data.error) {
                    setShow(true)
                    setMessage({ string: "已有重複email。", status: "error" })
                } else {
                    setShow(true)
                    setMessage({ string: "註冊成功，請至信箱收信驗證。", status: "success" })
                    setValues({
                        email: '',
                        username: '',
                        password: '',
                    })
                    // history.push("/signin")
                }
                setValues({})
                // if (data.error) {
                //     setValues({ ...values, error: data.error, success: false })
                // } else {
                //     setValues({
                //         ...values,
                //         name: "",
                //         email: "",
                //         password: "",
                //         error: "",
                //         success: true
                //     })
                // }
            })
    }
    return (
        <div className={className} style={{ backgroundColor: "#f7bacf", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundImage: "url('https://img.onl/JJ3y1J')" }}>
            <AppBar className="mb-5" position="static" style={{ backgroundColor: "#fff" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h3"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: "#f7bacf" }}
                        >
                            <a href="/" style={{ color: "#f7bacf", textDecoration: "none" }}>哞哞購物</a>
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <div style={{ margin: "0 auto", height: "600px", width: "1040px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
                <div className="form container float-end mt-4">
                    <form className="row g-3 pt-4">
                        <h5 className="mid-h5">註冊</h5>
                        {/* <div className="mb-3">
                            <input type="text" className="form-control" value={email} placeholder='請輸入帳號:Email' required onChange={handleChange("email")} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" value={username} placeholder='請輸入使用者名稱' required onChange={handleChange("username")} />
                        </div>
                        <div className="mb-3">
                            <div className="form-group">
                                <div className="input-group" id="show_hide_password">
                                    <input className="form-control" type="password" placeholder='請輸入密碼' value={password} onChange={handleChange("password")} /> */}
                        {/* <div className="input-group-text">
                                        <a href=""><i className="fa fa-eye-slash" aria-hidden="true"></i></a>
                                    </div> */}
                        {/* </div>
                            </div>
                        </div> */}

                        <FormControl sx={{ m: 1, width: '90%', marginLeft: "5%" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput

                                id="outlined-adornment-email"
                                type='text'
                                value={email}
                                onChange={handleChange('email')}
                                label="Email"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '90%', marginLeft: "5%" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">使用者名稱</InputLabel>
                            <OutlinedInput

                                id="outlined-adornment-email"
                                type='text'
                                value={username}
                                onChange={handleChange("username")}
                                label="使用者名稱"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '90%', marginLeft: "5%" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">密碼</InputLabel>
                            <OutlinedInput

                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handleChange("password")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="密碼"
                            />
                        </FormControl>
                        {/* <div className="d-grid gap-2 col-12 mx-auto loginBtn pb-5">
                            <button className="btn btn-primary btn-pink" onClick={clickSubmit}>註冊</button>
                        </div> */}
                        <div style={{ textAlign: "center" }}>
                            {/* <button className="btn btn-primary" onClick={clickSubmit}>登入</button> */}
                            <Button className="btn-pink hvr-pulse" sx={{ width: "70%", textAlign: "center" }} variant="contained" disableElevation onClick={clickSubmit}>
                                註冊
                            </Button>
                        </div>

                        <div id="middleLine" style={{ textAlign: "center" }}>---------------- or ----------------</div>
                        <div className="google-mid" style={{ textAlign: "center" }}>
                            <a className="btn btn-block btn-social btn-google hvr-icon-grow" onClick={google}>
                                <i className="fab fa-google hvr-icon" style={{ marginRight: "10px" }}></i>Google
                            </a>
                        </div>
                        <div className="signup">已有帳號？ <a className="signupA" href="/signin">登入</a></div>
                    </form>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={show}
                onClose={handleClose}
                key="1"
            >
                <Alert onClose={handleClose} severity={message.status} sx={{ width: '100%' }}>
                    {message.string}
                </Alert>
            </Snackbar>
            <Footer />
        </div>
    )
}

const Signup = styled(Element)`
.mid-h5{
    text-align:center;
}
.navbar1{
    background-color:rgb(248, 209, 215);
}
.brandImg{
    width:40px;height:35px;
}
.form{
    background-color: #fff;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: 0 3px 10px 0 rgb(0 0 0 / 14%);
    border-radius: 0.25rem;
    overflow: hidden;
    width: 26.25rem;
}
#middleLine{
    margin: 10px 0;
    padding: 10px 0;
    color: #a3a2a3;
    font-family: monospace;
}
.btn-facebook {
    color: #fff;
    background-color: #3b5998;
    border-color: rgba(0,0,0,0.2);
}
.btn-social {
    position: relative;
    padding-left: 15px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.btn-google {
    color: #fff;
    background-color: #dd4b39;
    border-color: rgba(0,0,0,0.2);
    margin:0 auto;
}
.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused{
    color:#f7bacf;
}
.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #f7bacf
}
.btn-social {
    position: relative;
    padding-left: 15px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.btn-google {
    color: black;
    background-color: #fff;
    border-color: #f7bacf;
}
.fa-google {
    background: 
    linear-gradient(to bottom left,transparent 49%,#fbbc05 50%) 0 25%/48% 40%,
    linear-gradient(to top    left,transparent 49%,#fbbc05 50%) 0 75%/48% 40%,
  
    linear-gradient(-40deg ,transparent 53%,#ea4335 54%),
    linear-gradient( 45deg ,transparent 46%,#4285f4 48%),
    #34a853;
    background-repeat:no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
}
.btn-pink{
    background-color:#f7bacf;
}
.btn-pink:hover{
    background-color:#f7bacf;
}
.google-mid{
    display:inline-block;
    margin:0 auto 20px;
}
.signup{
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;
    padding-bottom : 10%;
}
.signupA{
    color: #f7bacf;
    text-decoration: none;
}
`

export default Signup;