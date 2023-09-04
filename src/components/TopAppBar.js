import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

const TopAppBar = () => {
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="sticky">
                <Typography variant="h6" component="div">
                    Gran Turismo
                </Typography>
            </AppBar>
        </Box>
    )
};

export default TopAppBar;