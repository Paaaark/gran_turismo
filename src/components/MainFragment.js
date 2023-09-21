import React from 'react';
import CarCard from './CarCard';
import Grid from '@mui/material/Grid';

const MainFragment = ({ cars }) => {

    return (
        <Grid container spacing={1}>
            {cars != null ? cars.map((car) => (
                <Grid key={car.name} item xs={12} sm={6} md={4} lg={3}>
                    <CarCard car={car} />
                </Grid>
            )) : (<div />)}
        </Grid>
    )
}

export default MainFragment;