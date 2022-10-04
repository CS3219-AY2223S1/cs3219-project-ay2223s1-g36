import { Box } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { URL_MATCH_SVC } from '../../configs';
import { useEffect, useState } from 'react';
import { STATUS_MATCH_TIMED_OUT } from '../../constants';

export default function MatchLayout() {
  const navigate = useNavigate();
  const [socketID, setSocketID] = useState(undefined);
  const [timer, setTimer] = useState(30);
  const [showExistingMatchToast, setShowExistingMatchToast] = useState(false);
  const { state } = useLocation();
  const difficulty = state ? state.difficulty : 'Not chosen';
  const userId = JSON.parse(localStorage.getItem('user')).username;

  useEffect(() => {
    const socket = io(URL_MATCH_SVC);
    socket.on('connect', () => {
      console.log(`Connected to the server with ID: ${socket.id}`);
      setSocketID(socket.id);
      socket.emit('match:find', { userId, difficulty });
    });

    setInterval(() => {
      if (timer > 0) {
        setTimer((timer) => timer - 1);
      }
    }, 1000);

    socket.on('match:exists', (roomID) => {
      setShowExistingMatchToast(true);
      setTimeout(() => {
        navigate('/room', { state: { roomID, socketID, difficulty } });
      }, 3000);
    });

    socket.on('match:success', (roomID) => {
      navigate('/room', { state: { roomID, socketID, difficulty } });
    });
  }, []);

  if (timer === -3) {
    navigate('/', { state: { status: STATUS_MATCH_TIMED_OUT } });
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
