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
    if (!list || !list.members.includes(user)) {
      navigate('/');
    }
  }, [list, user, navigate]);

  if (!list) return <div>Načítání...</div>;

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
    <div>
      <Header />
      <div style={{ padding: '0 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <ListTitleEditable list={list} onUpdate={updateList} />

        <div style={{ color: '#666', marginBottom: '1rem' }}>
          Vlastník: <strong>{list.owner}</strong>
        </div>

        <MembersSection list={list} onUpdate={updateList} />

        <h2 style={{ margin: '2rem 0 1rem' }}>Položky</h2>
        <ItemFilters filter={filter} setFilter={setFilter} />
        <AddItemInput onAdd={addItem} />
        <ItemsList
          items={listItemsFiltered}
          onToggle={toggleItem}
          onDelete={deleteItem}
        />
      </div>
    </div>
  );
}