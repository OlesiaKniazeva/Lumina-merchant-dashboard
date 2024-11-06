import { Box, Typography, useTheme } from '@mui/material';

function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        p: 1.5,
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontWeight: 500,
        }}
      >
        © 2024 Lumina
      </Typography>
    </Box>
  );
}

export default Footer;
