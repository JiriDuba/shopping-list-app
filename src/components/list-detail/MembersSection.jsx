import { useState } from 'react';
import AddMemberModal from './AddMemberModal';
import { useAuth } from '../../context/AuthContext';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';

export default function MembersSection({ list, onUpdate }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();
  const isOwner = list.owner === user;

  const handleRemove = (username) => {
    // Vlastník nemůže odebrat sám sebe, leda by list patřil jinému uživateli (ale to je ošetřeno logikou)
    if (username === list.owner) {
      alert("Vlastník nemůže opustit ani být odebrán ze seznamu.");
      return;
    }
    
    // Umožnit odebrat sobě (opustit) nebo vlastníkovi odebrat jiné
    if (username === user || (isOwner && window.confirm(`Opravdu odebrat člena ${username}?`))) {
      onUpdate({
        ...list,
        members: list.members.filter(m => m !== username)
      });
    }
  };

  const handleAdd = (username) => {
    onUpdate({
      ...list,
      members: [...list.members, username]
    });
  };

  return (
    <Box sx={{ mb: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: '12px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h3">
          Členové ({list.members.length})
        </Typography>
        {isOwner && (
          <Button 
            onClick={() => setModalOpen(true)} 
            variant="contained" 
            startIcon={<PersonAddIcon />}
            size="small"
          >
            Přidat člena
          </Button>
        )}
      </Box>

      <Grid container spacing={1}>
        {list.members.map(member => (
          <Grid item key={member}>
            <Chip
              label={`${member} ${member === list.owner ? '(vlastník)' : ''}`}
              // Pouze vlastník seznamu nebo sám člen (pokud není vlastník) se může odebrat
              onDelete={(isOwner || member === user) && member !== list.owner ? () => handleRemove(member) : undefined}
              deleteIcon={(isOwner || member === user) && member !== list.owner ? <CloseIcon /> : undefined}
              color={member === list.owner ? 'primary' : 'default'}
              variant={member === list.owner ? 'filled' : 'outlined'}
            />
          </Grid>
        ))}
      </Grid>

      <AddMemberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
        currentMembers={list.members}
      />
    </Box>
  );
}