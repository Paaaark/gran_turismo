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

const DrawerList = ({filters, checkedFilters, onCheckFilter}) => {
    const [checkedFiltersState, setCheckedFiltersState] = useState(checkedFilters);
    const getObjectKeys = (target) => {
        let array = Object.keys(target);
        array = array.sort((a, b) => parseInt(target[b]['N']) - parseInt(target[a]['N']));
        return array;
    }

    const handleChange = (event) => {
        onCheckFilter(event.target.name, event.target.checked);
        setCheckedFiltersState({
            ...checkedFiltersState,
            [event.target.name]: event.target.checked
        });
        console.log(checkedFilters[event.target.name]);
    }

    const abrvToFull = {
        'aspi': 'Aspiration',
        'car_tags': 'Car Tag',
        'cty': 'Class',
        'tr': 'Setup',
        'car_sources': 'Car Source',
        'make': 'Make',
        'country': 'Country'
    };

    return (
        <Box sx={{width: 250}} role="presentation">
            <List>
                {filters != null ? filters.map((filter) => (
                    <div key={filter.property}>
                        <ListItem key={"title"} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={abrvToFull[filter.property]} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={"count"}>
                            <FormGroup>
                                {
                                    getObjectKeys(filter.count).map((key) => (
                                        <FormControlLabel 
                                        key={key}
                                        control={
                                            <Checkbox onChange={handleChange}
                                              checked={checkedFiltersState[filter.property + ':' + key]}
                                              name={filter.property + ':' + key}/>
                                        }
                                        label={key + " (" + filter.count[key]['N'] + ")"}/>
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