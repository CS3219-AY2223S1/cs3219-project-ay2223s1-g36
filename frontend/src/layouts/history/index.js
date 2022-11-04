import { Box, Typography } from '@mui/material';
import { Outlet, useParams, Navigate } from 'react-router-dom';
import WidgetMini from '../../components/widget/WidgetMini';
import { useAttempt } from '../../hooks/useAttempt';

export default function AttemptLayout() {
  const { id } = useParams();
  const { questionId, code, date, language, partner } = useAttempt().attempt[id - 1] || {};
  if (!date && !language && !partner) {
    return <Navigate replace to={'/404'} />;
  }
  return (
    <>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
          <Typography
            variant="h4"
            sx={{
              color: 'black',
              fontSize: '1.25rem',
              fontFamily: 'Public Sans,sans-serif',
              fontWeight: '700',
              lineHeight: '1.5',
              '@media only screen and (min-width: 600px)': {
                fontSize: '1.5rem'
              }
            }}
          >
            Submission Details
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ px: 2.5, py: 3, display: 'inline-flex', alignItems: 'center' }}>
          <WidgetMini>Date of attempt: {date}</WidgetMini>
          <WidgetMini>Language: {language}</WidgetMini>
          <WidgetMini>Matched with: @{partner}</WidgetMini>
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          minHeight: '100%'
        }}
      >
        <Outlet context={{ questionId, code }} />
      </Box>
    </>
  );
}
