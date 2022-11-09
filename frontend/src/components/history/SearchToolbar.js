import { Box } from '@mui/material';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';

export default function SearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
}
