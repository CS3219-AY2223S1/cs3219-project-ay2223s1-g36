import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import RoomNavBar from '../../components/RoomNavBar';
import { URL_MATCH_SVC } from '../../configs';

export default function RoomLayout() {
  const { state } = useLocation();
  const roomId = state ? state.roomID : 'Not found';
  const difficulty = state ? state.difficulty : 'Not chosen';
  const userId = JSON.parse(localStorage.getItem('user')).username;

  const handleOnLeaveRoom = () => {
    const matchSocket = io(URL_MATCH_SVC);
    matchSocket.emit('room:leave', { userId, roomId });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden'
      }}
    >
      <RoomNavBar handleOnLeaveRoom={handleOnLeaveRoom} />
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          minHeight: '100%',
          paddingTop: '88px',
          paddingBottom: '80px'
        }}
      >
        <Outlet context={{ roomId, difficulty }} />
      </Box>
    </Box>
  );
}
