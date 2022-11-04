import { Alert, Box, Snackbar } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { URL_MATCH_SVC } from '../../configs';
import { io } from 'socket.io-client';

export default function MatchLayout() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(30);
  const [showExistingMatchToast, setShowExistingMatchToast] = useState(false);
  const { state } = useLocation();
  const difficulty = state ? state.difficulty : 'Not chosen';
  const userId = JSON.parse(localStorage.getItem('user')).username;
  const hasValidMatchInformation = difficulty !== 'Not chosen';

  useEffect(() => {
    if (!hasValidMatchInformation) {
      navigate('/dashboard');
      return;
    }
    const matchSocket = io(URL_MATCH_SVC);

    matchSocket.on('connect', () => {
      matchSocket.emit('match:find', { userId, difficulty });
    });

    setInterval(() => {
      if (timer > 0) {
        setTimer((timer) => timer - 1);
      }
    }, 1000);

    matchSocket.on('match:exists', ({ roomId, questionId }) => {
      setShowExistingMatchToast(true);
      setTimeout(() => {
        navigate('/room', { state: { roomId, questionId, difficulty } });
      }, 3000);
    });

    matchSocket.on('match:success', ({ roomId, questionId }) => {
      navigate('/room', { state: { roomId, questionId, difficulty } });
    });
  }, []);

  if (timer === -3) {
    navigate('/dashboard');
  }

  const handleOnMatchExistToastClose = () => {
    setShowExistingMatchToast(false);
  };

  return hasValidMatchInformation ? (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden',
        background: 'black'
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showExistingMatchToast}
        autoHideDuration={6000}
        sx={{ height: '35px' }}
      >
        <Alert
          variant="outlined"
          severity="success"
          sx={{ width: '100%', color: '#4caf50', fontWeight: '700' }}
          onClose={handleOnMatchExistToastClose}
        >
          Found an existing match...joining now!
        </Alert>
      </Snackbar>
      <Outlet context={{ timer }} />
    </Box>
  ) : null;
}
