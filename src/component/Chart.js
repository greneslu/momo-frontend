import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00', undefined),
];

export default function Chart() {
    const theme = useTheme();

    return (
        <Grid item xs={12} md={8} lg={9}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
            >
                <title>Today</title>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{
                            top: 16,
                            right: 16,
                            bottom: 0,
                            left: 24,
                        }}
                    >
                        <XAxis
                            dataKey="time"
                            stroke={theme.palette.text.secondary}
                            style={theme.typography.body2}
                        />
                        <YAxis
                            stroke={theme.palette.text.secondary}
                            style={theme.typography.body2}
                        >
                            <Label
                                angle={270}
                                position="left"
                                style={{
                                    textAnchor: 'middle',
                                    fill: theme.palette.text.primary,
                                    ...theme.typography.body1,
                                }}
                            >
                                Sales ($)
                            </Label>
                        </YAxis>
                        <Line
                            isAnimationActive={false}
                            type="monotone"
                            dataKey="amount"
                            stroke={theme.palette.primary.main}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Paper>
        </Grid>
    );
}