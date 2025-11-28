import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ShoppingListTile from './ShoppingListTile';

export default function ShoppingListGrid({ lists, onDelete, onArchive }) {
  if (!lists || lists.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
        Zatím nemáte žádné seznamy.
      </Typography>
    );
  }

  return (
    // Grid container drží položky pohromadě
    <Grid container spacing={3}>
      {lists.map(list => (
        <Grid item key={list.id} xs={12} sm={6} md={4}>
          <ShoppingListTile
            list={list}
            onDelete={onDelete}
            onArchive={onArchive}
          />
        </Grid>
      ))}
    </Grid>
  );
}