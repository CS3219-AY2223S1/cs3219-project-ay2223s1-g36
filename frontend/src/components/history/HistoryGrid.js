import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchToolbar from './SearchToolbar';
import { qnHistoryCols } from '../../const/HistoryGrid';
import { useState } from 'react';

export default function HistoryGrid({ rows, handleRowClick }) {
  const [pageSize, setPageSize] = useState(10);

  return (
    <Box sx={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={qnHistoryCols}
        components={{
          Toolbar: SearchToolbar
        }}
        onCellClick={handleRowClick}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
      />
    </Box>
  );
}
