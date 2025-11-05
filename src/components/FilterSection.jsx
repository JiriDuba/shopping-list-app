// src/components/FilterSection.jsx
export default function FilterSection({ value, onChange }) {
  return (
    <div className="filter-section">
      <label>
        <input type="radio" name="filter" value="all" checked={value === 'all'} onChange={() => onChange('all')} />
        Vše
      </label>
      <label>
        <input type="radio" name="filter" value="active" checked={value === 'active'} onChange={() => onChange('active')} />
        Aktivní
      </label>
      <label>
        <input type="radio" name="filter" value="archived" checked={value === 'archived'} onChange={() => onChange('archived')} />
        Archivované
      </label>
    </div>
  );
}