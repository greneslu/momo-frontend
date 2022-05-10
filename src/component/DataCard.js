import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function DataCard(props) {
    const { title, data, type } = props
    const [total, setTotal] = useState(0)
    useEffect(() => {
        if (type === "1") {
            let total = 0
            data.forEach(item => {
                total += item.prtotal
            })
            setTotal(total)
        } else if (type === "2") {
            setTotal(data.length)
        } else {
            let total = 0
            data.forEach(item => {
                total += item.prtotal
            })
            setTotal((total / data.length).toFixed(0))
        }
    }, [])
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
            }}
        >
            {/* <title>Recent Deposits</title> */}
            <Typography component="p" variant="h5">
                {title}
            </Typography>
            <Typography component="p" variant="h5">
                {type === "1" ? `$${total}` : type === "2" ? total : `$${total}`}
            </Typography>
            <br />
            <br />
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Vs 上個月: 37%
                <span style={{ color: "green" }}>
                    <i class="fas fa-arrow-up"></i>
                </span>
            </Typography>
        </Paper>
    );
}