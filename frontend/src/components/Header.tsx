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
import { useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import useModal from '@hooks/useModal';
import CreateAdvertisementModal from './CreateAdvertisementModal';
import { useState } from 'react';
import Logo from './Logo';
import NavLink from './NavLink';

interface NavProps {
  isAdvertisementsPage: boolean;
  isOrdersPage: boolean;
}

interface MobileNavProps extends NavProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
}

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
    <NavLink to="/advertisements" active={isAdvertisementsPage}>
      Advertisements
    </NavLink>
    <NavLink to="/orders" active={isOrdersPage}>
      Orders
    </NavLink>
  </Box>
);

const MobileNav = ({
  isAdvertisementsPage,
  isOrdersPage,
  anchorEl,
  open,
  handleMenuClick,
  handleMenuClose,
}: MobileNavProps) => {
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
        <MenuItem onClick={handleMenuClose} disableGutters>
          <NavLink to="/advertisements" active={isAdvertisementsPage} isMobile>
            Advertisements
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} disableGutters>
          <NavLink to="/orders" active={isOrdersPage} isMobile>
            Orders
          </NavLink>
        </MenuItem>
      </Menu>
    </>
  );
};

const DashboardSubtitle = () => (
  <Typography
    sx={{
      color: 'text.secondary',
      fontSize: '0.64rem',
      fontWeight: 500,
      letterSpacing: '0.06em',
      fontFamily: 'inherit',
      textTransform: 'uppercase',
      mt: -0.3,
      ml: 0.25,
      opacity: 0.8,
      display: { xs: 'none', sm: 'block' },
    }}
  >
    Merchant Dashboard
  </Typography>
);

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
            isHome={isAdvertisementsPage}
            onClick={isAdvertisementsPage ? undefined : handleLogoClick}
          />
          <DashboardSubtitle />
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
      <CreateAdvertisementModal open={isOpen} handleClose={closeModal} />
    </AppBar>
  );
}

export default Header;
