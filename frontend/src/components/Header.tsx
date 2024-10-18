import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  InputBase,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';

const SearchBar = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '5px 10px',
  borderRadius: theme.shape.borderRadius,
  border: '2px solid',
  borderColor: theme.palette.secondary.main,
  width: '400px',
}));

const Link = styled('a')({
  marginRight: '20px',
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: '1rem',
});

function Header() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="h6">Lasto</Typography>

        <SearchBar placeholder="Find something..." />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'flex-end',
            marginRight: 2,
          }}
        >
          <Link href="/advertisements">Advertisements</Link>
          <Link href="/orders">Orders</Link>
        </Box>

        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
          New Advertisement
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
