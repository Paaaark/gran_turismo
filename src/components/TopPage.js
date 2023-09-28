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

const TopPage = ({setPage, theme, setPerPage, total}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [curPerPage, setCurPerPage] = useState(10);

    const handleChange = (event, value) => {
        setPage(value);
        setCurrentPage(value);
    };

    const handleSelect = (event) => {
        setCurPerPage(event.target.value);
        setPerPage(event.target.value);
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Pagination count={Math.ceil(total / curPerPage)} page={currentPage} onChange={handleChange}
            sx={{flex: 'initial', margin: '5px', button:{color: '#ffffff'}}} color='primary'
            hidePrevButton hideNextButton/>
            <Box sx={{position:'absolute', right: '0', flex: 'initial'}}>
                <FormControl>
                    <InputLabel id='cars_per_page'>My Label</InputLabel>
                    <Select sx={{color:"#ffffff", margin: '5px'}} labelId='cars_per_page_label'
                      id='cars_per_page' value={curPerPage} label="perPage"
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