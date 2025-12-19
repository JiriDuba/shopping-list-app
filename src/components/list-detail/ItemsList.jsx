import ItemRow from './ItemRow';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

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

  return (
    // Obalení do Paper s variantou outlined zajistí správné barvy hranic v dark modu
    <Paper variant="outlined" sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
      <List sx={{ width: '100%', p: 0 }}>
        {items.map((item, index) => (
          <ItemRow
            key={item.id}
            item={item}
            onToggle={onToggle}
            onDelete={onDelete}
            // Tip: Přidejte divider mezi položky, v dark modu se automaticky přizpůsobí
            divider={index !== items.length - 1}
          />
        ))}
      </List>
    </Paper>
  );
}