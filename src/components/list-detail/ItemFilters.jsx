import Button from '../common/Button';

export default function ItemFilters({ filter, setFilter }) {
  return (
    <div style={{ margin: '1rem 0', display: 'flex', gap: '1rem' }}>
      <Button variant={filter === 'all' ? 'primary' : ''} onClick={() => setFilter('all')}>All</Button>
      <Button variant={filter === 'buy' ? 'primary' : ''} onClick={() => setFilter('buy')}>Buy</Button>
      <Button variant={filter === 'resolved' ? 'primary' : ''} onClick={() => setFilter('resolved')}>Resolved</Button>
    </div>
  );
}