import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';
import useModal from '../hooks/useModal';
import AdModal from './AdModal';

const Link = styled('a')({
  marginRight: '20px',
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: '1rem',
});

function Header() {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Typography>Lasto</Typography>

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

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openModal}
        >
          New Advertisement
        </Button>
      </Toolbar>
      <AdModal open={isOpen} handleClose={closeModal} />
    </AppBar>
  );
}

export default Header;
