import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from 'styled-components'
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addComment } from "../product";
import { isAuthenticated } from "../auth";



const Element = ({ className, product, orderFetch }) => {
    const [open, setOpen] = useState(false);
    const [broad, setBroad] = useState("");
    const [value, setValue] = useState(0);
    const token = isAuthenticated() && isAuthenticated().accessToken;

    const handleChange = name => event => {
        setBroad(event.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clickSubmit = (event) => {
        event.preventDefault()
        addComment({ broad, star: value }, token, product)
            .then(data => {
                if (data) {
                    alert("已送出評論")
                    orderFetch()
                    setBroad("")
                    setOpen(false)
                } else {
                    alert("評論失敗")
                    setOpen(false)
                }
            })

    }

    return (
        <div className={className}>
            <Button class="btn btn-pink" variant="outlined" onClick={handleClickOpen}>
                評論
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>評論此商品</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="comment"
                        label="評論內容"
                        type="text"
                        fullWidth
                        variant="standard"
                        style={{ width: 500, borderBottomColor: "#f7bacf" }}
                        onChange={handleChange()}
                        InputLabelProps={{ style: { color: "#f7bacf"} }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color:"#f7bacf"}}>取消</Button>
                    <Button onClick={clickSubmit} sx={{ color: "#f7bacf"}}>送出</Button>
                </DialogActions>
            </Dialog>
        </div>
    );



}

const CommentDialog = styled(Element)`
.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #f7bacf
}

`
export default CommentDialog;