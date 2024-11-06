import { Box, Typography, Button, useTheme } from '@mui/material';
import Layout from '../layouts/layout';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Layout>
      <Box textAlign="center" mt={5}>
        <Typography
          variant="h1"
          sx={{
            color: theme.palette.secondary.main,
            fontFamily: theme.typography.h1.fontFamily,
            fontWeight: 600,
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.custom.warmTones.header,
            fontFamily: theme.typography.h5.fontFamily,
            fontWeight: 500,
            mb: 2,
          }}
        >
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.custom.warmTones.body,
            fontFamily: theme.typography.fontFamily,
            mb: 3,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          It seems we can't find the page you're looking for. You might want to
          check the URL or return to the home page.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGoHome}
          sx={{
            mt: 2,
            fontFamily: theme.typography.fontFamily,
            textTransform: 'none',
            fontWeight: 500,
            px: 4,
            py: 1,
          }}
        >
          Go Home
        </Button>
      </Box>
    </Layout>
  );
}

export default ErrorPage;
