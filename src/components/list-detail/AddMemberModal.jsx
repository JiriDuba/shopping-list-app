import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import pro překlady
import Button from '../common/Button';

export default function AddMemberModal({ isOpen, onClose, onAdd, currentMembers }) {
  const [username, setUsername] = useState('');
  const { t } = useTranslation(); // Hook pro přístup k překladům

  if (!isOpen) return null;

  const handleAdd = () => {
    if (username.trim() && !currentMembers.includes(username.trim())) {
      onAdd(username.trim());
      setUsername('');
      onClose();
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      background: 'rgba(0,0,0,0.5)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      zIndex: 1000 // Zajištění, aby byl modal nad ostatními prvky
    }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '400px' }}>
        {/* Přeložený nadpis */}
        <h3>{t('add_member')}</h3> 
        
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          // Přeložený placeholder
          placeholder={t('placeholder_member')} 
          style={{ 
            width: '100%', 
            padding: '12px', 
            margin: '1rem 0', 
            borderRadius: '8px', 
            border: '1px solid #ccc',
            boxSizing: 'border-box'
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        
        <div style={{ textAlign: 'right', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          {/* Přeložená tlačítka */}
          <Button onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            {t('add')}
          </Button>
        </div>
      </div>
    </div>
  );
}