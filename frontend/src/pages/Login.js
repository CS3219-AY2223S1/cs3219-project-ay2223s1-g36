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
import { URL_USER_SVC_LOGIN } from '../configs';
import { STATUS_CODE_OK, STATUS_CODE_UNAUTH } from '../constants';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleLogin = async () => {
    setIsLoginSuccess(false);
    const res = await axios.post(URL_USER_SVC_LOGIN, { username, password }).catch((err) => {
      if (err.response.status === STATUS_CODE_UNAUTH) {
        setErrorDialog('Incorrect credentials');
      } else {
        setErrorDialog('Please try again later');
      }
    });
    if (res && res.status === STATUS_CODE_OK) {
      auth.login({ username: username, token: res.data.token });
      localStorage.setItem('token', res.data.token);
      setIsLoginSuccess(true);
    }
  };

  const closeDialog = () => setIsDialogOpen(false);

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true);
    setDialogTitle('Error');
    setDialogMsg(msg);
  };

  if (isLoginSuccess) {
    return <Navigate replace to="/" />;
  }

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
          Log In
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
          <Button variant={'contained'} onClick={handleLogin}>
            Log In
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Are you a new user? <Link href="/signup">Sign up!</Link>
        </Typography>

        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {isLoginSuccess ? (
              <Button onClick={closeDialog}>Close</Button>
            ) : (
              <Button onClick={closeDialog}>Try Again</Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default LoginPage;
