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

import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_USER_SVC_REG } from '../configs';
import { STATUS_CODE_CONFLICT, STATUS_CODE_BADREQ, STATUS_CODE_CREATED } from '../constants';
import { Link as routeLink } from 'react-router-dom';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSignup();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [username, password]);

  const validatePasswordStrength = (pw) => {
    // min length 6, at least 1 numeric value, 1 uppercase, 1 lowercase
    let re = /(?=^.{6,}$)(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return re.test(pw);
  };

  const handleSignup = async () => {
    if (!validatePasswordStrength(password)) {
      setErrorDialog(
        'Password must be minimum 6 characters long, and contain at least 1 digit, 1 uppercase AND 1 lowercase character.'
      );
      return;
    }

    setIsSignupSuccess(false);
    const res = await axios.post(URL_USER_SVC_REG, { username, password }).catch((err) => {
      if (err.response.status === STATUS_CODE_BADREQ || STATUS_CODE_CONFLICT) {
        setErrorDialog(err.response.data.message);
      } else {
        setErrorDialog('Please try again later');
      }
    });
    if (res && res.status === STATUS_CODE_CREATED) {
      setSuccessDialog('Account successfully created!');
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
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link href="/login">Log in!</Link>
        </Typography>

        <Dialog maxWidth={'xs'} open={isDialogOpen} onClose={closeDialog}>
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
