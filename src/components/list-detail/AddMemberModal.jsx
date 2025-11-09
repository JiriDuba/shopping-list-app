import { useState } from 'react';
import Button from '../common/Button';

export default function AddMemberModal({ isOpen, onClose, onAdd, currentMembers }) {
  const [username, setUsername] = useState('');

  if (!isOpen) return null;

  const handleAdd = () => {
    if (username.trim() && !currentMembers.includes(username.trim())) {
      onAdd(username.trim());
      setUsername('');
      onClose();
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '400px' }}>
        <h3>Přidat člena</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Zadej jméno uživatele..."
          style={{ width: '100%', padding: '12px', margin: '1rem 0', borderRadius: '8px', border: '1px solid #ccc' }}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose}>Zrušit</Button>
          <Button variant="primary" onClick={handleAdd}>Přidat</Button>
        </div>
      </div>
    </div>
  );
}