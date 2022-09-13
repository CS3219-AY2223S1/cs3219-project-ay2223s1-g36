import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APPBAR_MOBILE } from '../const/Size';
import Logo from './Logo';

export default function RoomNavBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpen(false);
    }
  };
  const handleConfirmation = () => {
    navigate('/dashboard', { state: { status: 'Successfully left the room.' } });
  };
  return (
    <>
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
            <Button
              variant="outlined"
              color="error"
              sx={{ fontWeight: '700' }}
              onClick={handleOpen}
            >
              Leave Room
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        keepMounted
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          margin: 'auto auto',
          width: '85%',
          maxWidth: '800px'
        }}
      >
        <DialogTitle
          sx={{
            fontSize: '1.6rem',
            fontWeight: '700',
            lineHeight: '1.5'
          }}
        >
          Confirm your choice
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you wish to leave the room? You will <b>not be able</b> to join back the
            same room after leaving.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            No
          </Button>
          <Button variant="contained" color="primary" onClick={handleConfirmation} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
