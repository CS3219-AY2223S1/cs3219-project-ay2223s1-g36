import { Avatar, Badge } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  USER_STATUS_DISCONNECTED,
  USER_STATUS_OFFLINE,
  USER_STATUS_ONLINE
} from '../const/UserStatus';

export default function UserOnlineStatus({ collabSocket }) {
  const [userOnlineStatus, setUserOnlineStatus] = useState(
    localStorage.getItem('partner_status') || USER_STATUS_ONLINE
  );
  useEffect(() => {
    collabSocket.on('user:leave', () => {
      setUserOnlineStatus(USER_STATUS_OFFLINE);
      localStorage.setItem('partner_status', USER_STATUS_OFFLINE);
    });

    collabSocket.on('user:disconnect', () => {
      setUserOnlineStatus(USER_STATUS_DISCONNECTED);
      localStorage.setItem('partner_status', USER_STATUS_DISCONNECTED);
    });

    collabSocket.on('room:join:success', (totalUsers) => {
      if (userOnlineStatus === USER_STATUS_OFFLINE) {
        return;
      }
      if (totalUsers === 2) {
        setUserOnlineStatus(USER_STATUS_ONLINE);
        localStorage.setItem('partner_status', USER_STATUS_ONLINE);
      }
    });
  }, []);

  return userOnlineStatus !== USER_STATUS_OFFLINE ? (
    userOnlineStatus === USER_STATUS_ONLINE ? (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        sx={{
          float: 'right',
          margin: '10px',
          '& .MuiBadge-badge': {
            boxShadow: `0 0 0 2px #FFF`,
            '&::after': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              color: '#44b700',
              backgroundColor: '#44b700',
              border: '1px solid currentColor',
              content: '""'
            }
          }
        }}
      >
        <Avatar src={'/static/avatar_default.jpeg'} alt="User Avatar" sx={{ float: 'right' }} />
      </Badge>
    ) : (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        sx={{
          float: 'right',
          margin: '10px',
          '& .MuiBadge-badge': {
            boxShadow: `0 0 0 2px #FFF`,
            '&::after': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              color: '#767676',
              backgroundColor: '#767676',
              border: '1px solid currentColor',
              content: '""'
            }
          }
        }}
      >
        <Avatar src={'/static/avatar_default.jpeg'} alt="User Avatar" sx={{ float: 'right' }} />
      </Badge>
    )
  ) : null;
}
