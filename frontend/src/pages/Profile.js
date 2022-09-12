import {
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
import { URL_USER_SVC } from '../configs';
import { STATUS_CODE_CONFLICT, STATUS_CODE_CREATED } from '../constants';

export default function Profile() {
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  // const getUser = async () => {
  //   const res = await axios.post(URL_USER_SVC_LOGIN, { username, password }).catch((err) => {
  //     if (err.response.status === STATUS_CODE_UNAUTH) {
  //       setErrorDialog('Incorrect credentials');
  //     } else {
  //       setErrorDialog('Please try again later');
  //     }
  //   });
  //   if (res && res.status === STATUS_CODE_OK) {
  //     getJWT(res);
  //     setSuccessDialog('Successfully logged in!');
  //     setIsLoginSuccess(true);
  //   }
  // };

  const handlePWchange = async () => {
    setIsDeleteSuccess(false);
    // const res = await axios.post(URL_USER_SVC, { username, password }).catch((err) => {
    const res = await axios.post(URL_USER_SVC, {}).catch((err) => {
      if (err.response.status === STATUS_CODE_CONFLICT) {
        setErrorDialog('This username already exists');
      } else {
        setErrorDialog('Please try again later');
      }
    });
    if (res && res.status === STATUS_CODE_CREATED) {
      setSuccessDialog('Account successfully deleted');
      setIsDeleteSuccess(true);
    }
  };
  const handleAccDelete = async () => {
    setIsDeleteSuccess(false);
    // const res = await axios.post(URL_USER_SVC, { username, password }).catch((err) => {
    const res = await axios.post(URL_USER_SVC, {}).catch((err) => {
      if (err.response.status === STATUS_CODE_CONFLICT) {
        setErrorDialog('This username already exists');
      } else {
        setErrorDialog('Please try again later');
      }
    });
    if (res && res.status === STATUS_CODE_CREATED) {
      setSuccessDialog('Account successfully deleted');
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginRight: '2rem', width: '30%' }}
              />
              <Button variant={'contained'} color={'info'} onClick={handlePWchange}>
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
            {isDeleteSuccess ? (
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
