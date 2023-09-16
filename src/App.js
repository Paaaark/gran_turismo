import "./styles.css";
import TopAppBar from './components/TopAppBar';
import CarCard from './components/CarCard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

export default function App() {
  (async () => {
    const client = new DynamoDB({
      region: 'us-east-1',
      aws_access_key_id: 'ASIAZBMDPLH2K6NUZYLD',
      aws_secret_access_key: 'WyJ6x/zrr6PVeXx+d0h9puwny0BNz2su1+77Dov3',
      aws_session_token: 'IQoJb3JpZ2luX2VjEEMaCXVzLWVhc3QtMSJGMEQCIEw2Mb0j69n5WemrocYfZUHj4+GMNhahWOTMVOpXmTBnAiA0kaMhfHddc97bOTsYMkpKSXiGyv6eVsaMCbDb5a927yrrAggrEAAaDDYyMTQzNTM3ODE2NCIMP0jKFyC00z1MUjB6KsgC8YZp5D5FGguCqyyktKmJp33vbO3uyoF2ARgw2Z1iq5c3/lnUl494xfb7NxgoZ4Xl4+avHPPwLwEIwgbvr5IxMMAzEanN4n6ZW6bQwK04PpyZTeFQpFGzPvsDFsJpKHdP1HuE9S5+5RbCKfilwdk/RTQm/faXR1AXYo9O2Tk0kll/J4/JNmnj2PdqEg70JfsQrl8T0cM34WoXlT0Rwv7uF5RsUcERy9LiYx08CC0cEJR32X70TUvKAGj8LTjNrfUf/8zZ2sxosbHvF2y7AqsqPRG4VNj2kqjoHGQgNiwu4YhyXtrwiBAWPtrTZ2OuqTLpbO9oISlf+dca4A5XQdYBcY94DfuJZJ/icSo+evWB8uwiJKqZIQPatfAsxuzl3UFC5m+Bq4icW/3wJQHFfO1N5vAglgtGeNs8tQe9eU2+1hxNDrRb3ncutjCHlIaoBjqoAbhuorw0HvhM3eckVPGLjtHxpuSIpAJDquXIAt8quONGWN8IEtAPaJc6EZpncHfnPnclmw12S4bQA6aOe4bTHfI7ETELBFj8R/s18Xj72ZnEO6QuF4pQ7goom4LxlkFLlYzq6sj290spuard+QhRDm0bQZms0zuQY/t6JTRrGwOy54UXFkMXfJHE9i7igJDgyTWyQhTBPlsFkbJBkwhBTs9D4NZhYYzkcw=='
    })
  })( /* #TODO: Callback */ );

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
