import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled, alpha, createTheme } from '@mui/material/styles';
import { useHistory } from "react-router";
import styledComponents from 'styled-components'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FormControl from '@mui/material/FormControl';
import Badge from '@mui/material/Badge';
// import Link from '@mui/material/Link';
import ChatIcon from '@mui/icons-material/Chat';
import { isAuthenticated, signout, getUser } from "../auth";
import { itemTotal } from './cartHelpers'
import Cart from './Cart'
import Category from './Category'


const authentication = [
    { id: "1", title: "登入", path: "/signin" },
    { id: "2", title: "註冊", path: "/signup" },
];
const settings = [
    { id: "1", title: "會員中心", path: "/memberCenter" },
    { id: "2", title: "登出", path: "/" },
];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha("#af4448", 0.15),
    '&:hover': {
        backgroundColor: alpha("#af4448", 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper} `,
        padding: '0 4px',
    },
}));

const Element = ({ className }) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user, setUser] = useState({})
    const [itemCount, setItemCount] = useState(0)
    const history = useHistory();
    const [keyword, setKeyword] = useState("");

    const token = isAuthenticated() && isAuthenticated().accessToken

    const handleKeyword = name => event => {
        setKeyword(event.target.value)

    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (id) => {
        if (id === "2") {
            signout();
        }
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    useEffect(() => {
        getUser(token)
            .then(data => {
                setUser(data)
            })
        setItemCount(itemTotal())
        var input = document.getElementById("search");
        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                // Cancel the default action, if needed
                // console.log(history.location.pathname)
                if (history.location.pathname === "/") {
                    history.push({
                        pathname: `/products`,
                        state: {
                            keyword: event.target.value
                        }
                    })
                } else {
                    history.push({
                        pathname: `/products`,
                        state: {
                            keyword: event.target.value
                        }
                    })
                }

            }
        });
    }, []);

    return (
        <div className={className}>
            <AppBar className="mb-5" position="static" style={{ backgroundColor: "#f7bacf" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <a className="navbar-brand logo" href="/">
                                <img src="https://img.onl/5hFHw" alt="" width={120} height={90} />
                            </a>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            {/* <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu> */}
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            <a className="navbar-brand" href="/">
                                <img src="https://img.onl/5hFHw" alt="" width={40} height={35} />
                            </a>
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <FormControl>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        id="search"
                                        inputProps={{
                                            'aria-label': 'search',
                                            "value": keyword,
                                        }}
                                        onChange={handleKeyword()}
                                    // onClick={handleSubmit}
                                    />
                                </Search>
                            </FormControl>
                        </Box>
                        {!isAuthenticated() ?
                            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                                {authentication.map((item) => (
                                    <Button
                                        key={item.id}
                                        className='nav-item2 hvr-buzz-out '
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: '#af4448', display: 'block', borderRadius: '10px', textAlign: 'center' }}
                                        href={item.path}
                                    >
                                        {item.title}
                                    </Button>
                                ))}
                            </Box> : <>
                                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                                    {/* <IconButton size="large" aria-label="show 4 new mails">

                                        <Badge badgeContent={4} color="error">
                                            <ChatIcon />
                                        </Badge>
                                    </IconButton> */}
                                    {/* <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                    >
                                        <Badge badgeContent={17} color="error">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton> */}
                                    {/* <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        // aria-controls={menuId}
                                        aria-haspopup="true"
                                        // onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton> */}
                                </Box>

                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src={user.userphoto} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map(item => (
                                            <MenuItem sx={{ '&:hover': { color: '#f7bacf' } }} component={Link} to={item.path} key={item.id} onClick={() => handleCloseNavMenu(item.id)}>
                                                {/* <Typography textAlign="center">{setting}</Typography> */}
                                                {/* <Link href={item.path} underline="none"> */}
                                                {item.title}
                                                {/* </Link> */}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            </>}
                        <Box>
                            <IconButton aria-label="cart" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <StyledBadge badgeContent={itemCount} color="secondary">
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                            {/* <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                // aria-controls={menuId}
                                aria-haspopup="true"
                                // onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton> */}
                        </Box>
                    </Toolbar>
                </Container>
                <Category />
            </AppBar>
            <Cart setItemCount={setItemCount} />
        </div >
    );
};

const Header = styledComponents(Element)`
.navbar-brand{
    color:#000
}
.logo{
    margin:0 auto;
}
.nav-item2:hover{
    background-color: rgba(245, 227, 236, 0.4);
    color:#af4448;
    
}
`
export default Header;

// // import React from 'react';
// import React, { useEffect, useState } from 'react';
// import styledComponents from 'styled-components'

// import { itemTotal } from './cartHelpers'
// import Cart from './Cart'
// import { isAuthenticated, signout } from "../auth";

// import Badge from '@mui/material/Badge';
// import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// const StyledBadge = styled(Badge)(({ theme }) => ({
//     '& .MuiBadge-badge': {
//         right: -3,
//         top: 13,
//         border: `2px solid ${ theme.palette.background.paper } `,
//         padding: '0 4px',
//     },
// }));

// const Element = ({ className }) => {
//     const [itemCount, setItemCount] = useState(0)

//     useEffect(() => {
//         setItemCount(itemTotal())
//     }, []);
//     return (
//         <div className={className}>
//             <nav className="navbar fixed-top navbar-expand-lg navbar-collapse navbar-light justify-content-end navbar1">
//                 <div className="container-fluid">
//                     <a className="navbar-brand" href="/">
//                         <img src="https://cdn-icons-png.flaticon.com/512/220/220127.png" alt="" className="brandImg" />哞哞購物</a>
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             {/* <a className="nav-link" href="#">推薦</a> */}
//                         </li>
//                     </ul>
//                     <div className="ml-auto mr-1" id="navbarSupportedContent">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             {!isAuthenticated() ? <>
//                                 <li className="nav-item">
//                                     <a className="nav-link" href="/signin">登入</a>
//                                 </li>
//                                 <li className="nav-item">
//                                     <a className="nav-link" href="/signup">註冊</a>
//                                 </li>
//                             </> : null}
//                             {isAuthenticated() ?
//                                 <li className="nav-item">
//                                     <a className="nav-link" href="/" onClick={signout}>登出</a>
//                                 </li> : null}
//                             {isAuthenticated() ? <>
//                                 <li className="nav-item">
//                                     <a className="nav-link" href="/memberCenter">
//                                         會員中心
//                                     </a>
//                                     {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//                                     <li><a className="dropdown-item" href="#">訂單管理</a></li>
//                                     <li><a className="dropdown-item" href="#">追蹤清單</a></li>
//                                     <li>
//                                         <hr className="dropdown-divider" />
//                                     </li>
//                                     <li><a className="dropdown-item" href="#">登出</a></li>
//                                 </ul> */}
//                                 </li>
//                             </> : null}
//                             <li>
//                                 {/* <a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
//                                     <svg style={{ marginRight: '5px' }} width="18px" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
//                                     Cart
//                                     ({itemCount})
//                                 </a> */}
//                                 {/* <Cart itemCount={itemCount} /> */}
//                                 <IconButton aria-label="cart" data-bs-toggle="modal" data-bs-target="#exampleModal">
//                                     <StyledBadge badgeContent={itemCount} color="secondary">
//                                         <ShoppingCartIcon />
//                                     </StyledBadge>
//                                 </IconButton>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//             <Cart />
//         </div >

//     )
// }

// const Header = styledComponents(Element)`
// .navbar1{
//     background-color:rgb(248, 209, 215);
// }
// .brandImg{
//     width:40px;height:35px;
// }
// .login{
//     width:100px
// }
// .search{
//     margin:20px auto;
//     width:30%;
// }
// .pinkBtn{
//     border:solid 2px pink;
//     color:pink;
//     white-space: nowrap;
// }
// `

// export default Header;