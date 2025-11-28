import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function FilterButtons({ filter, setFilter }) {
  const handleChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
      <ToggleButtonGroup
        color="primary"
        value={filter}
        exclusive
        onChange={handleChange}
        aria-label="Filter shopping lists"
      >
        <ToggleButton value="all">Vše</ToggleButton>
        <ToggleButton value="active">Aktivní</ToggleButton>
        <ToggleButton value="archived">Archiv</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}