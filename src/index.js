import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from './contexts/auth-context';
import { createTheme } from './theme';
import { BrowserRouter } from 'react-router-dom';
const theme = createTheme();
const SplashScreen = () => null;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthConsumer>
            {
              (auth) => auth.isLoading
                ? <SplashScreen />
                : <App />
            }
          </AuthConsumer>
        </ThemeProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
