import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        p: 1,
        backgroundColor: 'secondary.main',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">© 2024 Lasto</Typography>
    </Box>
  );
}

export default Footer;
