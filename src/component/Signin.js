// import React from 'react';
import { useHistory } from "react-router";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Footer from './Footer';
import { signin, authenticate, googlelogin, facebooklogin, signUpWithOath } from "../auth";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Element = ({ className }) => {
    const history = useHistory();
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    })
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [errors, setErrors] = useState([]);

    const { email, password } = values

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const handleClose = () => {
        setShow(false);
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const clickSubmit = (event) => {
        setOpen(true)
        event.preventDefault()
        signin({ email, password })
            .then(data => {
                if (data.id === null) {
                    setShow(true)
                    setOpen(false)
                    setValues({ email: "", password: "" })
                } else {
                    authenticate(data)
                    history.push("/")
                }

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
                        if (user.error === 1) {
                            setErrors(user.error)
                            setShow2(true)
                        } else {
                            const email = user.email
                            signin({ email, password: uid })
                                .then(data => {
                                    authenticate(data)
                                    history.push("/")
                                })
                        }
                    })
            })
    }
    const facebook = () => {
        facebooklogin()
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
            {/* backgroundImage: "url('https://wallpaperaccess.com/full/810431.jpg')", */}
            <div style={{ margin: "0 auto", height: "600px", width: "1040px", backgroundPosition: "center center" }}>
                <div className="form container float-end mt-4">
                    <form className="row g-3 pt-4">
                        <h5 style={{ textAlign: "center" }}>登入</h5>
                        {/* <div className="mb-3">
                            <input type="text" className="form-control" value="" placeholder='請輸入帳號:Email' value={email} required onChange={handleChange("email")} />
                        </div> */}
                        <FormControl sx={{ m: 1, width: '90%', marginLeft: "5%" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput

                                id="outlined-adornment-email"
                                type='text'
                                value={values.email}
                                onChange={handleChange('email')}
                                label="Email"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '90%', marginLeft: "5%" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">密碼</InputLabel>
                            <OutlinedInput

                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
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
                        {/* <div className="mb-4">
                            <div className="form-group">
                                <div className="input-group" id="show_hide_password">
                                    <input className="form-control" type="password" placeholder='請輸入密碼' value={password} onChange={handleChange("password")} />
                                    <div className="input-group-text">
                                        <a href=""><i className="fa fa-eye-slash" aria-hidden="true"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div style={{ textAlign: "center" }}>
                            {/* <button className="btn btn-primary" onClick={clickSubmit}>登入</button> */}
                            <Button className="btn-pink hvr-push " sx={{ width: "70%" }} variant="contained" disableElevation onClick={clickSubmit}>
                                登入
                            </Button>
                        </div>
                    </form>
                    <div id="middleLine" style={{ textAlign: "center" }}>---------------- or ----------------</div>
                    <div className='pb-4' style={{ display: "flex", textAlign: "center" }}>
                        {/* <div style={{ marginRight: "20px" }}>
                            <a className="btn btn-block btn-social btn-facebook" onClick={facebook}>
                                <i className="fab fa-facebook-f" style={{ marginRight: "15px" }}></i>Facebook
                            </a>
                        </div> */}
                        <div className="google-mid">
                            <a className="btn btn-block btn-social btn-google hvr-icon-grow" onClick={google}>
                                <i className="fab fa-google hvr-icon" style={{ marginRight: "10px" }}></i>Google
                            </a>
                        </div>
                    </div>
                    <div className="signup">還是新朋友？ <a className="signupA" href="/signup">註冊</a></div>
                </div>
            </div >
            <Footer />
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={show}
                onClose={handleClose}
                key="1"
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    帳號密碼錯誤
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={show2}
                onClose={handleClose}
                key="1"
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errors === 1 ? "使用者名稱已重複" : ""}
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div >
    )
}

const Signin = styled(Element)`
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
    color: black;
    background-color: #fff;
    border-color: #f7bacf;
    margin:0 auto;
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
.btn-pink{
    background-color:#f7bacf;
}
.btn-pink:hover{
    background-color:#f7bacf;
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
.google-mid{
    margin:0 auto;
}
.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused{
    color:#f7bacf;
}
.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #f7bacf
}
`

export default Signin;