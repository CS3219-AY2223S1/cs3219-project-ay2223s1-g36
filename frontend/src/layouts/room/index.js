import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import RoomNavBar from '../../components/RoomNavBar';
import { io } from 'socket.io-client';
import axios from 'axios';
import { STATUS_CODE_OK, STATUS_CODE_BADREQ, STATUS_SERVER_ERROR } from '../../constants';
import { URL_MATCH_SVC, URL_QN_SVC_GETDIFF } from '../../configs';
import { useEffect, useState } from 'react';

export default function RoomLayout() {
  const [roomID, setRoomID] = useState('Not found');
  const { state } = useLocation();
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
    const socket = io(URL_MATCH_SVC);
    socket.on('connect', () => {
      console.log(`Connected to the server with ID: ${socket.id}`);
      socket.emit('match:find', difficulty);
    });

    socket.on('match:success', (roomID) => {
      setRoomID(roomID);
      handleQnGeneration(getDiffLevel(difficulty));
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
        <Outlet context={{ roomID, difficulty, questionID }} />
      </Box>
    </Box>
  );
}
