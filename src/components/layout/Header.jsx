import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ColorModeContext } from '../../App'; // Ověřte, zda je cesta k App.jsx správná
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7'; // OPRAVENO: přidáno icons-material
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Header() {
  const { i18n } = useTranslation(); // 't' odstraněno, aby nezpůsobovalo warning
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'cs' ? 'en' : 'cs');
  };

  return (
    <header style={{ 
      padding: '1rem', 
      background: theme.palette.mode === 'dark' ? '#333' : '#f0f0f0', 
      marginBottom: '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: theme.palette.mode === 'dark' ? '1px solid #444' : 'none'
    }}>
      <Link to="/" style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        textDecoration: 'none', 
        color: theme.palette.text.primary 
      }}>
        ShoppingList
      </Link>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {/* Tlačítko pro Dark/Light Mode */}
        <IconButton onClick={colorMode?.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {/* Tlačítko pro Jazyk */}
        <Button onClick={toggleLanguage} variant="outlined" size="small" sx={{ fontWeight: 'bold' }}>
          {i18n.language === 'cs' ? 'EN' : 'CZ'}
        </Button>
      </Box>
    </header>
  );
}