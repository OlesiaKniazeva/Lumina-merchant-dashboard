import { Box, Typography, Button, useTheme } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

function ErrorComponent() {
  const theme = useTheme();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        py: 4,
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: 48,
          color: theme.palette.secondary.main,
        }}
      />
      <Typography
        sx={{
          color: theme.palette.custom.warmTones.header,
          fontFamily: theme.typography.fontFamily,
          fontWeight: 500,
          textAlign: 'center',
          mb: 2,
        }}
      >
        Something went wrong. Please try again later.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<RefreshIcon />}
        onClick={handleReload}
        sx={{
          fontFamily: theme.typography.fontFamily,
          textTransform: 'none',
          fontWeight: 500,
          px: 3,
          py: 1,
        }}
      >
        Reload Page
      </Button>
    </Box>
  );
}

export default ErrorComponent;
