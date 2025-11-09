import Button from '../common/Button';

export default function FilterButtons({ filter, setFilter }) {
  return (
    <div style={{ margin: '1rem 0' }}>
      <Button variant={filter === 'all' ? 'primary' : ''} onClick={() => setFilter('all')}>
        All
      </Button>
      <Button variant={filter === 'active' ? 'primary' : ''} onClick={() => setFilter('active')}>
        Active
      </Button>
      <Button variant={filter === 'archived' ? 'primary' : ''} onClick={() => setFilter('archived')}>
        Archived
      </Button>
    </div>
  );
}