import "./styles.css";
import { useState, useEffect } from 'react';
import TopAppBar from './components/TopAppBar';
import MainFragment from './components/MainFragment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getClient, fetchData } from './AWS';

export default function App() {
  const [cars, setCars] = useState(null);

  useEffect(() => {
    startData();
  }, []);

  async function startData() {
    const myClient = getClient();
    const temp = await fetchData(myClient, "5");
    setCars(temp);
  }

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <TopAppBar></TopAppBar>
      <Grid>
        <Typography>Card Grid</Typography>
        <MainFragment cars={cars} />
        {/* <CarCard car={{name: 'Alfa Romeo 4C Gr.4', brand: 'Alfa Romeo', pp: 610.55, country: 'Italy',
                      power: 295, weight: 2249, aspiration: 'TB', car_layout: 'MR'}}>

        </CarCard> */}
      </Grid>
    </ThemeProvider>
  );
}
