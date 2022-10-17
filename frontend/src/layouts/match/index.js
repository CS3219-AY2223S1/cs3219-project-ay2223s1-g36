import { Box } from '@mui/material';
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

  useEffect(() => {
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
    navigate('/');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden',
        background: 'black'
      }}
    >
      <Outlet context={{ timer, showExistingMatchToast }} />
    </Box>
  );
}
