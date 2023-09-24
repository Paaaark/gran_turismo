import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const TopPage = ({setPage}) => {
    const [state, setState] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        setState(value);
        console.log("TopPage.js ", state);
    };

    return (
        <Pagination count={10} page={state} onChange={handleChange} color="secondary"/>
    );
}

export default TopPage;