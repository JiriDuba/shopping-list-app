import { useState } from 'react';
import Header from '../components/layout/Header'; // Předpokládám, že Header zatím necháš původní
import ShoppingListGrid from '../components/shopping-list/ShoppingListGrid';
import CreateListModal from '../components/shopping-list/CreateListModal';
import FilterButtons from '../components/shopping-list/FilterButtons';
import { shoppingLists as initialLists } from '../data/fakeData';
import { useAuth } from '../context/AuthContext';

// MUI importy
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

export default function ShoppingListsPage() {
  const { user } = useAuth();
  const [lists, setLists] = useState(initialLists);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = (name) => {
    const newList = {
      id: Math.max(...lists.map(l => l.id), 0) + 1,
      name,
      owner: user,
      archived: false,
      members: [user]
    };
    setLists([newList, ...lists]);
  };

  const handleDelete = (id) => {
    // Zde by ideálně měl být také MUI Dialog místo window.confirm, 
    // ale window.confirm pro splnění zadání stačí.
    if (window.confirm("Opravdu smazat?")) {
      setLists(lists.filter(l => l.id !== id));
    }
  };

  const handleArchive = (id) => {
    setLists(lists.map(l => l.id === id ? { ...l, archived: !l.archived } : l));
  };

  const filteredLists = lists.filter(list => {
    if (filter === 'active') return !list.archived;
    if (filter === 'archived') return list.archived;
    return true;
  });

  return (
    <>
      <Header />
      
      {/* Container zajistí, že obsah nebude roztažený přes celou šířku na velkých monitorech */}
      <Container maxWidth="lg" sx={{ py: 4 }}> {/* py = padding-top + padding-bottom */}
        
        {/* Box je jako vylepšený div, umožňuje snadné stylování */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Nákupní seznamy
          </Typography>
          
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={() => setIsModalOpen(true)}
          >
            Nový seznam
          </Button>
        </Box>

        <FilterButtons filter={filter} setFilter={setFilter} />

        <ShoppingListGrid 
          lists={filteredLists} 
          onDelete={handleDelete} 
          onArchive={handleArchive}
        />

        <CreateListModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreate}
        />
      </Container>
    </>
  );
}