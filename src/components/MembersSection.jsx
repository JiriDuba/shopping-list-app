// src/components/MembersSection.jsx
import AddMemberInput from './AddMemberInput';
import LeaveButton from './LeaveButton';

export default function MembersSection({ members, isOwner, isMember,currentUserId, onAdd, onRemove, onLeave }) {
  return (
    <div className="section">
      <h3>Členové ({members.length})</h3>
      {isOwner && <AddMemberInput onAdd={onAdd} />}
      <ul>
        {members.map(userId => (
          <li key={userId}>
            {userId} {userId === currentUserId && '(vy)'}
            {isOwner && userId !== currentUserId && (
              <button onClick={() => onRemove(userId)} className="small-btn">Odebrat</button>
            )}
          </li>
        ))}
      </ul>
      {!isOwner && isMember && <LeaveButton onLeave={onLeave} />}
    </div>
  );
}