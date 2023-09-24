import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';

const TopAppBar = ({searchCar}) => {
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="sticky" color="primary" sx={{minHeight: '24px'}}>
                <div style={{ display: "flex", alignItems: "center"}} >
                    <InputBase placeholder="Search..." 
                    sx={{ input: { color : "white" }, placeholder: { padding: 0 }}}
                    onChange={(event) => searchCar(event.target.value)}
                    />
                </div>
            </AppBar>
        </Box>
    )
};

export default TopAppBar;