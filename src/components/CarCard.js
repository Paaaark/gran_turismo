import * as React from 'react';
import { useState } from 'react';
import { createTheme, styled } from '@mui/material/styles';

// MUI Components
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import styles from './comp_styles.css';

const CarCard = ( {car, flagImg, makeImg} ) => {

    return (
        <Card sx={{ width: "100%", height: "100%" }} style={{backgroundColor: '#141416'}}>
            <CardContent sx={{padding: '10px 0px 5px 10px'}}>
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Grid item xs>
                        <img height="30" src={makeImg} />
                    </Grid>
                    <Grid item xs>
                        <div className="rounded_rectangle" sx={{ align: "justify"}}>
                            <Typography sx={{fondWeight: 'bold'}} align='center'>PP {car.pp}</Typography>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
            <CardMedia component="img" image={"https://kudosprime.com/gt7/" + car.img_path}
            height="140" alt={car.name}/>
            <CardContent>
                <Typography align='center' variant="h6" color='common.white' component="div">
                    {car.name}
                </Typography>
                <Typography align='center' component="div" color='#787878'>
                    {car.cty + ' / ' + car.pw + ' HP / ' + car.weight + 
                    ' lb / ' + car.aspi}
                </Typography>
                <Divider variant="fullWidth" style={{background: '#65656b'}}/>
                <div className='card_bottom'>
                    <img className="card_flag" width="10%" src={flagImg} />
                </div>
            </CardContent>
        </Card>
    );
};

export default CarCard;