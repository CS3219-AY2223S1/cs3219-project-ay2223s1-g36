import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import Page from '../components/Page';
import { useState } from 'react';
import axios from 'axios';
import { URL_USER_SVC_DELETE, URL_USER_SVC_UPDATEPW } from '../configs';
import { STATUS_CODE_OK, STATUS_CODE_UNAUTH, STATUS_CODE_BADREQ } from '../constants';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const auth = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
  const [isPWChangeSuccess, setIsPWChangeSuccess] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const username = auth.user.username;

  const handlePWchange = async () => {
    setIsPWChangeSuccess(false);
    const res = await axios
      .post(URL_USER_SVC_UPDATEPW, { username, newPassword }, { withCredentials: true })
      .catch((err) => {
        if (
          err.response.status === STATUS_CODE_BADREQ ||
          err.response.status === STATUS_CODE_UNAUTH
        ) {
          setErrorDialog(res.data.message);
        } else {
          setErrorDialog('Please try again later');
        }
      });
    if (res && res.status === STATUS_CODE_OK) {
      setSuccessDialog(res.data.message);
      setIsPWChangeSuccess(true);
    }
  };
  const handleAccDelete = async () => {
    setIsDeleteSuccess(false);
    const res = await axios
      .post(URL_USER_SVC_DELETE, { username }, { withCredentials: true })
      .catch((err) => {
        if (
          err.response.status === STATUS_CODE_BADREQ ||
          err.response.status === STATUS_CODE_UNAUTH
        ) {
          setErrorDialog(res.data.message);
        } else {
          setErrorDialog('Please try again later');
        }
      });
    if (res && res.status === STATUS_CODE_OK) {
      setSuccessDialog(res.data.message);
      setIsDeleteSuccess(true);
    }
  };

  const closeDialog = () => setIsDialogOpen(false);

  const setSuccessDialog = (msg) => {
    setIsDialogOpen(true);
    setDialogTitle('Success');
    setDialogMsg(msg);
  };

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true);
    setDialogTitle('Error');
    setDialogMsg(msg);
  };

  const subheading_style = {
    mb: 2,
    fontSize: '1.15rem',
    fontFamily: 'Public Sans,sans-serif',
    fontWeight: '700',
    lineHeight: '1.5',
    '@media only screen and (min-width: 600px)': {
      fontSize: '1.1rem'
    }
  };

  if (isDeleteSuccess) {
    return <Navigate replace to="/signup" />;
  }

  return (
    <Page title="Profile">
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          sx={{
            mb: 5,
            fontSize: '1.25rem',
            fontFamily: 'Public Sans,sans-serif',
            fontWeight: '700',
            lineHeight: '1.5',
            '@media only screen and (min-width: 600px)': {
              fontSize: '1.5rem'
            }
          }}
        >
          Profile
        </Typography>

        <Box
          sx={{
            my: 2,
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderRadius: '12px',
            backgroundColor: 'rgba(145, 158, 171, 0.12)'
          }}
        >
          <Avatar src={'/static/avatar_default.jpeg'} alt="User Avatar" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'rgb(33, 43, 54)', fontWeight: '600' }}>
              Username: {username}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgb(99, 115, 129)',
                fontWeight: '600',
                fontSize: '0.75rem'
              }}
            >
              Amateur
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h5" sx={subheading_style}>
              Change Password
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Enter a new password below and click on Change Password to update your password.
            </Typography>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}>
              <TextField
                label="Password"
                variant="outlined"
                size="small"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ marginRight: '2rem', width: '30%' }}
              />
              <Button
                variant={'contained'}
                color={'info'}
                onClick={handlePWchange}
                disabled={newPassword.length == 0}
              >
                Change password
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h5" sx={subheading_style}>
              Account Removal
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Click the button below if you would like to delete your account. This process is
              permanent and non-reversible.
            </Typography>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'start'}>
              <Button variant={'contained'} color={'error'} onClick={handleAccDelete}>
                Delete Account
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {isDeleteSuccess || isPWChangeSuccess ? (
              <Button onClick={closeDialog}>Done</Button>
            ) : (
              <Button onClick={closeDialog}>Try Again</Button>
            )}
          </DialogActions>
        </Dialog>
      </Container>
    </Page>
  );
}
