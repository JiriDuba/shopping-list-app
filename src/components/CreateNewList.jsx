// src/components/CreateNewList.jsx
import { useNavigate } from 'react-router-dom';

export default function CreateNewList() {
  const navigate = useNavigate();

  const handleCreate = () => {
    const newId = `list${Date.now()}`;
    navigate(`/shopping-lists/${newId}`);
  };

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <button onClick={handleCreate} className="btn-primary">
        + Nový nákupní seznam
      </button>
    </div>
  );
}