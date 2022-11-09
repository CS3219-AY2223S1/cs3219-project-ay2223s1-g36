import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';

export default function SignupPage() {
  const { username, setUsername, password, setPassword, handleSignup } = useOutletContext();
  return (
    <>
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
        Already have an account? <Link href="/welcome/login">Log in!</Link>
      </Typography>
    </>
  );
}
