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
  const username = auth.user.username;

  const [open, setOpen] = useState(null);
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    setIsLogoutSuccess(false);
    const res = await axios
      .post(URL_USER_SVC_LOGOUT, { username }, { withCredentials: true })
      .catch((err) => {
        if (
          err.response.status === STATUS_CODE_BADREQ ||
          err.response.status === STATUS_CODE_UNAUTH
        ) {
          handleClose();
        } else {
          handleClose();
        }
      });
    if (res && res.status === STATUS_CODE_OK) {
      auth.logout();
      document.cookie = 'token=';
      setIsLogoutSuccess(true);
      console.log(isLogoutSuccess);
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
          <Typography variant="subtitle2" noWrap>
            {username.toUpperCase()}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgb(99, 115, 129)' }} noWrap>
            kewen@peerprep.org
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
