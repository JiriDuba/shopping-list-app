// src/components/ListGrid.jsx
import ListTile from './ListTile';
import { Link } from 'react-router-dom';

export default function ListGrid({ lists, onDelete, currentUserId }) {
  return (
    <div className="grid">
      {lists.map(list => (
        <ListTile 
          key={list.id} 
          list={list} 
          onDelete={onDelete}
          isOwner={list.ownerId === currentUserId}
        />
      ))}
    </div>
  );
}