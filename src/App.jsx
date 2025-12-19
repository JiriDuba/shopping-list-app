import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useMemo, createContext} from 'react';
import { AuthProvider } from './context/AuthContext';
import ShoppingListsPage from './pages/ShoppingListsPage';
import ShoppingListDetailPage from './pages/ShoppingListDetailPage';

// MUI Theme a Localization
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './i18n'; // Importujeme konfiguraci překladů

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Resetuje CSS a nastaví barvu pozadí podle módu */}
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ShoppingListsPage />} />
              <Route path="/list/:id" element={<ShoppingListDetailPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;