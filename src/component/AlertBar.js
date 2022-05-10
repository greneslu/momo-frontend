// import React from 'react';
import React, { useEffect, useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertBar = ({ open, status, message }) => {
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        setShow(open)
    }, [])
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={show}
            onClose={handleClose}
            key="1"
        >
            <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}
export default AlertBar;