import { useState, useEffect, useCallback } from 'react';
import Header from '../components/layout/Header';
import ShoppingListGrid from '../components/shopping-list/ShoppingListGrid';
import CreateListModal from '../components/shopping-list/CreateListModal';
import FilterButtons from '../components/shopping-list/FilterButtons';
import api from '../services/api';

import { useTranslation } from 'react-i18next';
import { BarChart } from '@mui/x-charts/BarChart';

import { Container, Box, Button, Typography, CircularProgress, Alert, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function ShoppingListsPage() {
  const { t } = useTranslation();
  
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLists = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getLists();
      setLists(data);
    } catch (err) {
      setError(t('load_error'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  // DATA PRO GRAF: Nyní bereme reálný itemsCount z API
  const chartData = lists.map(l => ({
    name: l.name,
    count: l.itemsCount || 0
  })).slice(0, 5);

  const filteredLists = lists.filter(list => {
    if (filter === 'active') return !list.archived;
    if (filter === 'archived') return list.archived;
    return true;
  });

  const handleDelete = async (id) => {
    if (!window.confirm(t('confirm_delete'))) return;
    try {
      await api.deleteList(id);
      fetchLists(); // Znovu načteme data, aby se aktualizoval i graf
    } catch (err) {
      alert(t('delete_error'));
    }
  };

  const handleArchive = async (id) => {
    try {
      const listToUpdate = lists.find(l => l.id === id);
      await api.updateList({ ...listToUpdate, archived: !listToUpdate.archived });
      fetchLists();
    } catch (err) {
      alert(t('archive_error'));
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            {t('app_title')}
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={() => setIsModalOpen(true)}
          >
            {t('new_list')}
          </Button>
        </Box>

        {/* Graf počtu položek */}
        {!error && lists.length > 0 && (
          // Upravte sekci s BarChart v ShoppingListsPage.jsx
        <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
          {/* Použití t('items_overview') pro nadpis */}
          <Typography variant="h6" gutterBottom>
            {t('items_overview')}
          </Typography>
          
          <Box sx={{ width: '100%', height: 300 }}>
            <BarChart
              dataset={chartData}
              xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
              series={[
                { 
                  dataKey: 'count', 
                  // Použití t('items_count') pro popisek v legendě grafu
                  label: t('items_count'), 
                  color: '#1976d2' 
                }
              ]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </Box>
        </Paper>
        )}

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <FilterButtons filter={filter} setFilter={setFilter} />
        
        <ShoppingListGrid 
          lists={filteredLists} 
          onDelete={handleDelete} 
          onArchive={handleArchive} 
        />

        <CreateListModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onCreate={async (name) => {
             await api.createList({ name, archived: false, members: [] });
             setIsModalOpen(false);
             fetchLists();
          }} 
        />
      </Container>
    </>
  );
}