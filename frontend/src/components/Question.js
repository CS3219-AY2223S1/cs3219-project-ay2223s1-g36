import { colors, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { qn_data } from '../dummy/qn_data';

export default function Question() {
  const getDiffColour = (level) => {
    switch (level.toLowerCase()) {
      case 'easy':
        return colors.green[500];
      case 'medium':
        return colors.orange[500];
      case 'hard':
        return colors.red[500];
      default:
        return colors.grey[500];
    }
  };

  return (
    <Box>
      {qn_data.map((Qn_JSON, index) => {
        return (
          <Box
            key={index}
            sx={{
              padding: 3
            }}
          >
            <Typography
              variant="h6"
              sx={{
                my: 1,
                fontFamily: 'Public Sans,sans-serif',
                fontWeight: '700'
              }}
            >
              {Qn_JSON.title}
            </Typography>
            <Typography sx={{ color: getDiffColour(Qn_JSON.difficulty) }}>
              {Qn_JSON.difficulty}
            </Typography>
            <Typography variant="body1">{Qn_JSON.content}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}
