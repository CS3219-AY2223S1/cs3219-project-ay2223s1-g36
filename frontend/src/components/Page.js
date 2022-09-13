import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
import { Box } from '@mui/material';
import { DRAWER_WIDTH } from '../const/Size';

const Page = forwardRef(({ children, title = '', meta, navbar = true, ...others }, ref) => (
  <>
    <Helmet>
      <title>{`${title} | PeerPrep`}</title>
      {meta}
    </Helmet>

    {navbar ? (
      <Box
        ref={ref}
        {...others}
        sx={{
          '@media only screen and (min-width: 1200px)': {
            width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
            marginLeft: `${DRAWER_WIDTH}px`
          }
        }}
      >
        {children}
      </Box>
    ) : (
      <Box ref={ref} {...others}>
        {children}
      </Box>
    )}
  </>
));

Page.displayName = 'Page';
export default Page;
