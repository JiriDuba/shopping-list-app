import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import ListTitleEditable from '../components/list-detail/ListTitleEditable';
import MembersSection from '../components/list-detail/MembersSection';
import ItemFilters from '../components/list-detail/ItemFilters';
import AddItemInput from '../components/list-detail/AddItemInput';
import ItemsList from '../components/list-detail/ItemsList';
import { useAuth } from '../context/AuthContext';

// 1. Importy pro API, překlady a grafy
import api from '../services/api';
import { useTranslation } from 'react-i18next';
import { PieChart } from '@mui/x-charts/PieChart';

// MUI Importy
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export default function ShoppingListDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation(); // Hook pro překlady

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
        const [listData, itemsData] = await Promise.all([
          api.getListById(listId),
          api.getItems(listId)
        ]);

        if (!listData.members.includes(user)) {
          setError(t('no_permission')); // Přeložená chyba
          return;
        }

        setList(listData);
        setItems(itemsData);
      } catch (err) {
        console.error(err);
        setError(t('load_error'));
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [id, user, t]);

  // --- HANDLERY PRO API VOLÁNÍ ---
  const updateList = async (updatedListData) => {
    try {
      await api.updateList(updatedListData);
      setList(updatedListData);
    } catch (err) {
      alert(t('update_error'));
    }
  };

  const addItem = async (title) => {
    try {
      const newItemPayload = { listId: list.id, title, resolved: false };
      const createdItem = await api.createItem(newItemPayload);
      setItems([...items, createdItem]);
    } catch (err) {
      alert(t('add_error'));
    }
  };

  const toggleItem = async (itemId) => {
    try {
      const itemToUpdate = items.find(i => i.id === itemId);
      const updatedItem = { ...itemToUpdate, resolved: !itemToUpdate.resolved };
      await api.updateItem(updatedItem);
      setItems(items.map(i => i.id === itemId ? updatedItem : i));
    } catch (err) {
      alert(t('update_item_error'));
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await api.deleteItem(itemId);
      setItems(items.filter(i => i.id !== itemId));
    } catch (err) {
      alert(t('delete_error'));
    }
  };

  // --- LOGIKA PRO GRAF ---
  const resolvedCount = items.filter(i => i.resolved).length;
  const unresolvedCount = items.filter(i => !i.resolved).length;

  const getFilteredItems = () => {
    if (!items) return [];
    return items.filter(i => {
      if (filter === 'buy') return !i.resolved;
      if (filter === 'resolved') return i.resolved;
      return true;
    });
  };

  // --- VYKRESLOVÁNÍ ---

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6">{t('loading')}</Typography>
      </Box>
    );
  }

  if (error || !list) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error || t('unknown_error')}</Alert>
        <Button variant="outlined" onClick={() => navigate('/')}>{t('back_to_list')}</Button>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Hlavička */}
        <Box sx={{ mb: 3 }}>
          <ListTitleEditable list={list} onUpdate={updateList} />
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            {t('owner')}: <strong>{list.owner}</strong>
          </Typography>
        </Box>

        {/* Statistiky (Graf) */}
        
        {items.length > 0 && (
          <Paper variant="outlined" sx={{ p: 2, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Změna nadpisu na Míra splnění pomocí t('completion_stats') */}
            <Typography variant="h6" gutterBottom>
              {t('completion_stats')}
            </Typography>
            
            <Box sx={{ width: '100%', height: 250, display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: resolvedCount, label: t('resolved'), color: '#4caf50' },
                      { id: 1, value: unresolvedCount, label: t('unresolved'), color: '#f44336' },
                    ],
                    innerRadius: 30,
                    paddingAngle: 5,
                    cornerRadius: 5,
                  },
                ]}
                slotProps={{ legend: { direction: 'row', position: { vertical: 'bottom', horizontal: 'center' } } }}
              />
            </Box>
          </Paper>
        )}

        {/* Členové */}
        <MembersSection list={list} onUpdate={updateList} />

        {/* Položky */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, borderBottom: '1px solid #eee', pb: 1 }}>
            {t('items')}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <ItemFilters filter={filter} setFilter={setFilter} />
          </Box>
          <AddItemInput onAdd={addItem} />
          <Box sx={{ mt: 3 }}>
            <ItemsList items={getFilteredItems()} onToggle={toggleItem} onDelete={deleteItem} />
          </Box>
        </Box>
      </Container>
    </>
  );
}