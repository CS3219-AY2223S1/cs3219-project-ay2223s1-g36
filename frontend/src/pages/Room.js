import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Split from 'react-split';

import { useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { io } from 'socket.io-client';
import { URL_COLLAB_SVC } from '../configs';

import Page from '../components/Page';
import Question from '../components/Question';
import CodeEditor from '../components/editor/CodeEditor';
import ChatBox from '../components/chat';

export default function Room() {
  const { roomId, difficulty, questionId } = useOutletContext();
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
        <Split
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
          sizes={[25, 75]}
          minSize={400}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
        >
          <Question qid={questionId} difficulty={difficulty} />
          <CodeEditor roomId={roomId} collabSocket={collabSocket} />
        </Split>
        <ChatBox collabSocket={collabSocket} />
      </Box>
    </Page>
  );
}
