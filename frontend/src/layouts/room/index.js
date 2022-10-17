import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import { STATUS_CODE_OK, STATUS_CODE_BADREQ, STATUS_SERVER_ERROR } from '../../constants';
import { URL_MATCH_SVC, URL_QN_SVC_GETDIFF } from '../../configs';
import { useEffect, useState } from 'react';
import RoomNavBar from '../../components/RoomNavBar';

export default function RoomLayout() {
  const { state } = useLocation();
  const roomId = state ? state.roomID : 'Not found';
  const difficulty = state ? state.difficulty : 'Not chosen';
  const [questionID, setQuestionID] = useState(0);

  const handleQnGeneration = async (param) => {
    const res = await axios.get(URL_QN_SVC_GETDIFF + param).catch((err) => {
      if (
        err.response.status === STATUS_CODE_BADREQ ||
        err.response.status === STATUS_SERVER_ERROR
      ) {
        console.log('Please try again later');
      }
    });
    if (res && res.status === STATUS_CODE_OK) {
      setQuestionID(res.data[0].qid);
    }
  };

  const getDiffLevel = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'hard':
        return 3;
      default:
        return 0;
    }
  };

  useEffect(() => {
    handleQnGeneration(getDiffLevel(difficulty));
  }, [difficulty]);
  
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
        <Outlet context={{ roomId, difficulty, questionID }} />
      </Box>
    </Box>
  );
}
