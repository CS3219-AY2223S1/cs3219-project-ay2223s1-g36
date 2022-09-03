import { List } from '@mui/material';
import { Box } from '@mui/system';
import { matchPath, useLocation } from 'react-router-dom';
import NavItem from './NavItem';

export default function NavBar({ navConfig, ...others }) {
  const { pathname } = useLocation();
  const isActivePage = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box {...others}>
      <List disablePadding sx={{ p: 1 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={isActivePage} />
        ))}
      </List>
    </Box>
  );
}
