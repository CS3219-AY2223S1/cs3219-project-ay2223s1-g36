import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { URL_USER_SVC_REG } from '../configs';
import { STATUS_CODE_CONFLICT, STATUS_CODE_CREATED } from '../constants';
import { Link as routeLink } from 'react-router-dom';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const handleSignup = async () => {
    setIsSignupSuccess(false);
    const res = await axios.post(URL_USER_SVC_REG, { username, password }).catch((err) => {
      if (err.response.status === STATUS_CODE_CONFLICT) {
        setErrorDialog('This username already exists');
      } else {
        setErrorDialog('Please try again later');
      }
    });
    if (res && res.status === STATUS_CODE_CREATED) {
      setSuccessDialog('Account successfully created');
      setIsSignupSuccess(true);
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

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        height: '100vh'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mx: 'auto',
          width: '30%'
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 5,
            fontSize: '2rem',
            fontFamily: 'Public Sans,sans-serif',
            fontWeight: '700',
            lineHeight: '1.5',
            '@media only screen and (min-width: 600px)': {
              fontSize: '1.5rem'
            }
          }}
        >
          Sign Up
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginBottom: '1rem' }}
          autoFocus
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: '2rem' }}
        />
        <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
          <Button variant={'contained'} onClick={handleSignup}>
            Sign up
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Already have an account? <Link href="/login">Log in!</Link>
        </Typography>

        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {isSignupSuccess ? (
              <Button component={routeLink} to="/login">
                Log in
              </Button>
            ) : (
              <Button onClick={closeDialog}>Done</Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default SignupPage;
