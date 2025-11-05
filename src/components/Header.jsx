// src/components/Header.jsx
export default function Header({ title }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <button className="actions-btn">Akce</button>
    </header>
  );
}