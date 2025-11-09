import ShoppingListTile from './ShoppingListTile';

export default function ShoppingListGrid({ lists, onDelete, onArchive }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1rem',
      marginTop: '2rem'
    }}>
      {lists.map(list => (
        <ShoppingListTile
          key={list.id}
          list={list}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}