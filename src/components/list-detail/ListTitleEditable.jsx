import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ListTitleEditable({ list, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(list.name);
  const { user } = useAuth();
  const isOwner = list.owner === user;

  const handleSave = () => {
    if (name.trim() && name !== list.name) {
      onUpdate({ ...list, name });
    }
    setEditing(false);
  };

  if (!isOwner) return <h1 style={{ margin: '1rem 0' }}>{list.name}</h1>;

  return (
    <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {editing ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
            style={{ fontSize: '2rem', padding: '8px', width: '400px' }}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => { setName(list.name); setEditing(false); }}>Cancel</button>
        </>
      ) : (
        <>
          <h1 style={{ margin: 0 }}>{list.name}</h1>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
}