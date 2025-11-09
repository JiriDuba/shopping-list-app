import { useState } from 'react';
import Button from '../common/Button';
import AddMemberModal from './AddMemberModal';
import { useAuth } from '../../context/AuthContext';

export default function MembersSection({ list, onUpdate }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();
  const isOwner = list.owner === user;

  const handleRemove = (username) => {
    if (username === user || (isOwner && window.confirm(`Odebrat ${username}?`))) {
      onUpdate({
        ...list,
        members: list.members.filter(m => m !== username)
      });
    }
  };

  const handleAdd = (username) => {
    onUpdate({
      ...list,
      members: [...list.members, username]
    });
  };

  return (
    <div style={{ margin: '2rem 0', padding: '1rem', background: '#f9f9f9', borderRadius: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>Členové ({list.members.length})</h3>
        {isOwner && <Button onClick={() => setModalOpen(true)}>+ Přidat člena</Button>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
        {list.members.map(member => (
          <div key={member} style={{
            padding: '1rem',
            background: 'white',
            borderRadius: '8px',
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontWeight: member === list.owner ? 'bold' : 'normal' }}>
              {member} {member === list.owner && '(vlastník)'}
            </div>
            {(isOwner || member === user) && member !== list.owner && (
              <button
                onClick={() => handleRemove(member)}
                style={{ position: 'absolute', top: '4px', right: '4px', background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>

      <AddMemberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
        currentMembers={list.members}
      />
    </div>
  );
}