import "./styles.css";
import { useState, useEffect } from 'react';
// Import mui components
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';

import { getClient, fetchData, fetchFilter } from './AWS';
import myTheme from "./myTheme";
import {findSubtotals} from './backend';
import styles from './styles.css';

// Import custom components
import TopAppBar from './components/TopAppBar';
import MainFragment from './components/MainFragment';
import DrawerList from './components/DrawerList';

export default function App() {
  const [cars, setCars] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const [filteredCars, setFilteredCars] = useState(null);
  const [drawerState, setDrawerState] = useState(false);
  const [filters, setFilters] = useState(null);
  useEffect(() => {
    startData();
  }, []);

  useEffect(() => {
    setFilters(findSubtotals(cars));
  }, [cars]);

  useEffect(() => {
    if (filteredCars != null) {
      setFilteredCars(
        cars.filter((car) => car.name.toLowerCase().includes(searchWord.toLowerCase()))
      )
    }
  }, [searchWord])

  async function startData() {
    const myClient = await getClient();
    const temp_car = await fetchData(myClient, "5");
    const temp_filter = await fetchFilter(myClient);
    setCars(temp_car);
    setFilteredCars(temp_car);
  }

  const searchCar = (newWord) => {
    setSearchWord(newWord);
  }

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  }

  return (
    <ThemeProvider theme={myTheme}>
      <TopAppBar searchCar={searchCar}></TopAppBar>
      <Chip color="secondary" label="Filters" className="chip" onClick={toggleDrawer}/>
      <Drawer open={drawerState} onClose={toggleDrawer}>
        <DrawerList />
      </Drawer>
      <Grid>
        <MainFragment cars={filteredCars} searchWord={searchWord}/>
        {/* <CarCard car={{name: 'Alfa Romeo 4C Gr.4', brand: 'Alfa Romeo', pp: 610.55, country: 'Italy',
                      power: 295, weight: 2249, aspiration: 'TB', car_layout: 'MR'}}>

        </CarCard> */}
      </Grid>
    </ThemeProvider>
  );
}
