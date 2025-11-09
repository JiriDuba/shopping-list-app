import { useState } from 'react';
import Header from '../components/layout/Header';
import ShoppingListTile from '../components/shopping-list/ShoppingListTile';
import CreateListModal from '../components/shopping-list/CreateListModal';
import { shoppingLists as initialLists } from '../data/fakeData';
import { useAuth } from '../context/AuthContext';

export default function ShoppingListsPage() {
  const { user } = useAuth();
  const [lists, setLists] = useState(initialLists);
  const [isOpen, setIsOpen] = useState(false);

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
    setLists(lists.filter(l => l.id !== id));
  };

  const handleArchive = (id) => {
    setLists(lists.map(l => l.id === id ? { ...l, archived: true } : l));
  };

  return (
    <div>
      <Header />
      <div style={{ padding: '0 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h1>Nákupní seznamy</h1>
          <button onClick={() => setIsOpen(true)}>Nový seznam</button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {lists.map(list => (
            <ShoppingListTile
              key={list.id}
              list={list}
              onDelete={handleDelete}
              onArchive={handleArchive}
            />
          ))}
        </div>
      </div>

      <CreateListModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}