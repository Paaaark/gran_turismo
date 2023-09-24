import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import '../styles.css';

const TopPage = ({setPage, theme, setPerPage}) => {
    const [state, setState] = useState(1);
    const [curPage, setCurPage] = useState(10);
    console.log("Version 4");

    const handleChange = (event, value) => {
        setPage(value);
        setState(value);
    };

    const handleSelect = (event) => {
        setCurPage(event.target.value);
        setPerPage(event.target.value);
        console.log("Perpage: ", curPage);
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Pagination count={10} page={state} onChange={handleChange}
            sx={{flex: 'initial', margin: '5px', button:{color: '#ffffff'}}} color='primary'
            hidePrevButton hideNextButton/>
            <Box sx={{position:'absolute', right: '0', flex: 'initial'}}>
                <FormControl>
                    <InputLabel id='cars_per_page'>My Label</InputLabel>
                    <Select sx={{color:"#ffffff", margin: '5px'}} labelId='cars_per_page_label'
                      id='cars_per_page' value={curPage} label="perPage"
                      onChange={handleSelect}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}

export default TopPage;