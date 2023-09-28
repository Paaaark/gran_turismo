import React from 'react';
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const FilterChips = ({checkedFilters, handleDelete}) => {

    return (
        <Stack sx={{marginLeft: '4px'}} direction="row" spacing={1} flexWrap='wrap'>
            {
                checkedFilters != null ?
                  Object.entries(checkedFilters).filter(([key, value]) => value === true)
                  .map(([key, value]) => 
                    <Chip label={key} id={key} key={key} variant="outlined" color="secondary" size="small" 
                     onDelete={() => handleDelete(key)}/>
                  ) :
                  ''
            }
        </Stack>        
    )
}

export default FilterChips;

