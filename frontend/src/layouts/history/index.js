import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import WidgetMini from '../../components/widget/WidgetMini';

export default function AttemptLayout() {
  // TODO: Add as props: date, language, match, qid, code
  const questionId = 1234;
  const code = 'hi there';
  const date = '10/10/22';
  const language = 'Python';
  const match = 'dummy';
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
          <WidgetMini>Matched with: @{match}</WidgetMini>
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
