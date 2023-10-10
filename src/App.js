import "./styles.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Import mui components
import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";

import { getClient, fetchImages, fetchData, fetchFilter } from "./AWS";
import myTheme from "./myTheme";
import { findSubtotals, sliceData } from "./backend";
import "./styles.css";

// Import custom components
import TopAppBar from "./components/TopAppBar";
import MainFragment from "./components/MainFragment";
import DrawerList from "./components/DrawerList";
import TopPage from "./components/TopPage";
import FilterChips from "./components/FilterChips";

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
        cars.filter((car) =>
          car.name.toLowerCase().includes(searchWord.toLowerCase()),
        ),
      );
    }
  }, [searchWord]);

  // useEffect(() => {
  //   if (filteredCars != null) {
  //     setFilteredCars(sliceData(filteredCars));
  //   } else if (cars != null) {
  //     setFilteredCars(sliceData(cars));
  //   }
  // }, [page, perPage, cars]);

  useEffect(() => {
    if (filters != null) {
      let tempDict = {};
      for (let i = 0; i < filters.length; i++) {
        Object.keys(filters[i]["count"]).forEach(
          (key) => (tempDict[filters[i]["property"] + ":" + key] = false),
        );
      }
      setCheckedFilters(tempDict);
      console.log(tempDict);
    }
  }, [filters]);

  useEffect(() => {
    if (checkedFilters != null) {
      // Check if any filter is activated
      let conditions = {};
      let flag = false;
      Object.keys(checkedFilters).forEach((key) => {
        flag = flag || checkedFilters[key];
        if (checkedFilters[key] === true) {
          const keyValue = key.split(":");
          if (conditions[keyValue[0]] == null) {
            conditions[keyValue[0]] = [];
            conditions[keyValue[0]].push(keyValue[1]);
          } else {
            conditions[keyValue[0]].push(keyValue[1]);
          }
        }
      });

      // If some filters are activated, filter the cars
      console.log("Selected condtions: ", conditions);
      if (flag) {
        console.log("Should be filtered");
        setFilteredCars(
          cars.filter((car) => {
            let meetsConditions = true;
            Object.keys(conditions).forEach((key) => {
              if (["car_tags", "car_sources"].includes(key)) {
                const intersection = conditions[key].filter((item) =>
                  car[key].includes(item),
                );
                meetsConditions = intersection.length > 0 && meetsConditions;
              } else {
                meetsConditions =
                  conditions[key].includes(car[key]) && meetsConditions;
              }
            });
            if (meetsConditions)
              console.log("This car is included: ", meetsConditions);
            return meetsConditions;
          }),
        );
      }
    }
  }, [checkedFilters]);

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
  };

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  };

  const onCheckFilter = (targetKey, status) => {
    if (filters == null) return;
    setCheckedFilters({
      ...checkedFilters,
      [targetKey]: status,
    });
  };

  const handleChipDelete = (targetKey) => {
    console.log("Deleted: ", targetKey);
    setCheckedFilters({
      ...checkedFilters,
      [targetKey]: false,
    });
  };

  return (
    <ThemeProvider theme={myTheme}>
      <TopPage
        setPage={setPage}
        setPerPage={setPerPage}
        theme={myTheme}
        total={filteredCars != null ? filteredCars.length : 100}
      />
      {/* <TopAppBar searchCar={searchCar}></TopAppBar> */}
      <Chip
        sx={{ margin: "5px 0px 5px 5px" }}
        color="secondary"
        label="Filters"
        onClick={toggleDrawer}
      />
      <FilterChips
        checkedFilters={checkedFilters}
        handleDelete={handleChipDelete}
      />
      <Drawer open={drawerState} onClose={toggleDrawer}>
        <DrawerList
          filters={filters}
          checkedFilters={checkedFilters}
          onCheckFilter={onCheckFilter}
          openParam={
            filters != null
              ? filters.map((item) => ({ [item.property]: false }))
              : null
          }
        />
      </Drawer>
      <Grid>
        <MainFragment
          carsParam={filteredCars}
          searchWord={searchWord}
          smallImgUrls={smallImgUrls}
          page={page}
          perPage={perPage}
        />
        {/* <CarCard car={{name: 'Alfa Romeo 4C Gr.4', brand: 'Alfa Romeo', pp: 610.55, country: 'Italy',
                      power: 295, weight: 2249, aspiration: 'TB', car_layout: 'MR'}}>

        </CarCard> */}
      </Grid>
    </ThemeProvider>
  );
}
