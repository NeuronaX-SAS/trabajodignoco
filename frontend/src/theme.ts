import { createTheme } from '@mui/material/styles';
import { PaletteOptions } from '@mui/material/styles';

// Claude-inspired color palette based on RGB(222, 115, 86)
const palette: PaletteOptions = {
  primary: {
    main: '#DE735B', // Claude's peach/coral (RGB: 222, 115, 86)
    light: '#FBE0D8',
    dark: '#C35D45',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#517FA3', // Complementary blue
    light: '#E5EFFA',
    dark: '#3E6A80',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#EB5757',
    light: '#F8D7DA',
    dark: '#C62828',
  },
  warning: {
    main: '#F9A825',
    light: '#FFF3E0',
    dark: '#F57F17',
  },
  info: {
    main: '#2196F3',
    light: '#E3F2FD',
    dark: '#1565C0',
  },
  success: {
    main: '#4CAF50',
    light: '#E8F5E9',
    dark: '#2E7D32',
  },
  text: {
    primary: '#2B4B5C', // Navy blue for headings and important text
    secondary: '#475967', // Lighter blue-gray for body text
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
};

const theme = createTheme({
  palette,
  typography: {
    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2B4B5C',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          padding: '8px 24px',
          fontWeight: 600,
          fontSize: '0.9375rem',
          boxShadow: 'none',
          textTransform: 'none',
        },
        contained: {
          boxShadow: '0 8px 16px rgba(222, 115, 91, 0.15)',
          '&:hover': {
            boxShadow: '0 12px 20px rgba(222, 115, 91, 0.2)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #DE735B 30%, #E58976 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #C35D45 30%, #DE735B 90%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
        text: {
          padding: '6px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          '&:last-child': {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '0.9375rem',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: '0 24px',
          '@media (min-width: 600px)': {
            padding: '0 24px',
          },
        },
      },
    },
  },
});

export default theme;