import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let myTheme = createTheme({
    palette: {
        primiary: {
            main: '#959597',
        },
        secondary: {
            main: '#FFFFFF',
        },
        white: {
            main: '#FFFFFF',
        },
        black: {
            main: '#000000',
        }
    }
});

myTheme = responsiveFontSizes(myTheme);

export default myTheme;