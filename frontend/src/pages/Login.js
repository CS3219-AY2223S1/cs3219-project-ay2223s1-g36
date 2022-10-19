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

import { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_USER_SVC_LOGIN } from '../configs';
import { STATUS_CODE_OK, STATUS_CODE_BADREQ, STATUS_CODE_UNAUTH } from '../constants';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleLogin();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [username, password]);

  const handleLogin = async () => {
    setIsLoginSuccess(false);
    const res = await axios.post(URL_USER_SVC_LOGIN, { username, password }).catch((err) => {
      if (err.response.status === STATUS_CODE_BADREQ || STATUS_CODE_UNAUTH) {
        setErrorDialog(err.response.data.message);
      } else {
        setErrorDialog('Please try again later');
      }
    });
    if (res && res.status === STATUS_CODE_OK) {
      console.log(res);
      auth.login({ username: username, token: res.data.token });
      setIsLoginSuccess(true);
    }
  };

  const closeDialog = () => setIsDialogOpen(false);

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
          <Button variant={'contained'} type={'submit'} onClick={handleLogin}>
            Log In
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Are you a new user? <Link href="/signup">Sign up!</Link>
          </Typography>
        </Box>

        <Dialog maxWidth={'xs'} open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {!isLoginSuccess && <Button onClick={closeDialog}>Try Again</Button>}
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
