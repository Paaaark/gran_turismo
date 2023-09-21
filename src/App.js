import "./styles.css";
import { useState, useEffect } from 'react';
import TopAppBar from './components/TopAppBar';
import MainFragment from './components/MainFragment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import { getClient, fetchData } from './AWS';
import styles from './styles.css';

export default function App() {
  const [cars, setCars] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const [filteredCars, setFilteredCars] = useState(null);
  const [drawerState, setDrawerState] = useState(false);

  const defaultTheme = createTheme();

  useEffect(() => {
    startData();
  }, []);

  useEffect(() => {
    if (filteredCars != null) {
      setFilteredCars(
        cars.filter((car) => car.name.toLowerCase().includes(searchWord.toLowerCase()))
      )
    }
  }, [searchWord])

  async function startData() {
    const myClient = await getClient();
    const temp = await fetchData(myClient, "5");
    setCars(temp);
    setFilteredCars(temp);
  }

  const searchCar = (newWord) => {
    setSearchWord(newWord);
  }

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <TopAppBar searchCar={searchCar}></TopAppBar>
      <Chip className="chip" label="Filters" variant="outlined" onClick={toggleDrawer}/>
      <Drawer open={drawerState} onClose={toggleDrawer} />
      <Grid>
        <MainFragment cars={filteredCars} searchWord={searchWord}/>
        {/* <CarCard car={{name: 'Alfa Romeo 4C Gr.4', brand: 'Alfa Romeo', pp: 610.55, country: 'Italy',
                      power: 295, weight: 2249, aspiration: 'TB', car_layout: 'MR'}}>

        </CarCard> */}
      </Grid>
    </ThemeProvider>
  );
}
