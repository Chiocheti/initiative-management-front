import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { blue, cyan } from '@mui/material/colors';

import Routes from './routes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d6d6d6',
      dark: '#494a4c',
      light: '#d6d6d6',
      contrastText: '#00ffbe',
    },
    secondary: {
      main: cyan[700],
      dark: cyan[800],
      light: cyan[500],
      contrastText: '#fff',
    },
    background: {
      paper: '#253344',
      default: '#1c2837',
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </Router>
  );
}

export default App;
