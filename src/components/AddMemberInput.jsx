// src/components/AddMemberInput.jsx
import { useState } from 'react';

export default function AddMemberInput({ onAdd }) {
  const [email, setEmail] = useState('');

  const handleAdd = () => {
    if (email.trim()) {
      onAdd(email);
      setEmail('');
    }
  };

  return (
    <div className="add-member">
      <input
        placeholder="Email nového člena..."
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAdd()}
      />
      <button onClick={handleAdd}>Přidat</button>
    </div>
  );
}