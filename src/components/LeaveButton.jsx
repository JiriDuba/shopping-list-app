// src/components/LeaveButton.jsx
export default function LeaveButton({ onLeave }) {
  return (
    <button onClick={onLeave} className="leave-btn">
      Opustit seznam
    </button>
  );
}