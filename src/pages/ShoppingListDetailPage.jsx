import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import ListTitleEditable from '../components/list-detail/ListTitleEditable';
import MembersSection from '../components/list-detail/MembersSection';
import ItemFilters from '../components/list-detail/ItemFilters';
import AddItemInput from '../components/list-detail/AddItemInput';
import ItemsList from '../components/list-detail/ItemsList';
import { shoppingLists as initialLists, listItems } from '../data/fakeData';
import { useAuth } from '../context/AuthContext';

// --- MUI Importy ---
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
// -------------------

export default function ShoppingListDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [lists, setLists] = useState(initialLists);
  const [items, setItems] = useState(listItems);
  const [filter, setFilter] = useState('buy');

  const list = lists.find(l => l.id === parseInt(id));
  const listItemsFiltered = items
    .filter(i => i.listId === parseInt(id))
    .filter(i => {
      if (filter === 'buy') return !i.resolved;
      if (filter === 'resolved') return i.resolved;
      return true;
    });

  useEffect(() => {
    if (list && !list.members.includes(user)) {
      navigate('/');
    }
  }, [list, user, navigate]);

  // --- MUI pro stav Načítání / Nenalezeno ---
  if (!list) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6">Načítání seznamu...</Typography>
        {/* Přidal jsem Alert pro lepší uživatelský feedback */}
        <Alert severity="warning" sx={{ mt: 2 }}>
            Pokud se seznam nenačte, budete automaticky přesměrováni.
        </Alert>
      </Box>
    );
  }
  // -------------------------------------------

  const updateList = (updatedList) => {
    setLists(lists.map(l => l.id === updatedList.id ? updatedList : l));
  };

  const addItem = (title) => {
    const newItem = {
      id: Math.max(...items.map(i => i.id), 0) + 1,
      listId: list.id,
      title,
      resolved: false
    };
    setItems([...items, newItem]);
  };

  const toggleItem = (itemId) => {
    setItems(items.map(i =>
      i.id === itemId ? { ...i, resolved: !i.resolved } : i
    ));
  };

  const deleteItem = (itemId) => {
    setItems(items.filter(i => i.id !== itemId));
  };

  return (
    <>
      <Header />
      
      {/* MUI Container pro centrování a max. šířku */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        
        {/* Titul a info o vlastníkovi */}
        <Box sx={{ mb: 3 }}>
            <ListTitleEditable list={list} onUpdate={updateList} /> 

            {/* Typography nahrazuje div s inline stylem */}
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                Vlastník: <Typography component="strong" variant="inherit" sx={{ fontWeight: 'bold' }}>{list.owner}</Typography>
            </Typography>
        </Box>

        {/* Sekce pro členy - s Box pro vizuální oddělení */}
        <Box sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
            <MembersSection list={list} onUpdate={updateList} />
        </Box>

        {/* Sekce pro položky */}
        <Box>
            {/* Typography nahrazuje h2 */}
            <Typography variant="h5" component="h2" sx={{ mb: 2, borderBottom: '1px solid #eee', pb: 1 }}>
                Položky
            </Typography>

            {/* Filtry a vstup pro přidání položek */}
            <Box sx={{ mb: 2 }}>
                <ItemFilters filter={filter} setFilter={setFilter} />
            </Box>

            <AddItemInput onAdd={addItem} />
            
            <Box sx={{ mt: 3 }}>
                <ItemsList
                    items={listItemsFiltered}
                    onToggle={toggleItem}
                    onDelete={deleteItem}
                />
            </Box>
        </Box>
      </Container>
    </>
  );
}