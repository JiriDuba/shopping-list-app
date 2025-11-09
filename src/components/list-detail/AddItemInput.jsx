import { useState } from 'react';

export default function AddItemInput({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={handleKeyPress}
      placeholder="+ Přidat novou položku a stiskni Enter..."
      style={{
        width: '100%',
        padding: '16px',
        fontSize: '1.1rem',
        border: '2px dashed #ccc',
        borderRadius: '12px',
        margin: '1rem 0'
      }}
    />
  );
}