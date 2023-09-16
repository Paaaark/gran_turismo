import React from 'react';
import CarCard from './CarCard';
import Grid from '@mui/material/Grid';

const MainFragment = ({ cars }) => {
    console.log(cars);
    console.log(typeof(cars));
    return (
        <Grid container spacing={1}>
            {cars != null ? cars.map((car) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CarCard car={car} />
                </Grid>
            )) : (<div />)}
        </Grid>
    )
}

export default MainFragment;