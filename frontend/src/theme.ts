import { createTheme } from '@mui/material/styles';
import { Montserrat, Open_Sans } from 'next/font/google';

// Define fonts
const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Brand colors
const primary = {
  main: '#733A19', // Brown/rust
  light: '#8B5E43',
  dark: '#5C2E14',
  contrastText: '#F2F0F0',
};

const secondary = {
  main: '#153959', // Deep blue
  light: '#2B5A7A',
  dark: '#0F283D',
  contrastText: '#F2F0F0',
};

const neutral = {
  darkest: '#0E1013', // Nearly black
  dark: '#333333',
  medium: '#666666',
  light: '#BFAF8F', // Beige/tan
  lightest: '#F2F0F0', // Off-white
};

// Create theme
const theme = createTheme({
  palette: {
    primary,
    secondary,
    background: {
      default: neutral.lightest,
      paper: '#FFFFFF',
    },
    text: {
      primary: neutral.darkest,
      secondary: neutral.dark,
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#ED6C02',
    },
    info: {
      main: secondary.main,
    },
    success: {
      main: '#2E7D32',
    },
  },
  typography: {
    fontFamily: openSans.style.fontFamily,
    h1: {
      fontFamily: montserrat.style.fontFamily,
      fontWeight: 700,
    },
    h2: {
      fontFamily: montserrat.style.fontFamily,
      fontWeight: 700,
    },
    h3: {
      fontFamily: montserrat.style.fontFamily,
      fontWeight: 600,
    },
    h4: {
      fontFamily: montserrat.style.fontFamily,
      fontWeight: 600,
    },
    h5: {
      fontFamily: montserrat.style.fontFamily,
      fontWeight: 500,
    },
    h6: {
      fontFamily: montserrat.style.fontFamily,
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.9375rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
          boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
          border: `1px solid ${neutral.lightest}`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: primary.main,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: primary.main,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;