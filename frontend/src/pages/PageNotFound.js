import { Box, Typography } from '@mui/material';
function PageNotFound() {
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
