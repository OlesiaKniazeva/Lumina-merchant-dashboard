import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Layout from '@layouts/layout';
import AdvertisementsList from './components/AdvertisementsList';
import PaginationComponent from '@components/Pagination';
import ErrorComponent from '@components/ErrorComponent';
import AdvertisementsControls from './components/AdvertisementsControls';
import useAdvertisements from './hooks/useAdvertisements';
import usePagination from '@hooks/usePagination';

function AdvertisementsPage() {
  const theme = useTheme();
  const { page, adsPerPage, setPage, handleAdsPerPageChange } = usePagination();

  const { advertisements, totalPages, isLoading, error } = useAdvertisements({
    currentPage: page,
    perPage: adsPerPage,
  });

  return (
    <Layout>
      <Container>
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.custom.warmTones.header,
              fontWeight: 500,
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '1.75rem', sm: '2rem' },
              fontFamily: theme.typography.h4.fontFamily,
              letterSpacing: '-0.25px',
            }}
          >
            Your Advertisements
          </Typography>
          <AdvertisementsControls
            adsPerPage={adsPerPage}
            setAdsPerPage={handleAdsPerPageChange}
          />
        </Box>

        {isLoading && (
          <Typography
            sx={{
              fontSize: '1.1rem',
              fontWeight: 500,
              color: theme.palette.custom.warmTones.body,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            Loading...
          </Typography>
        )}

        {error && <ErrorComponent />}

        {!isLoading && !error && advertisements.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography
              sx={{
                fontSize: '1.1rem',
                fontWeight: 500,
                color: theme.palette.custom.warmTones.body,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              No advertisements found
            </Typography>
          </Box>
        )}

        {!isLoading && !error && advertisements.length > 0 && (
          <>
            <AdvertisementsList advertisements={advertisements} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: { xs: 4, sm: 5 },
                mb: { xs: 2, sm: 3 },
              }}
            >
              <PaginationComponent
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </Box>
          </>
        )}
      </Container>
    </Layout>
  );
}

export default AdvertisementsPage;