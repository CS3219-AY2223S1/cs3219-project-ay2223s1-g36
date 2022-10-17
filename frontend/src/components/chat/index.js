import { Divider, Drawer, Fab, IconButton, List, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/system';
import useForceUpdate from '../../hooks/useForceUpdate';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

export default function ChatBox({ collabSocket }) {
  const messageRef = useRef([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef();
  const currentUserId = JSON.parse(localStorage.getItem('user')).username;
  const forceUpdate = useForceUpdate();
  const drawerWidth = 240;

  useEffect(() => {
    collabSocket.on('message:receive', (data) => {
      console.log([...messageRef.current, data]);
      messageRef.current = [...messageRef.current, data];
      forceUpdate();
    });
  }, []);

  const handleSendMessage = () => {
    const message = inputRef.current.value;
    if (message === '') {
      return;
    }
    const messageId = uuidv4();
    const newMessageData = {
      userId: currentUserId,
      message,
      messageId
    };
    collabSocket.emit('message:send', newMessageData);
    messageRef.current = [...messageRef.current, newMessageData];
    inputRef.current.value = '';
    forceUpdate();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Fab color="primary" aria-label="add" onClick={handleDrawerOpen}>
        <QuestionAnswerIcon />
      </Fab>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth
          }
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <Box display={'flex'} sx={{ alignItems: 'center' }}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
          <Typography sx={{ color: 'black' }}>Chat</Typography>
        </Box>
        <Divider />
        <List>
          {messageRef.current.map(({ userId, message, messageId }) => {
            return (
              <p key={messageId}>
                {userId === currentUserId ? 'Me' : userId}: {message}
              </p>
            );
          })}
        </List>
        <Divider />
        <input type="text" ref={inputRef} />
        <button type="button" onClick={handleSendMessage}>
          Send
        </button>
      </Drawer>
    </Box>
  );
}
