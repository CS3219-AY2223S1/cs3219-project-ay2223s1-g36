import { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';

const Page = forwardRef(({ title = '', children, meta, ...others }, ref) => (
  <>
    <Helmet>
      <title>{`${title} | CodePair`}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...others}>
      {children}
    </Box>
  </>
));

Page.displayName = 'Page';
export default Page;
