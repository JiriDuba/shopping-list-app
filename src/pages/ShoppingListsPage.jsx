import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import ShoppingListGrid from '../components/shopping-list/ShoppingListGrid';
import CreateListModal from '../components/shopping-list/CreateListModal';
import FilterButtons from '../components/shopping-list/FilterButtons';
import { useAuth } from '../context/AuthContext';

// 1. Importujeme naše API místo fakeData
import api from '../services/api';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress'; // Točící se kolečko
import Alert from '@mui/material/Alert'; // Chybová hláška

export default function ShoppingListsPage() {
  const { user } = useAuth();
  
  // 2. Definice stavů pro asynchronní operace
  const [lists, setLists] = useState([]);          // Data
  const [loading, setLoading] = useState(true);    // Stav načítání
  const [error, setError] = useState(null);        // Stav chyby
  
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. Načtení dat při spuštění komponenty
  useEffect(() => {
    fetchLists();
  }, []);

  // Pomocná funkce pro stažení dat
  const fetchLists = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getLists(); // Volání serveru
      setLists(data);
    } catch (err) {
      setError("Nepodařilo se načíst seznamy. Zkuste to prosím později.");
      console.error(err);
    } finally {
      setLoading(false); // Vždy vypneme načítání (ať už úspěch nebo chyba)
    }
  };

  // 4. Vytvoření nového seznamu (volání serveru)
  const handleCreate = async (name) => {
    try {
      const newListData = {
        name,
        owner: user,
        archived: false,
        members: [user]
      };
      // Pošleme data na server a čekáme na odpověď (která obsahuje nové ID)
      const createdList = await api.createList(newListData);
      
      // Aktualizujeme lokální stav přidáním nového seznamu
      setLists([createdList, ...lists]);
    } catch (err) {
      setError("Chyba při vytváření seznamu.");
    }
  };

  // 5. Smazání seznamu
  const handleDelete = async (id) => {
    if (!window.confirm("Opravdu smazat?")) return;

    try {
      await api.deleteList(id); // Volání serveru
      // Pokud server nevrátí chybu, smažeme ho i lokálně
      setLists(lists.filter(l => l.id !== id));
    } catch (err) {
      alert("Nepodařilo se smazat seznam.");
    }
  };

  // 6. Archivace (Update)
  const handleArchive = async (id) => {
    try {
      const listToUpdate = lists.find(l => l.id === id);
      const updatedData = { ...listToUpdate, archived: !listToUpdate.archived };
      
      await api.updateList(updatedData); // Volání serveru
      
      // Aktualizace lokálního stavu
      setLists(lists.map(l => l.id === id ? updatedData : l));
    } catch (err) {
      alert("Nepodařilo se změnit stav archivace.");
    }
  };

  // Logika filtrování (zůstává stejná, pracuje s načtenými daty)
  const filteredLists = lists.filter(list => {
    if (filter === 'active') return !list.archived;
    if (filter === 'archived') return list.archived;
    return true;
  });

  return (
    <>
      <Header />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        
        {/* Hlavička stránky */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Nákupní seznamy
          </Typography>
          
          {/* Tlačítko zobrazíme, jen když se nenačítá a není chyba */}
          {!loading && !error && (
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={() => setIsModalOpen(true)}
            >
              Nový seznam
            </Button>
          )}
        </Box>

        {/* --- ZOBRAZENÍ STAVŮ --- */}

        {/* 1. Chyba */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* 2. Načítání */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          /* 3. Hotová data (pokud není chyba) */
          !error && (
            <>
              <FilterButtons filter={filter} setFilter={setFilter} />
              
              <ShoppingListGrid 
                lists={filteredLists} 
                onDelete={handleDelete} 
                onArchive={handleArchive}
              />
            </>
          )
        )}

        <CreateListModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreate}
        />
      </Container>
    </>
  );
}