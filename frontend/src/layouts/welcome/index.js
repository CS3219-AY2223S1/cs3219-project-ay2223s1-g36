import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { URL_USER_SVC_REG, URL_USER_SVC_LOGIN } from '../../configs';
import {
  STATUS_CODE_CREATED,
  STATUS_CODE_OK,
  STATUS_CODE_BADREQ,
  STATUS_CODE_UNAUTH,
  STATUS_CODE_CONFLICT
} from '../../constants';

export default function WelcomeLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname == '/welcome') {
      navigate('/welcome/login');
    }
  }, [pathname]);

  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
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
        {pathname === '/welcome/signup' && (
          <Outlet context={{ username, setUsername, password, setPassword, handleSignup }} />
        )}
        {pathname === '/welcome/login' && (
          <Outlet context={{ username, setUsername, password, setPassword, handleLogin }} />
        )}

        <Dialog maxWidth={'xs'} open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {!isLoginSuccess || !isSignupSuccess ? (
              <Button onClick={closeDialog}>Try Again</Button>
            ) : (
              <Button component={Link} to="/login">
                Log in
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
