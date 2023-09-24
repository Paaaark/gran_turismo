import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const DrawerList = ({filters}) => {
    console.log("Received filter: ", filters);
    console.log("Updated 2");
    return (
        <Box sx={{width: 250}} role="presentation">
            <List>
                {filters != null ? filters.map((filter) => (
                    <div key={filter.property}>
                        <ListItem key={"title"} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={filter.property} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={"count"}>
                            <FormGroup>
                                {
                                    Object.keys(filter.count).map((key) => (
                                        <FormControlLabel 
                                        key={key}
                                        control={<Checkbox />}
                                        label={key + " (" + filter.count[key]['N'] + ")"} />
                                    ))
                                }
                            </FormGroup>
                        </ListItem>
                    </div>
                )) : 
                    (<ListItem key={"not_loaded"} disablePadding>
                        <ListItemText primary={"Filters are not loaded yet"} />
                    </ListItem>)
                }
            </List>
        </Box>
    )
}

export default DrawerList;