import ItemRow from './ItemRow';

export default function ItemsList({ items, onToggle, onDelete }) {
  if (items.length === 0) {
    return <p style={{ color: '#888', fontStyle: 'italic' }}>Žádné položky...</p>;
  }

  return (
    <div>
      {items.map(item => (
        <ItemRow
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}