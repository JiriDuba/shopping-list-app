import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Button, Box, Chip } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddMemberModal from './AddMemberModal'; // Importuj tvůj modal

export default function MembersSection({ list, onUpdate }) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false); // STAV PRO MODAL

  const handleAddMember = (newUsername) => {
    // Přidáme nového člena do seznamu a zavoláme update
    const updatedMembers = [...list.members, newUsername];
    onUpdate({ ...list, members: updatedMembers });
  };

  const handleRemoveMember = (memberToRemove) => {
    const updatedMembers = list.members.filter(m => m !== memberToRemove);
    onUpdate({ ...list, members: updatedMembers });
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          {t('members_title')} ({list.members.length})
        </Typography>

        <Button 
          variant="contained" 
          startIcon={<PersonAddIcon />}
          onClick={() => setIsModalOpen(true)} // TADY SE MODAL OTEVÍRÁ
        >
          {t('add_member')}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {list.members.map((member) => (
          <Chip
            key={member}
            // Pokud je jméno v databázi 'me' nebo odpovídá list.owner, označíme jako vlastníka
            label={member === list.owner ? `${member} (${t('owner_label')})` : member}
            color={member === list.owner ? "primary" : "default"}
            onDelete={member !== list.owner ? () => handleRemoveMember(member) : undefined}
          />
        ))}
      </Box>

      {/* VOLÁNÍ MODALU */}
      <AddMemberModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddMember}
        currentMembers={list.members}
      />
    </Box>
  );
}