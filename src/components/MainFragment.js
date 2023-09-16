import React from 'react';
import CarCard from './CarCard';
import Grid from '@mui/material/Grid';

const MainFragment = ({ cars }) => {
    console.log(cars);
    console.log(typeof(cars));
    return (
        <Grid container>
            {cars != null ? cars.map((car) => {
                <Grid item>
                    <CarCard car={car} />
                </Grid>
            }) : null}
        </Grid>
    )
}

export default MainFragment;