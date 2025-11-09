import { useState } from 'react';
import Button from '../common/Button';

export default function CreateListModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (name.trim()) {
      onCreate(name);
      setName('');
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '400px' }}>
        <h3>Vytvořit nový nákupní seznam</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Název seznamu..."
          style={{ width: '100%', padding: '12px', margin: '1rem 0', borderRadius: '8px', border: '1px solid #ccc' }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose}>Zrušit</Button>
          <Button variant="primary" onClick={handleSubmit}>Vytvořit</Button>
        </div>
      </div>
    </div>
  );
}