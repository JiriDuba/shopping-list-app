// src/pages/ShoppingListDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { MOCK_LISTS, CURRENT_USER_ID } from '../data/mockData';
import EditableTitle from '../components/EditableTitle';
import MembersSection from '../components/MembersSection';
import ItemsSection from '../components/ItemsSection';

export default function ShoppingListDetail() {
  const { id } = useParams();
  const list = MOCK_LISTS.find(l => l.id === id);

  // VŠECHNY HOOKS NA ZAČÁTKU!
  const [name, setName] = useState(list?.name || '');
  const [items, setItems] = useState(list?.items || []);
  const [members, setMembers] = useState(list?.memberIds || []);
  const [showResolved, setShowResolved] = useState(false);

  // Teprve teď kontrolujeme, jestli list existuje
  if (!list) {
    return <div className="page">Seznam nenalezen</div>;
  }

  const isOwner = list.ownerId === CURRENT_USER_ID;
  const isMember = members.includes(CURRENT_USER_ID);

  // ... zbytek handlerů (handleUpdateName, handleAddItem, atd.)
  const handleUpdateName = (newName) => setName(newName);
  const handleAddMember = (email) => setMembers([...members, `user${members.length + 1}`]);
  const handleRemoveMember = (userId) => setMembers(members.filter(m => m !== userId));
  const handleLeave = () => setMembers(members.filter(m => m !== CURRENT_USER_ID));

  const handleAddItem = (name) => {
    const newItem = { id: `i${Date.now()}`, name, resolved: false, addedBy: CURRENT_USER_ID };
    setItems([...items, newItem]);
  };

  const handleToggleItem = (itemId) => {
    setItems(items.map(i => i.id === itemId ? { ...i, resolved: !i.resolved } : i));
  };

  const handleRemoveItem = (itemId) => {
    setItems(items.filter(i => i.id !== itemId));
  };

  const filteredItems = showResolved ? items : items.filter(i => !i.resolved);

  return (
    <div className="page detail-page">
      <Link to="/" className="back-link">Zpět na přehled</Link>
      <EditableTitle name={name} isOwner={isOwner} onUpdate={handleUpdateName} />
      <div className="sections">
        <MembersSection
          members={members}
          isOwner={isOwner}
          isMember={isMember}
          currentUserId={CURRENT_USER_ID}
          onAdd={handleAddMember}
          onRemove={handleRemoveMember}
          onLeave={handleLeave}
        />
        <ItemsSection
          items={filteredItems}
          showResolved={showResolved}
          onToggleFilter={() => setShowResolved(!showResolved)}
          onAddItem={handleAddItem}
          onToggleItem={handleToggleItem}
          onRemoveItem={handleRemoveItem}
        />
      </div>
    </div>
  );
}