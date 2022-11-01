import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Button, Divider, Drawer, Fab, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import FlipMove from 'react-flip-move';
import { v4 as uuidv4 } from 'uuid';
import SendIcon from '@mui/icons-material/Send';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { CHAT_DRAWER_WIDTH } from '../../const/Size';
import useForceUpdate from '../../hooks/useForceUpdate';

export default function ChatBox({ collabSocket }) {
  const messageRef = useRef([]);
  const [open, setOpen] = useState(false);
  const muteNotificationRef = useRef(
    JSON.parse(localStorage.getItem('chat-settings'))?.muteNotification || false
  );
  const inputRef = useRef();
  const bottomMessageRef = useRef(null);
  const currentUserId = JSON.parse(localStorage.getItem('user')).username;
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    collabSocket.on('message:receive', (data) => {
      messageRef.current = [data, ...messageRef.current];
      notifyUser();
      forceUpdate();
    });
  }, []);

  const notifyUser = () => {
    if (muteNotificationRef.current) {
      return;
    }
    const notificationSound = new Audio('/audio/message_notification.mp3');
    notificationSound.play();
  };

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
    messageRef.current = [newMessageData, ...messageRef.current];
    inputRef.current.value = '';
    forceUpdate();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMuteNotification = () => {
    const currentChatSettings = JSON.parse(localStorage.getItem('chat-settings')) || {};
    localStorage.setItem(
      'chat-settings',
      JSON.stringify({ ...currentChatSettings, muteNotification: !muteNotificationRef.current })
    );
    muteNotificationRef.current = !muteNotificationRef.current;
    forceUpdate();
  };

  return (
    <Box
      sx={{
        float: 'right',
        width: '70px',
        paddingTop: '20px',
        bottom: '10px',
        right: '0px',
        position: 'fixed',
        zIndex: '9999'
      }}
    >
      <Fab color="primary" aria-label="add" onClick={handleDrawerOpen}>
        <QuestionAnswerIcon />
      </Fab>
      <Drawer
        sx={{
          width: CHAT_DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: CHAT_DRAWER_WIDTH
          }
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <Box
          display={'flex'}
          sx={{
            alignItems: 'center',
            position: 'fixed',
            right: '0',
            top: '0',
            width: CHAT_DRAWER_WIDTH
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
          <Typography sx={{ color: 'black' }}>Chat</Typography>
          <IconButton onClick={handleMuteNotification}>
            {muteNotificationRef.current ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
        </Box>
        <Divider sx={{ marginTop: '40px' }} />
        <Box sx={{ margin: '0.25px 0px 50px', overflow: 'scroll' }}>
          <FlipMove>
            {messageRef.current.map(({ userId, message, messageId }) => {
              return (
                <Box
                  key={messageId}
                  sx={{ display: 'flex' }}
                  className={
                    userId === currentUserId ? 'chatbox-message ' : 'chatbox-message-others'
                  }
                >
                  <Box
                    sx={{
                      padding: '10px',
                      margin: '2.5px 0px',
                      borderRadius: '5px',
                      maxWidth: '220px',
                      overflowWrap: 'break-word'
                    }}
                  >
                    {userId === currentUserId ? (
                      <>
                        <span style={{ textAlign: 'right' }}>You</span>
                        <span>{message}</span>
                      </>
                    ) : (
                      <>
                        <span>{userId}</span>
                        <span>{message}</span>
                      </>
                    )}
                  </Box>
                </Box>
              );
            })}
            <Box ref={bottomMessageRef} />
          </FlipMove>
        </Box>
        <Box
          sx={{
            position: 'fixed',
            right: '0',
            bottom: '0',
            width: CHAT_DRAWER_WIDTH
          }}
        >
          <Divider />
          <input
            type="text"
            placeholder="Type your message here..."
            ref={inputRef}
            onKeyDown={handleKeyDown}
            style={{ width: '65%', margin: '10px', height: '22px' }}
          />
          <Button
            size={'small'}
            variant="contained"
            endIcon={<SendIcon />}
            type="button"
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
