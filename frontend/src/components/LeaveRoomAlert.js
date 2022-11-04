import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';

export default function LeaveRoomAlert({ collabSocket }) {
  const [showUserLeft, setShowUserLeft] = useState(false);

  useEffect(() => {
    collabSocket.on('user:leave', () => {
      setShowUserLeft(true);
    });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowUserLeft(false);
  };

  return (
    <Snackbar
      open={showUserLeft}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      onClose={handleClose}
      sx={{ marginTop: '50px' }}
    >
      <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
        Your partner has left the match. The room will close after you leave it.
      </Alert>
    </Snackbar>
  );
}
