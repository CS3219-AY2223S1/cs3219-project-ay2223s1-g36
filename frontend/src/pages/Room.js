import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { io } from 'socket.io-client';
import ChatBox from '../components/chat';
import CodeEditor from '../components/editor/CodeEditor';
import Page from '../components/Page';
import { URL_COLLAB_SVC } from '../configs';

export default function Room() {
  const { roomId, difficulty } = useOutletContext();
  const collabSocket = useMemo(() => io(URL_COLLAB_SVC), [roomId]);

  useEffect(() => {
    collabSocket.on('connect', () => {
      collabSocket.emit('room:join', { roomId });
      console.log(`Joined room: ${roomId}`);
    });

    return () => {
      collabSocket.off();
    };
  }, []);

  return (
    <Page title="Room" navbar={false}>
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ mb: 1, ml: 1.5, cursor: 'pointer' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px',
                borderRadius: '12px',
                backgroundColor: 'rgba(145, 158, 171, 0.12)',
                maxWidth: '400px'
              }}
            >
              <Box sx={{ ml: 0.5, mr: 0.5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'rgb(33, 43, 54)', fontWeight: '600' }}
                >
                  Room ID: {roomId}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mb: 1, mx: 1.5, cursor: 'pointer' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px',
                borderRadius: '12px',
                backgroundColor: 'rgba(145, 158, 171, 0.12)',
                maxWidth: '400px'
              }}
            >
              <Box sx={{ ml: 0.5, mr: 0.5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'rgb(33, 43, 54)', fontWeight: '600' }}
                >
                  Difficulty: {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <CodeEditor roomId={roomId} collabSocket={collabSocket} />
        <ChatBox collabSocket={collabSocket} />
      </Box>
    </Page>
  );
}
