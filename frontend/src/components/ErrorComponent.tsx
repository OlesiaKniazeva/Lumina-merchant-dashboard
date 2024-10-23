import { Button, Box, Typography } from '@mui/material';

interface ErrorComponentProps {
  message?: string;
  onRetry?: () => void;
}

function ErrorComponent({ message, onRetry }: ErrorComponentProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h6" color="error" gutterBottom>
        {message || 'Something went wrong. Please try again.'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onRetry ? onRetry : () => window.location.reload()}
      >
        {onRetry ? 'Retry' : 'Reload Page'}
      </Button>
    </Box>
  );
}

export default ErrorComponent;
