import Button from '../common/Button';

export default function ItemRow({ item, onToggle, onDelete }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      background: '#fff',
      borderRadius: '8px',
      marginBottom: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <input
        type="checkbox"
        checked={item.resolved}
        onChange={() => onToggle(item.id)}
        style={{ marginRight: '1rem', transform: 'scale(1.5)' }}
      />
      <span style={{
        flex: 1,
        textDecoration: item.resolved ? 'line-through' : 'none',
        color: item.resolved ? '#888' : '#333',
        fontSize: '1.1rem'
      }}>
        {item.title}
      </span>
      <Button variant="danger" onClick={() => onDelete(item.id)}>Del</Button>
    </div>
  );
}