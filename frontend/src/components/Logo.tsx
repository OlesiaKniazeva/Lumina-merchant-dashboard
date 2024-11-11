import { Typography } from '@mui/material';
import { ElementType } from 'react';

interface LogoProps {
  component?: ElementType;
  isHome?: boolean;
  onClick?: () => void;
}

const getLogoStyles = (isHome: boolean) => ({
  variant: 'logo' as const,
  fontSize: {
    xs: '2rem',
    sm: '2.5rem',
    md: '2.75rem',
  },
  transition: 'opacity 0.2s ease',
  cursor: isHome ? 'default' : 'pointer',
  '&:hover': {
    opacity: isHome ? 1 : 0.85,
  },
});

function Logo({ component = 'div', isHome = false, onClick }: LogoProps) {
  return (
    <Typography
      variant="logo"
      component={component}
      onClick={onClick}
      sx={getLogoStyles(isHome)}
    >
      Lumina
    </Typography>
  );
}

export default Logo;
