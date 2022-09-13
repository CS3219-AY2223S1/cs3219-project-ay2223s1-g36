import { Box, Stack, AppBar, Toolbar, Button } from '@mui/material';
import { APPBAR_MOBILE } from '../const/Size';
import Logo from './Logo';

export default function RoomNavBar() {
  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        backgroundColor: 'rgba(249, 250, 251, 0.72)'
      }}
    >
      <Toolbar
        sx={{
          minHeight: `${APPBAR_MOBILE}px`
        }}
      >
        <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
          <Logo />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <Button variant="outlined" color="error" sx={{ fontWeight: '700' }}>
            Leave Room
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
