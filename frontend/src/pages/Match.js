import { Snackbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useOutletContext } from 'react-router-dom';
import Page from '../components/Page';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

export default function Match() {
  const { timer = 30, showExistingMatchToast = false } = useOutletContext();
  const [openMatchExistToast, setOpenMatchExistToast] = useState(showExistingMatchToast);

  const handleOnMatchExistToastClose = () => {
    setOpenMatchExistToast(false);
  };

  return (
    <Page title="Match" navbar={false}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openMatchExistToast}
        autoHideDuration={6000}
        sx={{ height: '35px' }}
      >
        <Alert
          variant="outlined"
          severity="success"
          sx={{ width: '100%', color: '#4caf50', fontWeight: '700' }}
          onClose={handleOnMatchExistToastClose}
        >
          Found an existing match...joining now!
        </Alert>
      </Snackbar>
      <Box>
        <Box
          sx={{
            background: 'rgb(13, 17, 23)',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: '700',
              lineHeight: '1.5',
              margin: '0 auto',
              fontFamily: 'Public Sans,sans-serif'
            }}
            className="jumping-dots"
          >
            <span className="dot-1">F</span>
            <span className="dot-2">i</span>
            <span className="dot-3">n</span>
            <span className="dot-4">d</span>
            <span className="dot-5">i</span>
            <span className="dot-6">n</span>
            <span className="dot-7">g</span>
            <span className="dot-8"> </span>
            <span className="dot-9">y</span>
            <span className="dot-10">o</span>
            <span className="dot-11">u</span>
            <span className="dot-12"> </span>
            <span className="dot-13">a</span>
            <span className="dot-14"> </span>
            <span className="dot-15">m</span>
            <span className="dot-16">a</span>
            <span className="dot-17">t</span>
            <span className="dot-18">c</span>
            <span className="dot-19">h</span>
            <span className="dot-20">.</span>
            <span className="dot-21">.</span>
            <span className="dot-22">.</span>
          </Typography>
          <Typography
            sx={{
              color: 'white',
              fontSize: '6rem',
              fontWeight: '700',
              lineHeight: '1.5',
              margin: '0 auto',
              fontFamily: 'Public Sans,sans-serif'
            }}
          >
            {timer >= 0 ? timer : 0}
          </Typography>
          <img
            src={'/static/astronaut.svg'}
            alt="Floating Astronaut"
            style={{ margin: '0 auto' }}
          />
        </Box>
      </Box>
    </Page>
  );
}
