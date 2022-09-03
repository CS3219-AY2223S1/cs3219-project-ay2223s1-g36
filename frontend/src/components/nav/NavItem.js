import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function NavItem({ item, active }) {
  const isActivePage = active(item.path);
  const { title, path, icon, info } = item;

  const activePageStyle = {
    color: 'rgb(32, 101, 209)',
    fontWeight: '600',
    bgcolor: 'rgba(32, 101, 209, 0.08)'
  };

  return (
    <ListItemButton
      components={NavLink}
      to={path}
      sx={{
        lineHeight: 22 / 14,
        fontSize: '0.875rem',
        height: '48px',
        position: 'relative',
        textTransform: 'capitalize',
        color: '#637381',
        borderRadius: '8px',
        ...(isActivePage && activePageStyle)
      }}
    >
      <ListItemIcon
        sx={{
          width: '22px',
          height: '22px',
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {icon && icon}
      </ListItemIcon>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemButton>
  );
}
