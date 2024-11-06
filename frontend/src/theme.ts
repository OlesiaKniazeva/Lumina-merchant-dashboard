import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      warmTones: {
        header: string;
        body: string;
      };
      logo: string;
      price: string;
      heart: string;
    };
  }
  interface PaletteOptions {
    custom: {
      warmTones: {
        header: string;
        body: string;
      };
      logo: string;
      price: string;
      heart: string;
    };
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    pageTitle: React.CSSProperties;
    logo: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    pageTitle?: React.CSSProperties;
    logo?: React.CSSProperties;
  }

  interface TypographyVariants {
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    h4: React.CSSProperties;
    h5: React.CSSProperties;
    h6: React.CSSProperties;
  }
}

// Add this to properly type Typography component props
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    pageTitle: true;
    logo: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#6B4E71',
    },
    text: {
      primary: '#475569',
      secondary: '#596474',
    },
    custom: {
      warmTones: {
        header: '#524B5D',
        body: '#57534E',
      },
      logo: '#6B4E71',
      price: '#386A20',
      heart: '#BE123C',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 500,
      letterSpacing: '-0.25px',
      color: '#524B5D',
    },
    h2: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 500,
      letterSpacing: '-0.25px',
      color: '#524B5D',
    },
    h3: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 500,
      letterSpacing: '-0.25px',
      color: '#524B5D',
    },
    h4: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 500,
      letterSpacing: '-0.25px',
      color: '#524B5D',
    },
    h5: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 500,
      letterSpacing: '-0.25px',
      color: '#524B5D',
    },
    h6: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 500,
      letterSpacing: '-0.25px',
      color: '#524B5D',
    },
    logo: {
      fontFamily: "'Gilda Display', serif",
      fontWeight: 400,
      letterSpacing: '1.5px',
      color: '#6B4E71',
    },
    pageTitle: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 500,
      letterSpacing: '-0.25px',
      color: '#475569',
      fontSize: '1.75rem',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1800px !important',
          '@media (min-width: 1200px)': {
            maxWidth: '1800px !important',
            paddingLeft: '16px',
            paddingRight: '16px',
          },
          '@media (min-width: 900px)': {
            paddingLeft: '16px',
            paddingRight: '16px',
          },
          '@media (min-width: 600px)': {
            paddingLeft: '16px',
            paddingRight: '16px',
          },
          paddingLeft: '16px',
          paddingRight: '16px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedSecondary: {
          color: '#fff',
          '&:hover': {
            backgroundColor: '#darker-secondary-color',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(99, 89, 133, 0.04)',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
          '&:hover': {
            backgroundColor: 'rgba(99, 89, 133, 0.04)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
  },
});

export default theme;
