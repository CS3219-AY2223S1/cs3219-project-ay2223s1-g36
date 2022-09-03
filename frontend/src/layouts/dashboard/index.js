import { Box } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MainNavBar from '../../components/MainNavBar';
import Sidebar from '../../components/SideBar';

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden'
      }}
    >
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />
      <MainNavBar onOpenSidebar={() => setOpen(true)} />
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          minHeight: '100%',
          paddingTop: '88px',
          paddingBottom: '80px',
          '@media only screen and (min-width: 1200px)': {
            paddingTop: '116px',
            paddingLeft: '16px',
            paddingRight: '16px'
          }
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
