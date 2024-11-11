import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface NavLinkProps {
  to: string;
  active?: boolean;
  children: ReactNode;
  isMobile?: boolean;
}

const getNavLinkStyles = (active: boolean, isMobile: boolean) => ({
  marginRight: isMobile ? 0 : '24px',
  textDecoration: 'none',
  color: active ? 'custom.logo' : 'text.primary',
  fontWeight: active ? 600 : 500,
  fontSize: '1.1rem',
  fontFamily: 'inherit',
  cursor: active ? 'default' : 'pointer',
  pointerEvents: active ? 'none' : 'auto',
  borderBottom: !isMobile && active ? '2px solid' : 'none',
  borderColor: 'custom.logo',
  paddingY: isMobile ? 1.5 : '8px',
  paddingX: isMobile ? 2 : 0,
  width: isMobile ? '100%' : 'auto',
  display: 'block',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: !active ? 'custom.logo' : undefined,
    transform: !isMobile && !active ? 'translateY(-1px)' : undefined,
    bgcolor: isMobile ? 'rgba(0, 0, 0, 0.04)' : undefined,
  },
});

function NavLink({
  to,
  active = false,
  children,
  isMobile = false,
}: NavLinkProps) {
  return (
    <Box component={Link} to={to} sx={getNavLinkStyles(active, isMobile)}>
      {children}
    </Box>
  );
}

export default NavLink;
