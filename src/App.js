import "./styles.css";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Import mui components
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';

import { getClient, fetchImages, fetchData, fetchFilter } from './AWS';
import myTheme from "./myTheme";
import {findSubtotals} from './backend';
import './styles.css';

// Import custom components
import TopAppBar from './components/TopAppBar';
import MainFragment from './components/MainFragment';
import DrawerList from './components/DrawerList';
import TopPage from './components/TopPage';
import FilterChips from './components/FilterChips';

export default function App() {
  const [cars, setCars] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const [filteredCars, setFilteredCars] = useState(null);
  const [drawerState, setDrawerState] = useState(false);
  const [filters, setFilters] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [smallImgUrls, setSmallImgUrls] = useState(null);
  const [checkedFilters, setCheckedFilters] = useState(null);

  useEffect(() => {
    startData();
    fetchImageHelper();
  }, []);

  useEffect(() => {
    if (filteredCars != null) {
      setFilteredCars(
        cars.filter((car) => car.name.toLowerCase().includes(searchWord.toLowerCase()))
      )
    }
  }, [searchWord]);

  useEffect(() => {
    if (cars != null) {
      setFilteredCars(sliceData(cars));
    }
  }, [page, perPage, cars]);

  useEffect(() => {
    if (filters != null) {
      let tempDict = {};
      for (let i = 0; i < filters.length; i++) {
        Object.keys(filters[i]['count']).forEach((key) => (
          tempDict[filters[i]['property'] + ':' + key] = false
        ))
      }
      setCheckedFilters(tempDict);
      console.log(tempDict);
    }
  }, [filters])

  async function startData() {
    const myClient = await getClient();
    const temp_car = await fetchData(myClient, "100");
    const temp_filter = await fetchFilter(myClient);
    setCars(temp_car);
    setFilteredCars(temp_car);
    setFilters(temp_filter);
  }

  async function fetchImageHelper() {
    const tempHolder = await fetchImages();
    setSmallImgUrls(tempHolder);
  }

  const searchCar = (newWord) => {
    setSearchWord(newWord);
  }

  const sliceData = (data) => {
    if (data != null) {
      const start = (page - 1) * perPage;
      return data.slice(start, start + perPage);
    }
    return null;
  }

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  }

  const onCheckFilter = (targetKey, status) => {
    if (filters == null) return;
    setCheckedFilters({
      ...checkedFilters,
      [targetKey]: status
    });
  }

  const handleChipDelete = (targetKey) => {
    console.log("Deleted: ", targetKey);
    setCheckedFilters({
      ...checkedFilters,
      [targetKey]: false
    });
  }

  return (
    <ThemeProvider theme={myTheme}>
      <TopPage setPage={setPage} setPerPage={setPerPage} theme={myTheme} 
        total={cars != null ? cars.length : 100}/>
      {/* <TopAppBar searchCar={searchCar}></TopAppBar> */}
      <Chip sx={{margin: '5px 0px 5px 5px'}} color="secondary" label="Filters" onClick={toggleDrawer}/>
      <FilterChips checkedFilters={checkedFilters} handleDelete={handleChipDelete} />
      <Drawer open={drawerState} onClose={toggleDrawer}>
        <DrawerList filters={filters} checkedFilters={checkedFilters} onCheckFilter={onCheckFilter}/>
      </Drawer>
      <Grid>
        <MainFragment cars={filteredCars} searchWord={searchWord} smallImgUrls={smallImgUrls} />
        {/* <CarCard car={{name: 'Alfa Romeo 4C Gr.4', brand: 'Alfa Romeo', pp: 610.55, country: 'Italy',
                      power: 295, weight: 2249, aspiration: 'TB', car_layout: 'MR'}}>

        </CarCard> */}
      </Grid>
    </ThemeProvider>
  );
}
