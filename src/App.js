import "./styles.css";
import TopAppBar from './components/TopAppBar';
import CarCard from './components/CarCard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function App() {

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <TopAppBar></TopAppBar>
      <Grid>
        <Typography>Card Grid</Typography>
        <CarCard car={{name: 'Alfa Romeo 4C Gr.4', brand: 'Alfa Romeo', pp: 610.55, country: 'Italy',
                      power: 295, weight: 2249, aspiration: 'TB', car_layout: 'MR'}}>

        </CarCard>
      </Grid>
    </ThemeProvider>
  );
}
