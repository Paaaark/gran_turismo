import "./styles.css";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import TopPage from './components/TopPage';

export default function App() {
  const [cars, setCars] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const [filteredCars, setFilteredCars] = useState(null);
  const [drawerState, setDrawerState] = useState(false);
  const [filters, setFilters] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    startData();
  }, []);

  useEffect(() => {
    if (filteredCars != null) {
      setFilteredCars(
        cars.filter((car) => car.name.toLowerCase().includes(searchWord.toLowerCase()))
      )
    }
  }, [searchWord]);

  useEffect(() => {
    console.log("App.js ", page);
    const start = (page - 1) * 10;
    console.log(cars);
    if (cars != null) {
      setFilteredCars(cars.slice(start, start + 10))
    }
  }, [page]);

  async function startData() {
    const myClient = await getClient();
    const temp_car = await fetchData(myClient, "5");
    const temp_filter = await fetchFilter(myClient);
    setCars(temp_car);
    setFilteredCars(temp_car);
    setFilters(temp_filter);
  }

  const searchCar = (newWord) => {
    setSearchWord(newWord);
  }

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  }

  return (
    <ThemeProvider theme={myTheme}>
      <TopPage setPage={setPage}/>
      {/* <TopAppBar searchCar={searchCar}></TopAppBar> */}
      <Chip sx={{margin: '5px 0px 5px 5px'}} color="secondary" label="Filters" onClick={toggleDrawer}/>
      <Drawer open={drawerState} onClose={toggleDrawer}>
        <DrawerList filters={filters} />
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
