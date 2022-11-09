import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import Iconify from '../Iconify';

const IconWrapperStyle = styled('div')(() => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: '64px',
  height: '64px',
  justifyContent: 'center',
  marginBottom: '24px'
}));

export default function WidgetSummary({
  title = '',
  subTitle = '',
  icon,
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
      <IconWrapperStyle
        sx={{
          color: color,
          backgroundImage: `linear-gradient(135deg, ${alpha(color, 0)} 0%,
            ${alpha(color, 0.2)} 100%)`
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

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
