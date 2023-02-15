import React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';
import { DarkTheme, LightTheme } from './theme';
import { StyledEngineProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const TopLevel = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return (
    <React.StrictMode>
    <StyledEngineProvider injectFirst>
    <ThemeProvider theme={prefersDarkMode ? DarkTheme : LightTheme}>
      <CssBaseline enableColorScheme />
      <App />
    </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
  );
}

root.render(
  <TopLevel />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
