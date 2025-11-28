import ItemRow from './ItemRow';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ItemsList({ items, onToggle, onDelete }) {
  if (items.length === 0) {
    return (
      <Box sx={{ mt: 2, p: 2, textAlign: 'center' }}>
        <Typography color="text.secondary" fontStyle="italic">
          Žádné položky k zobrazení.
        </Typography>
      </Box>
    );
  }

  // Předpokládáme, že ItemRow.jsx bude používat ListItem.
  return (
    <List sx={{ width: '100%' }}>
      {items.map(item => (
        <ItemRow
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
}