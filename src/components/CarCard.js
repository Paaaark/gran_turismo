import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import styles from './comp_styles.css';

const CarCard = ( param ) => {
    const [car, setCar] = useState(param.car);
    console.log("My car is: ", car.name)
    return (
        <Card sx={{ width: "100%" }} style={{backgroundColor: '#141416'}}>
            <CardContent>
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Grid item xs>
                        <img width="10%" height="10%" src="https://i.ibb.co/b1bv9zk/alfa-romeo.jpg" />
                    </Grid>
                    <Grid item xs>
                        <div className="rounded_rectangle">
                            <Typography style={{fondWeight: 100}} align='center'>PP {car.pp}</Typography>
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
                    <img className="card_flag" width="10%" src="https://i.ibb.co/zS4MVFS/istockphoto-585788002-170667a.jpg" />
                </div>
            </CardContent>
        </Card>
    );
};

export default CarCard;