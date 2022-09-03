import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import Iconify from './Iconify';
import { APPBAR_DESKTOP, APPBAR_MOBILE, DRAWER_WIDTH } from '../const/Size';
import AccountPopover from './popover/AccountPopover';

export default function MainNavBar({ onOpenSidebar }) {
  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        backgroundColor: 'rgba(249, 250, 251, 0.72)',
        '@media only screen and (min-width: 1200px)': {
          width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
        }
      }}
    >
      <Toolbar
        sx={{
          minHeight: `${APPBAR_MOBILE}px`,
          '@media only screen and (min-width: 1200px)': {
            minHeight: `${APPBAR_DESKTOP}px`,
            padding: '0 24px'
          }
        }}
      >
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: 'rgb(33, 43, 54)', display: { lg: 'none' } }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <AccountPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
