export default function Button({ children, onClick, variant = "primary" }) {
  const style = {
    padding: '8px 16px',
    margin: '4px',
    borderRadius: '8px',
    border: 'none',
    background: variant === "danger" ? "#ff4444" : "#0066ff",
    color: "white",
    cursor: "pointer"
  };

  return <button style={style} onClick={onClick}>{children}</button>;
}