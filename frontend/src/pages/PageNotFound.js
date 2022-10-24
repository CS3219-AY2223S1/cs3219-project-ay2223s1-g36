import { Box, Typography } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';

function PageNotFound() {
  const { pathname } = useLocation();
  if (pathname.indexOf('/login') > -1) {
    return <Navigate replace to={'/welcome/login'} />;
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
          textAlign: 'center',
          mx: 'auto',
          width: '50%'
        }}
      >
        <Typography
          variant="h1"
          sx={{
            mb: 5,
            fontFamily: 'Public Sans,sans-serif',
            fontWeight: '700',
            lineHeight: '1.5'
          }}
        >
          Page Not Found
        </Typography>
      </Box>
    </Box>
  );
}

export default PageNotFound;
