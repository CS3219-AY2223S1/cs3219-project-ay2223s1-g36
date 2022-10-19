import { Box, Typography } from '@mui/material';

export default function WidgetMini(props) {
  return (
    <Box sx={{ mb: 1, ml: 1.5, cursor: 'pointer' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 15px',
          borderRadius: '12px',
          backgroundColor: 'rgba(145, 158, 171, 0.12)',
          maxWidth: '400px'
        }}
      >
        <Box sx={{ ml: 0.5, mr: 0.5 }}>
          <Typography variant="subtitle2" sx={{ color: 'rgb(33, 43, 54)', fontWeight: '600' }}>
            {props.children}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
