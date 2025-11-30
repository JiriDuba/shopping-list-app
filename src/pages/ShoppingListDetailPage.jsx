import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import ListTitleEditable from '../components/list-detail/ListTitleEditable';
import MembersSection from '../components/list-detail/MembersSection';
import ItemFilters from '../components/list-detail/ItemFilters';
import AddItemInput from '../components/list-detail/AddItemInput';
import ItemsList from '../components/list-detail/ItemsList';
import { useAuth } from '../context/AuthContext';

// 1. Importujeme API
import api from '../services/api';

// MUI Importy
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

export default function ShoppingListDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // 2. Stavy pro data a UI
  const [list, setList] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('buy');

  // 3. Načtení dat (Seznam + Položky)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const listId = parseInt(id);

        // Voláme API paralelně: získáme detail seznamu I jeho položky
        const [listData, itemsData] = await Promise.all([
          api.getListById(listId),
          api.getItems(listId)
        ]);

        // Kontrola oprávnění (zda je uživatel členem)
        if (!listData.members.includes(user)) {
          setError("Nemáte oprávnění k zobrazení tohoto seznamu.");
          return;
        }

        setList(listData);
        setItems(itemsData);
      } catch (err) {
        // Pokud seznam neexistuje nebo selže síť
        console.error(err);
        setError("Seznam se nepodařilo načíst nebo neexistuje.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [id, user]);

  // --- HANDLERY PRO API VOLÁNÍ ---

  // A) Aktualizace seznamu (Název, Členové)
  const updateList = async (updatedListData) => {
    try {
      await api.updateList(updatedListData); // Server
      setList(updatedListData);              // Lokální stav
    } catch (err) {
      alert("Chyba při aktualizaci seznamu.");
    }
  };

  // B) Přidání položky
  const addItem = async (title) => {
    try {
      const newItemPayload = {
        listId: list.id,
        title: title,
        resolved: false
      };
      
      const createdItem = await api.createItem(newItemPayload); // Server vrátí item s novým ID
      setItems([...items, createdItem]);                        // Lokální stav
    } catch (err) {
      alert("Nepodařilo se přidat položku.");
    }
  };

  // C) Přepnutí stavu (Hotovo / Koupit)
  const toggleItem = async (itemId) => {
    try {
      const itemToUpdate = items.find(i => i.id === itemId);
      const updatedItem = { ...itemToUpdate, resolved: !itemToUpdate.resolved };

      await api.updateItem(updatedItem); // Server
      
      // Lokální update
      setItems(items.map(i => i.id === itemId ? updatedItem : i));
    } catch (err) {
      alert("Chyba při změně položky.");
    }
  };

  // D) Smazání položky
  const deleteItem = async (itemId) => {
    try {
      await api.deleteItem(itemId); // Server
      setItems(items.filter(i => i.id !== itemId)); // Lokální stav
    } catch (err) {
      alert("Chyba při mazání položky.");
    }
  };

  // --- FILTROVÁNÍ (pouze v klientovi) ---
  // Filtrujeme až při vykreslování, data máme všechna
  const getFilteredItems = () => {
    if (!items) return [];
    return items.filter(i => {
      if (filter === 'buy') return !i.resolved;
      if (filter === 'resolved') return i.resolved;
      return true;
    });
  };

  // --- VYKRESLOVÁNÍ (Render) ---

  // 1. Stav načítání
  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6">Načítání detailu...</Typography>
      </Box>
    );
  }

  // 2. Stav chyby
  if (error || !list) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || "Neznámá chyba"}
        </Alert>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Zpět na přehled
        </Button>
      </Container>
    );
  }

  // 3. Hotová data (Ready state)
  return (
    <>
      <Header />
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        
        {/* Sekce: Hlavička seznamu (Editace názvu) */}
        <Box sx={{ mb: 3 }}>
            <ListTitleEditable list={list} onUpdate={updateList} /> 

            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                Vlastník: <Typography component="strong" variant="inherit" sx={{ fontWeight: 'bold' }}>{list.owner}</Typography>
            </Typography>
        </Box>

        {/* Sekce: Členové */}
        <MembersSection list={list} onUpdate={updateList} />

        {/* Sekce: Položky */}
        <Box>
            <Typography variant="h5" component="h2" sx={{ mb: 2, borderBottom: '1px solid #eee', pb: 1 }}>
                Položky
            </Typography>

            <Box sx={{ mb: 2 }}>
                <ItemFilters filter={filter} setFilter={setFilter} />
            </Box>

            <AddItemInput onAdd={addItem} />
            
            <Box sx={{ mt: 3 }}>
                <ItemsList
                    items={getFilteredItems()}
                    onToggle={toggleItem}
                    onDelete={deleteItem}
                />
            </Box>
        </Box>
      </Container>
    </>
  );
}