// src/components/EditableTitle.jsx
import { useState } from 'react';

export default function EditableTitle({ name, isOwner, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);

  if (!isOwner) return <h2>{name}</h2>;

  return editing ? (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={() => {
        onUpdate(value);
        setEditing(false);
      }}
      onKeyDown={e => e.key === 'Enter' && e.target.blur()}
      autoFocus
      className="title-input"
    />
  ) : (
    <h2 onClick={() => setEditing(true)} className="editable-title">
      {name} (upravit)
    </h2>
  );
}