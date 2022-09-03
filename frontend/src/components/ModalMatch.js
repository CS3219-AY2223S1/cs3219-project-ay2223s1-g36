import { useState } from 'react';
import Button from '@mui/material/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid
} from '@mui/material';
import WidgetSummary from './widget/WidgetSummary';

export default function ModalMatch() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          background: 'linear-gradient(to right, #fc4a1a, #f7b733)'
        }}
        sx={{
          marginTop: '16px',
          marginBottom: '36px',
          bgColor: '#f12711'
        }}
        color="info"
        onClick={handleOpen}
      >
        Find Match
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          marginTop: 'auto',
          marginBottom: 'auto'
        }}
      >
        <DialogTitle
          sx={{
            fontSize: '1.6rem',
            fontWeight: '700',
            lineHeight: '1.5'
          }}
        >
          Choose your difficulty
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                sx={{
                  '& div': {
                    '&:hover': {
                      background: 'rgb(209, 225, 252)',
                      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                      cursor: 'pointer'
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                      boxShadow: '3px 2px 22px 1px rgba(0, 0, 0, 0.24)'
                    }
                  }
                }}
              >
                <WidgetSummary
                  title="Easy"
                  subTitle="Suitable for Beginners"
                  color={'rgb(6, 27, 100)'}
                  bgColor={'rgb(209, 233, 252)'}
                  icon={'eva:edit-2-outline'}
                  sx={{
                    height: '155px'
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                sx={{
                  '& div': {
                    '&:hover': {
                      background: 'rgb(255, 239, 205)',
                      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                      cursor: 'pointer'
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                      boxShadow: '3px 2px 22px 1px rgba(0, 0, 0, 0.24)'
                    }
                  }
                }}
              >
                <WidgetSummary
                  title="Medium"
                  subTitle="Suitable for Regulars"
                  color={'rgb(122, 79, 1)'}
                  bgColor={'rgb(255, 247, 205)'}
                  icon={'ant-design:code-outlined'}
                  sx={{
                    height: '155px'
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                sx={{
                  '& div': {
                    '&:hover': {
                      background: 'rgb(255, 222, 217)',
                      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                      cursor: 'pointer'
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                      boxShadow: '3px 2px 22px 1px rgba(0, 0, 0, 0.24)'
                    }
                  }
                }}
              >
                <WidgetSummary
                  title="Hard"
                  subTitle="Suitable for Pros"
                  color={'rgb(122, 12, 46)'}
                  bgColor={'rgb(255, 231, 217)'}
                  icon={'eva:flash-outline'}
                  sx={{
                    height: '155px'
                  }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            marginBottom: '20px'
          }}
        >
          <Button variant="contained" onClick={handleClose} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
