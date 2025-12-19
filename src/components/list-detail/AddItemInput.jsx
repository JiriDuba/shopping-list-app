import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// MUI Importy
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';

export default function AddItemInput({ onAdd }) {
  const [title, setTitle] = useState('');
  const { t } = useTranslation(); // Hook pro překlady

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <TextField
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyPress}
        // Použití překladového klíče pro placeholder
        placeholder={t('placeholder_add')} 
        fullWidth
        variant="outlined"
        size="medium"
        // Nový způsob zápisu místo InputProps
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AddCircleIcon color="primary" />
              </InputAdornment>
            ),
            style: { borderRadius: '12px' }
          }
        }}
      />
    </Box>
  );
}