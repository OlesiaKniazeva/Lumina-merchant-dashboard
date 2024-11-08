import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import useModal from '@hooks/useModal';
import AdModal from '@components/AdModal';
import { useState } from 'react';
import { ElementType } from 'react';
import { Theme } from '@mui/material/styles';

const StyledLink = styled(Link)<{ active?: string }>(({ theme, active }) => ({
  marginRight: '24px',
  textDecoration: 'none',
  color: active ? theme.palette.custom.logo : theme.palette.text.primary,
  fontWeight: active ? 600 : 500,
  fontSize: '1.1rem',
  fontFamily: "'Inter', sans-serif",
  cursor: active ? 'default' : 'pointer',
  pointerEvents: active ? 'none' : 'auto',
  borderBottom: active ? `2px solid ${theme.palette.custom.logo}` : 'none',
  paddingBottom: '8px',
  paddingTop: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: !active ? theme.palette.custom.logo : undefined,
    transform: !active ? 'translateY(-1px)' : undefined,
  },
}));

const Logo = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isHome' && prop !== 'component',
})<{
  component?: ElementType;
  to?: string;
  theme?: Theme;
  isHome?: boolean;
}>(({ theme, isHome }) => {
  if (!theme) throw new Error('Theme is required');

  return {
    color: theme.palette.custom.logo,
    fontWeight: theme.typography.logo.fontWeight,
    textDecoration: 'none',
    fontSize: '2.75rem',
    letterSpacing: theme.typography.logo.letterSpacing,
    lineHeight: 1,
    fontFamily: "'Gilda Display', serif",
    transition: 'opacity 0.2s ease',
    cursor: isHome ? 'default' : 'pointer',
    '&:hover': {
      opacity: isHome ? 1 : 0.85,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.only('sm')]: {
      fontSize: '2.5rem',
    },
  };
});

const DesktopNav = ({ isAdvertisementsPage, isOrdersPage }: NavProps) => (
  <Box
    sx={{
      display: { xs: 'none', md: 'flex' },
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'flex-end',
      marginRight: 3,
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
);

const MobileNav = ({
  isAdvertisementsPage,
  isOrdersPage,
  anchorEl,
  open,
  handleMenuClick,
  handleMenuClose,
}: NavProps & {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
}) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}
      >
        <IconButton
          onClick={handleMenuClick}
          sx={{
            color: theme.palette.secondary.main,
            p: 1,
          }}
        >
          <MenuIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{
          display: { xs: 'block', md: 'none' },
          mt: 1,
          '& .MuiPaper-root': {
            borderRadius: theme.shape.borderRadius,
            minWidth: 180,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        <MenuItem
          onClick={handleMenuClose}
          component={Link}
          to="/advertisements"
          sx={{
            color: isAdvertisementsPage
              ? theme.palette.custom.logo
              : theme.palette.text.primary,
            fontWeight: isAdvertisementsPage ? 600 : 400,
            py: 1.5,
          }}
        >
          Advertisements
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          component={Link}
          to="/orders"
          sx={{
            color: isOrdersPage
              ? theme.palette.custom.logo
              : theme.palette.text.primary,
            fontWeight: isOrdersPage ? 600 : 400,
            py: 1.5,
          }}
        >
          Orders
        </MenuItem>
      </Menu>
    </>
  );
};

interface NavProps {
  isAdvertisementsPage: boolean;
  isOrdersPage: boolean;
}

function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isAdvertisementsPage = location.pathname === '/advertisements';
  const isOrdersPage = location.pathname === '/orders';

  const handleLogoClick = () => {
    navigate('/advertisements');
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.paper,
        borderBottom: '1px solid',
        borderColor: theme.palette.divider,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          gap: 2,
          px: { xs: 2, sm: 3, md: 4 },
          minHeight: { xs: '64px', sm: '72px', md: '80px' },
        }}
      >
        <Box>
          <Logo
            component="div"
            onClick={isAdvertisementsPage ? undefined : handleLogoClick}
            isHome={isAdvertisementsPage}
            variant="h5"
          >
            Lumina
          </Logo>
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.66rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              fontFamily: "'Inter', sans-serif",
              textTransform: 'uppercase',
              mt: 0.5,
              ml: 0.25,
              opacity: 0.8,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Merchant Dashboard
          </Typography>
        </Box>

        <DesktopNav
          isAdvertisementsPage={isAdvertisementsPage}
          isOrdersPage={isOrdersPage}
        />

        <MobileNav
          isAdvertisementsPage={isAdvertisementsPage}
          isOrdersPage={isOrdersPage}
          anchorEl={anchorEl}
          open={open}
          handleMenuClick={handleMenuClick}
          handleMenuClose={handleMenuClose}
        />

        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={openModal}
          sx={{
            whiteSpace: 'nowrap',
            minWidth: { xs: 'auto', sm: 'auto' },
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1.2 },
            color: 'white',
            '& .MuiButton-startIcon': {
              mr: { xs: 0, sm: 1 },
            },
          }}
        >
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            New Advertisement
          </Box>
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>New</Box>
        </Button>
      </Toolbar>
      <AdModal open={isOpen} handleClose={closeModal} />
    </AppBar>
  );
}

export default Header;
