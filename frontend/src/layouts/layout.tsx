import { Box, Container } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Container component="main" sx={{ flex: 1, py: 2 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
}

export default Layout;
