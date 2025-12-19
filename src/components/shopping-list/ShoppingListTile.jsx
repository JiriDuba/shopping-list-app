import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'; 
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { useTheme } from '@mui/material/styles'; // Import pro přístup k tématu

export default function ShoppingListTile({ list, onDelete, onArchive }) {
  const { user } = useAuth();
  const theme = useTheme(); // Přístup k aktuálnímu tématu (light/dark)
  const isOwner = list.owner === user;

  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'space-between',
      // Dynamické pozadí: background.paper reaguje na dark mode automaticky.
      // Pro archivované použijeme mírně odlišný odstín pomocí action.hover.
      bgcolor: list.archived 
        ? theme.palette.action.hover 
        : theme.palette.background.paper,
      transition: 'background-color 0.3s ease'
    }}>
      <Link to={`/list/${list.id}`} style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="center">
            {list.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" align="center">
            {list.archived ? 'Archivováno' : `${list.members.length} členů`}
          </Typography>
        </CardContent>
      </Link>

      {isOwner && (
        <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
          <IconButton 
            onClick={() => onArchive(list.id)} 
            color="primary"
            aria-label="archive"
          >
             {list.archived ? <UnarchiveIcon /> : <ArchiveIcon />}
          </IconButton>

          <IconButton 
            onClick={() => onDelete(list.id)} 
            color="error" 
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
}