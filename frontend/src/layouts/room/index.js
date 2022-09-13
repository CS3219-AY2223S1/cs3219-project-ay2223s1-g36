import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import RoomNavBar from '../../components/RoomNavBar';
import { io } from 'socket.io-client';
import { URL_MATCH_SVC } from '../../configs';
import { useEffect, useState } from 'react';

export default function RoomLayout() {
  const [roomID, setRoomID] = useState('Not found');
  const { state } = useLocation();
  const difficulty = state ? state.difficulty : 'Not chosen';

  useEffect(() => {
    const socket = io(URL_MATCH_SVC);
    socket.on('connect', () => {
      console.log(`Connected to the server with ID: ${socket.id}`);
      socket.emit('match:find', difficulty);
    });

    socket.on('match:success', (roomID) => {
      setRoomID(roomID);
    });
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden'
      }}
    >
      <RoomNavBar />
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          minHeight: '100%',
          paddingTop: '88px',
          paddingBottom: '80px'
        }}
      >
        <Outlet context={{ roomID, difficulty }} />
      </Box>
    </Box>
  );
}
