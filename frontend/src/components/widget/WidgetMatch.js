import { Card, Typography } from '@mui/material';
import ModalMatch from '../ModalMatch';

export default function WidgetMatch({
  title = '',
  subTitle = '',
  color = '#000',
  bgColor = '#FFF',
  sx,
  ...others
}) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: color,
        bgcolor: bgColor,
        borderRadius: '16px',
        ...sx
      }}
      {...others}
    >
      <ModalMatch />

      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Public Sans", sans-serif',
          fontSize: '1.7rem',
          fontWeight: '700',
          lineHeight: '1.5'
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{
          opacity: 0.72,
          fontWeight: '600'
        }}
      >
        {subTitle}
      </Typography>
    </Card>
  );
}
