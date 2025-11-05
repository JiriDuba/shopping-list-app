// src/components/ListTile.jsx
import { Link } from 'react-router-dom';

export default function ListTile({ list, onDelete, isOwner }) {
  return (
    <div className="tile">
      <Link to={`/shopping-lists/${list.id}`} className="tile-link">
        <h3>{list.name}</h3>
        {list.archived && <span className="archived">Archivováno</span>}
      </Link>
      {isOwner && (
        <button className="del-btn" onClick={() => onDelete(list.id)}>Del</button>
      )}
      <div className="info">
        <p>Vlastník: {isOwner ? 'Vy' : 'Jiný'}</p>
        <p>Členů: {list.memberIds.length}</p>
      </div>
    </div>
  );
}