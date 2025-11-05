// src/components/ItemsSection.jsx
import FilterToggle from './FilterToggle';
import AddItemInput from './AddItemInput';
import ItemRow from './ItemRow';

export default function ItemsSection({ items, showResolved, onToggleFilter, onAddItem, onToggleItem, onRemoveItem }) {
  return (
    <div className="section">
      <h3>Položky</h3>
      <FilterToggle showResolved={showResolved} onToggle={onToggleFilter} />
      <AddItemInput onAdd={onAddItem} />
      <ul className="item-list">
        {items.map(item => (
          <ItemRow
            key={item.id}
            item={item}
            onToggle={() => onToggleItem(item.id)}
            onRemove={() => onRemoveItem(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}