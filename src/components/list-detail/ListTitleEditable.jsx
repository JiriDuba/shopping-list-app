import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

export default function ListTitleEditable({ list, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(list.name);
  const { user } = useAuth();
  const isOwner = list.owner === user;

  const handleSave = () => {
    if (name.trim() && name !== list.name) {
      onUpdate({ ...list, name });
    }
    setEditing(false);
  };

  // Není vlastník: zobrazíme jen název
  if (!isOwner) {
    return (
      <Typography variant="h3" component="h1" sx={{ margin: '1rem 0' }}>
        {list.name}
      </Typography>
    );
  }

  // Vlastník: zobrazení pro editaci / prohlížení
  return (
    <Box sx={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: 2 }}>
      {editing ? (
        <>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
            fullWidth
            variant="standard"
            slotProps={{
              input: {
                style: { fontSize: '2rem', padding: '4px 0' }
              }
            }}
          />
          <IconButton onClick={handleSave} color="primary" aria-label="uložit">
            <SaveIcon />
          </IconButton>
          <IconButton 
            onClick={() => { setName(list.name); setEditing(false); }} 
            color="error"
            aria-label="zrušit"
          >
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h3" component="h1" sx={{ margin: 0 }}>
            {list.name}
          </Typography>
          <IconButton onClick={() => setEditing(true)} aria-label="editovat" size="small">
            <EditIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
}