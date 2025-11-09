import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function ShoppingListTile({ list, onDelete, onArchive }) {
  const { user } = useAuth();
  const isOwner = list.owner === user;

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '1rem',
      margin: '0.5rem',
      position: 'relative',
      background: '#fff'
    }}>
      <Link to={`/list/${list.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div style={{
            width: '60px', height: '60px', background: '#eee', borderRadius: '8px',
            margin: '0 auto 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            [Photo]
          </div>
          <h3 style={{ margin: '0.5rem 0', fontSize: '1.1rem' }}>{list.name}</h3>
        </div>
        <div style={{
          padding: '0.5rem 1rem',
          background: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          Vlastník: {list.owner} | Členů: {list.members.length}
        </div>
      </Link>

      {isOwner && (
        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <Button variant="danger" onClick={() => onDelete(list.id)}>Del</Button>
          {!list.archived && (
            <Button onClick={() => onArchive(list.id)}>Archive</Button>
          )}
        </div>
      )}
    </div>
  );
}