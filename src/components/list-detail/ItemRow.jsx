
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function ItemRow({ item, onToggle, onDelete, divider }) {
  

  return (
    <ListItem
      divider={divider} // Přidá jemnou linku mezi položky
      secondaryAction={
        <IconButton 
          edge="end" 
          aria-label="delete" 
          onClick={() => onDelete(item.id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      }
      sx={{
        // Odstranili jsme fixní bílou - pozadí se nyní řídí nadřazeným prvkem (Paper v ItemsList)
        transition: 'background-color 0.2s',
        '&:hover': {
          bgcolor: 'action.hover', // Jemné zvýraznění při najetí myší v obou módech
        },
      }}
    >
      <Checkbox
        edge="start"
        checked={item.resolved}
        tabIndex={-1}
        disableRipple
        onChange={() => onToggle(item.id)}
      />
      <ListItemText
        primary={item.title}
        sx={{
          textDecoration: item.resolved ? 'line-through' : 'none',
          // Použití systémových barev textu
          color: item.resolved ? 'text.disabled' : 'text.primary',
          '& .MuiTypography-root': {
            fontSize: '1.1rem',
          },
        }}
      />
    </ListItem>
  );
}