import SimpleBarReact from 'simplebar-react';
import { alpha, Box } from '@mui/material';
import { getUserAgent, isMobile } from '../../utils';

export default function Scrollbar({ children, sx, ...other }) {
  const userAgent = getUserAgent(navigator);

  if (isMobile(userAgent)) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <div sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
      <SimpleBarReact
        timeout={500}
        clickOnTrack={false}
        sx={{
          ...sx,
          maxHeight: '100%',
          '& .simplebar-scrollbar': {
            '&:before': {
              backgroundColor: alpha('#637381', 0.48)
            },
            '&.simplebar-visible:before': {
              opacity: 1
            }
          },
          '& .simplebar-track.simplebar-vertical': {
            width: 10
          },
          '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
            height: 6
          },
          '& .simplebar-mask': {
            zIndex: 'inherit'
          }
        }}
        {...other}
      >
        {children}
      </SimpleBarReact>
    </div>
  );
}
