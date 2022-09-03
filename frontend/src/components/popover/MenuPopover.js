import { Popover } from '@mui/material';

export default function MenuPopover({ children, sx, ...others }) {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: '200px',
          overflow: 'inherit',
          ...sx
        }
      }}
      {...others}
    >
      {children}
    </Popover>
  );
}
