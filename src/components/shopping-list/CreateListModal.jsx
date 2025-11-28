import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateListModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onCreate(name);
      setName('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Vytvořit nový nákupní seznam</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Název seznamu"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zrušit</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!name.trim()}>
          Vytvořit
        </Button>
      </DialogActions>
    </Dialog>
  );
}