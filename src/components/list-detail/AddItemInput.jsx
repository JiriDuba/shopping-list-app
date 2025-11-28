import { useState } from 'react';
// MUI Importy
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';

export default function AddItemInput({ onAdd }) {
  const [title, setTitle] = useState('');

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
        placeholder="+ Přidat novou položku a stiskni Enter..."
        fullWidth
        variant="outlined"
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AddCircleIcon color="primary" />
            </InputAdornment>
          ),
          style: { borderRadius: '12px' }
        }}
      />
    </Box>
  );
}