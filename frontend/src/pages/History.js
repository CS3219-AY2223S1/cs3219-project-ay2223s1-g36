import { Box, Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import Page from '../components/Page';
import { qnHistoryCols, rows } from '../const/HistoryGrid';

export default function History() {
  const [pageSize, setPageSize] = useState(10);

  const handleRowClick = (params) => {
    console.log(params.row.qid);
    // TODO: open to page containing submission details and code
    // sample page
    window.open('./attempt', '_blank');
  };

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
