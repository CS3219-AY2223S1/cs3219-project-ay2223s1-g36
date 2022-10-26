import { Box, Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Page from '../components/Page';
import { qnHistoryCols } from '../const/HistoryGrid';
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
  const [pageSize, setPageSize] = useState(10);
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
      setRows(res.data);
    }
  };

  // set attempt context for attempt page to refer to
  const handleRowClick = (params) => {
    attempt.add(params.row.id, {
      questionId: params.row.questionId,
      code: params.row.code,
      date: formatDate(params.row.createdAt),
      language: params.row.language,
      match: params.row.partner
    });
    window.open('./attempt/' + params.row.id);
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

        <Box sx={{ height: '80vh', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={qnHistoryCols}
            onCellClick={handleRowClick}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
          />
        </Box>
      </Container>
    </Page>
  );
}
