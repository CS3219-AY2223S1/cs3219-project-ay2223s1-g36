import { Avatar, Box, Drawer, Stack, Typography, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DRAWER_WIDTH } from '../const/Size';
import Logo from './Logo';
import NavBar from './nav/NavBar';
import NAV_CONFIG from './nav/NavConfig';
import { useAuth } from '../hooks/useAuth';

export default function Sidebar({ isOpen, onClose, isHidden = false }) {
  const pathname = useLocation();
  const isDesktop = useMediaQuery('(min-width:1200px)');
  const auth = useAuth();
  let username = null;
  try {
    username = auth.user.username;
  } catch {
    username = '';
  }
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  const navBarContent = (
    <>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5, cursor: 'pointer' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderRadius: '12px',
            backgroundColor: 'rgba(145, 158, 171, 0.12)'
          }}
        >
          <Avatar src={'/static/avatar_default.jpeg'} alt="User Avatar" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'rgb(33, 43, 54)', fontWeight: '600' }}>
              {username}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgb(99, 115, 129)',
                fontWeight: '600',
                fontSize: '0.75rem'
              }}
            >
              Amateur
            </Typography>
          </Box>
        </Box>
      </Box>

      <NavBar navConfig={NAV_CONFIG} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: 'relative' }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }}>
              Copyright 2022 &copy; CS3219 Group 36
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );

  return (
    <div
      sx={{
        '@media only screen and (min-width: 1200px)': {
          flexShrink: 0,
          width: '280px'
        }
      }}
    >
      {isDesktop && !isHidden ? (
        <Drawer
          open
          variant="persistent"
          transitionDuration={{ enter: 0, exit: 0 }}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'rgba(249, 250, 251, 1)',
              borderRightStyle: 'dashed'
            }
          }}
        >
          {navBarContent}
        </Drawer>
      ) : (
        <Drawer
          open={isOpen}
          onClose={onClose}
          PaperProps={{
            sx: {
              width: '280px'
            }
          }}
        >
          {navBarContent}
        </Drawer>
      )}
    </div>
  );
}
