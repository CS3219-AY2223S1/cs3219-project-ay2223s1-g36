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
import { validatePasswordStrength } from '../../utils/user';

export default function WelcomeLayout() {
  const { pathname } = useLocation();
  const LOGIN_PATH = '/welcome/login';
  const SIGNUP_PATH = '/welcome/signup';
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname == '/welcome') {
      navigate(LOGIN_PATH);
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
        if (pathname === LOGIN_PATH) handleLogin();
        if (pathname === SIGNUP_PATH) handleSignup();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [username, password]);

  const handleSignup = async () => {
    if (password != '' && !validatePasswordStrength(password)) {
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
    let prefix = pathname === LOGIN_PATH ? 'Log In ' : 'Sign Up ';
    setDialogTitle(prefix + 'Error');
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
        {pathname === SIGNUP_PATH && (
          <Outlet context={{ username, setUsername, password, setPassword, handleSignup }} />
        )}
        {pathname === LOGIN_PATH && (
          <Outlet context={{ username, setUsername, password, setPassword, handleLogin }} />
        )}

        <Dialog maxWidth={'xs'} open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {isSignupSuccess || isLoginSuccess ? (
              <Button component={Link} to="/login">
                Log in
              </Button>
            ) : (
              <Button onClick={closeDialog}>Try Again</Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
