import { Container, Grid, Typography } from '@mui/material';
import Page from '../components/Page';
import WidgetMatch from '../components/widget/WidgetMatch';
import WidgetSummary from '../components/widget/WidgetSummary';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const auth = useAuth();
  const username = auth.user.username;
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          sx={{
            mb: 5,
            fontSize: '1.25rem',
            fontFamily: 'Public Sans,sans-serif',
            fontWeight: '700',
            lineHeight: '1.5',
            '@media only screen and (min-width: 600px)': {
              fontSize: '1.5rem'
            }
          }}
        >
          Hi {username.toUpperCase()}, welcome back!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <WidgetMatch
              subTitle="Users Online"
              title={714000}
              color={'rgb(122, 12, 46)'}
              bgColor={'rgb(255, 231, 217)'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <WidgetSummary
              subTitle="Weekly Solves"
              title={12000}
              color={'rgb(122, 79, 1)'}
              bgColor={'rgb(255, 247, 205)'}
              icon={'ant-design:code-outlined'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <WidgetSummary
              subTitle="Weekly Unique Encounter"
              title={1000}
              color={'rgb(6, 27, 100)'}
              bgColor={'rgb(209, 233, 252)'}
              icon={'ant-design:user-outlined'}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
