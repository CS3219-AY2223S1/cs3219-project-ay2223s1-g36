import { Container, Typography } from '@mui/material';
import HistoryGrid from '../components/history/HistoryGrid';
import { useEffect, useState } from 'react';
import Page from '../components/Page';
import { useAttempt } from '../hooks/useAttempt';
import { useAuth } from '../hooks/useAuth';
import { formatDate } from '../utils/history';
import axios from 'axios';
import { URL_HIST_SVC_USER_HIST } from '../configs';
import { STATUS_CODE_OK, STATUS_SERVER_ERROR, STATUS_CODE_BADREQ } from '../constants';

export default function History() {
  const attempt = useAttempt();
  const auth = useAuth();
  const username = auth.user.username;
  const [rows, setRows] = useState([]);

  // To fetch list of past attempts from history service
  const handleHistoryFetch = async () => {
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
      res.data.map((item, index) => {
        item['list_id'] = index + 1;
        item['date'] = formatDate(item['createdAt']);
      });
      setRows(res.data);
      attempt.add(res.data);
    }
  };

  const handleRowClick = (params) => {
    window.open('./attempt/' + params.row.list_id);
  };

  useEffect(() => {
    handleHistoryFetch();
  }, [username]);

  return (
    <Page title="History">
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
          Submission History
        </Typography>

        <HistoryGrid rows={rows} handleRowClick={handleRowClick} />
      </Container>
    </Page>
  );
}
