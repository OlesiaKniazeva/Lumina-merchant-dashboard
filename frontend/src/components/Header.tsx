import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';
import useModal from '../hooks/useModal';
import AdModal from './AdModal';

const StyledLink = styled(Link)<{ active?: string }>(({ theme, active }) => ({
  marginRight: '20px',
  textDecoration: 'none',
  color: active ? theme.palette.secondary.main : theme.palette.text.primary,
  fontWeight: active ? 'bold' : 'normal',
  cursor: active ? 'default' : 'pointer',
  fontSize: '1rem',
  pointerEvents: active ? 'none' : 'auto',
  borderBottom: active ? `2px solid ${theme.palette.secondary.main}` : 'none',
  paddingBottom: '6px',
  paddingTop: '6px',
  transition: 'color 0.3s',
  '&:hover': {
    color: !active ? theme.palette.secondary.main : undefined,
  },
}));

function Header() {
  const { isOpen, openModal, closeModal } = useModal();
  const location = useLocation();

  const isAdvertisementsPage = location.pathname === '/advertisements';
  const isOrdersPage = location.pathname === '/orders';

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Typography
          component={isAdvertisementsPage ? 'div' : Link} // Disable if on advertisements page
          to={isAdvertisementsPage ? undefined : '/advertisements'}
          variant="h4"
          sx={{
            color: 'secondary.main',
            fontWeight: 'bold',
            textDecoration: 'none',
            cursor: isAdvertisementsPage ? 'default' : 'pointer',
            pointerEvents: isAdvertisementsPage ? 'none' : 'auto',
          }}
        >
          Lasto
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'flex-end',
            marginRight: 2,
          }}
        >
          <StyledLink
            to="/advertisements"
            active={isAdvertisementsPage ? 'true' : undefined}
          >
            Advertisements
          </StyledLink>
          <StyledLink to="/orders" active={isOrdersPage ? 'true' : undefined}>
            Orders
          </StyledLink>
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
