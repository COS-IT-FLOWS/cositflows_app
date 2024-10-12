import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#18181b', // Background color or primary color for your widgets
    },
    secondary: {
      main: '#e0e0e0', // Secondary color if needed
    },
    background: {
      default: '#18181b', // Default background for cards or containers
    },
    text: {
      primary: '#ffffff', // White text by default
    },
  },
  typography: {
    fontFamily: 'Inter',
    h5: {
      fontWeight: 400, // Customize heading style
    },
    body1: {
      fontSize: '1rem', // Customize the base body font
    },
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        container: {
          gap : '15px',
        },
       },
      },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#18181b', // default background
          opacity: '95%',
          color: '#ffffff', // default text color
          fontFamily: 'Inter',
          borderRadius: '15px',
        },
      },
    },
  },
  spacing: 8, // Default spacing unit if needed
});

export default theme;
