import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let myTheme = createTheme({
    palette: {
        primary: {
            main: '#959597',
        },
        secondary: {
            main: '#FFFFFF',
        },
        white: {
            main: '#FFFFFF',
        },
        black: {
            main: '#FF0000',
        },
        gray: {
            main: '#BBBBBB',
        }
    }
});

myTheme = responsiveFontSizes(myTheme);

export default myTheme;