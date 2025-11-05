// src/pages/ShoppingListOverview.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_LISTS, CURRENT_USER_ID } from '../data/mockData';
import Header from '../components/Header';
import CreateNewList from '../components/CreateNewList';
import FilterSection from '../components/FilterSection';
import SortSection from '../components/SortSection';
import ListGrid from '../components/ListGrid';

export default function ShoppingListOverview() {
  const [filter, setFilter] = useState('active');
  const [sortBy, setSortBy] = useState('date');

  const accessibleLists = MOCK_LISTS.filter(list => 
    list.memberIds.includes(CURRENT_USER_ID)
  );

  const filteredLists = accessibleLists
    .filter(list => {
      if (filter === 'active') return !list.archived;
      if (filter === 'archived') return list.archived;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return b.id.localeCompare(a.id);
      return 0;
    });

  const handleDelete = (id) => {
    alert(`Smazáno: ${id}`);
  };

  return (
    <div className="page">
      <Header title="ShoppingList" />
      <CreateNewList />
      <FilterSection value={filter} onChange={setFilter} />
      <SortSection value={sortBy} onChange={setSortBy} />
      <ListGrid 
        lists={filteredLists} 
        onDelete={handleDelete}
        currentUserId={CURRENT_USER_ID}
      />
    </div>
  );
}