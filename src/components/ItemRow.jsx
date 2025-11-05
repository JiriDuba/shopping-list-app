// src/components/ItemRow.jsx
export default function ItemRow({ item, onToggle, onRemove }) {
  return (
    <li className={`item-row ${item.resolved ? 'resolved' : ''}`}>
      <label>
        <input type="checkbox" checked={item.resolved} onChange={onToggle} />
        {item.name}
      </label>
      <button onClick={onRemove} className="small-btn">Smazat</button>
    </li>
  );
}