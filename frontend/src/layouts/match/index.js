import { Box } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { URL_MATCH_SVC } from '../../configs';
import { useEffect, useState } from 'react';

export default function MatchLayout() {
  const navigate = useNavigate();
  const [socketID, setSocketID] = useState(undefined);
  const [timer, setTimer] = useState(30);
  const { state } = useLocation();
  const difficulty = state ? state.difficulty : 'Not chosen';

  useEffect(() => {
    const socket = io(URL_MATCH_SVC);
    socket.on('connect', () => {
      console.log(`Connected to the server with ID: ${socket.id}`);
      setSocketID(socket.id);
      socket.emit('match:find', difficulty);
    });

    setInterval(() => {
      if (timer > 0) {
        setTimer((timer) => timer - 1);
      }
    }, 1000);

    socket.on('match:success', (roomID) => {
      navigate('/room', { state: { roomID, socketID, difficulty } });
    });
  }, []);

  if (timer === -3) {
    navigate('/', { state: { status: 'Connection timed out. Please try again.' } });
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
      <Outlet context={{ timer }} />
    </Box>
  );
}
