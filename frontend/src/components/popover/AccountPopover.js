import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import MenuPopover from './MenuPopover';
import { MENU_OPTIONS } from '../../const/Popover';
import axios from 'axios';

import { URL_USER_SVC_LOGOUT } from '../../configs';
import { STATUS_CODE_OK, STATUS_CODE_UNAUTH, STATUS_CODE_BADREQ } from '../../constants';
import { useAuth } from '../../hooks/useAuth';

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const auth = useAuth();
  let username = null;
  let token = null;
  try {
    username = auth.user.username;
    token = auth.user.token;
  } catch {
    username = '';
    token = '';
  }

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    const res = await axios
      .post(URL_USER_SVC_LOGOUT, { username, token }, { withCredentials: true })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_BADREQ) {
          console.log('Request could not be processed.');
          handleClose();
        } else if (err.response.status === STATUS_CODE_UNAUTH) {
          auth.logout();
          handleClose();
        } else {
          console.log('Server Error.');
          handleClose();
        }
      });
    if (res && res.status === STATUS_CODE_OK) {
      auth.logout();
    }
    handleClose();
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: 'rgba(22, 28, 36, 0.8)'
            }
          })
        }}
      >
        <Avatar src={'/static/avatar_default.jpeg'} alt="User Avatar" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75
          }
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700 }}>
            {username.toUpperCase()}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={Link} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
