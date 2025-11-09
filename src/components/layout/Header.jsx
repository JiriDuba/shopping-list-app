import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ padding: '1rem', background: '#f0f0f0', marginBottom: '2rem' }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>
        ShoppingList
      </Link>
      <button style={{ float: 'right', padding: '8px 16px' }}>Actions</button>
    </header>
  );
}