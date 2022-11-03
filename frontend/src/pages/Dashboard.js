import { Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Page from '../components/Page';
import WidgetMatch from '../components/widget/WidgetMatch';
import WidgetSummary from '../components/widget/WidgetSummary';
import { URL_HIST_SVC_USER_HIST } from '../configs';
import { STATUS_CODE_BADREQ, STATUS_CODE_OK, STATUS_SERVER_ERROR } from '../constants';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const auth = useAuth();
  const username = auth.user.username;
  const [submissionCount, setSubmissionCount] = useState(0);

  // To fetch past attempts count
  const handleSubmissionCountFetch = async () => {
    const res = await axios.get(URL_HIST_SVC_USER_HIST + username).catch((err) => {
      if (
        err.response.status === STATUS_CODE_BADREQ ||
        err.response.status === STATUS_SERVER_ERROR
      ) {
        console.log(err);
      } else {
        console.log('Please try again later');
      }
    });
    if (res && res.status === STATUS_CODE_OK) {
      let submissionArray = res.data;
      setSubmissionCount(submissionArray?.length || 0);
    }
  };

  useEffect(() => {
    handleSubmissionCountFetch();
  }, [username]);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          sx={{
            mb: 5,
            fontSize: '1.25rem',
            fontFamily: 'Public Sans,sans-serif',
            fontWeight: '700',
            lineHeight: '1.5',
            '@media only screen and (min-width: 600px)': {
              fontSize: '1.5rem'
            }
          }}
        >
          Hi {username.toUpperCase()}, welcome back!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <WidgetMatch
              subTitle="Practice coding with a partner"
              title={'Start cracking!'}
              color={'rgb(122, 12, 46)'}
              bgColor={'rgb(255, 231, 217)'}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <WidgetSummary
              subTitle="Total Submissions"
              title={submissionCount}
              color={'rgb(122, 79, 1)'}
              bgColor={'rgb(255, 247, 205)'}
              icon={'ant-design:code-outlined'}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
