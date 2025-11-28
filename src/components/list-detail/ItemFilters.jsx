import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ItemFilters({ filter, setFilter }) {
  const handleChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <ToggleButtonGroup
        color="primary"
        value={filter}
        exclusive
        onChange={handleChange}
        size="small"
      >
        <ToggleButton value="all">Vše</ToggleButton>
        <ToggleButton value="buy">Koupit</ToggleButton>
        <ToggleButton value="resolved">Vyřešeno</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}