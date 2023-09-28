import React from 'react';
import CarCard from './CarCard';
import Grid from '@mui/material/Grid';

const matchingFlag = (car, smallImgUrls) => {
    if (smallImgUrls == null || car == null) return null;

    if (smallImgUrls[car.country + '.jpg'] != null) {
        return smallImgUrls[car.country + '.jpg'];
    }
    return smallImgUrls['Gran Turismo.jpg']
}

const matchingMake = (car, smallImgUrls) => {
    if (smallImgUrls == null || car == null) return null;

    if (smallImgUrls[car.make + '.jpg'] != null) {
        return smallImgUrls[car.make + '.jpg'];
    }
    return smallImgUrls['Gran Turismo.jpg']
}

const MainFragment = ({ cars, smallImgUrls }) => {
    return (
        <Grid container spacing={1}>
            {cars != null ? cars.map((car) => (
                <Grid key={car.name} item xs={12} sm={6} md={4} lg={3}>
                    <CarCard car={car} flagImg={matchingFlag(car, smallImgUrls)}
                      makeImg={matchingMake(car, smallImgUrls)} />
                </Grid>
            )) : (<div />)}
        </Grid>
    )
}

export default MainFragment;