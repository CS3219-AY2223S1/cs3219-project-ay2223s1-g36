import { Box } from '@mui/material';
import { Icon } from '@iconify/react';

export default function Iconify({ icon, ...others }) {
  return <Box component={Icon} icon={icon} {...others} />;
}
