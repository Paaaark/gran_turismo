import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const TopPage = ({setPage, theme}) => {
    const [state, setState] = useState(1);
    console.log("Version 4");

    const handleChange = (event, value) => {
        setPage(value);
        setState(value);
        console.log("TopPage.js ", state);
    };

    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Pagination count={10} page={state} onChange={handleChange}
            sx={{flex: 'initial', margin: '0px', button:{color: '#ffffff'}}} color='primary'
            hidePrevButton hideNextButton/>
        </Box>
    );
}

export default TopPage;