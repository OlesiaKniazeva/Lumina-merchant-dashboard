import { Box, Typography, Button } from '@mui/material';
import Layout from '../layouts/layout';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Layout>
      <Box textAlign="center" mt={5}>
        <Typography variant="h1" color="error" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Typography variant="body1" gutterBottom>
          It seems we can’t find the page you’re looking for. You might want to
          check the URL or return to the home page.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{ mt: 2 }}
        >
          Go Home
        </Button>
      </Box>
    </Layout>
  );
}

export default ErrorPage;
