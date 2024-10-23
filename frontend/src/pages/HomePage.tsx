import Layout from '../layouts/layout';
import ProductCardList from '../components/ProductCardList';
import useAdvertisements from '../hooks/useAdvertisements';
import { styled, Box } from '@mui/material';
import PaginationComponent from '../components/Pagination';
import ErrorComponent from '../components/ErrorComponent';
import AdvertisementControls from '../components/AdvertisementsControls';
import usePagination from '../hooks/usePagination';

function HomePage() {
  const { page, adsPerPage, setPage, handleAdsPerPageChange } = usePagination();

  const { advertisements, totalPages, isLoading, error } = useAdvertisements({
    currentPage: page,
    perPage: adsPerPage,
  });

  const PaginationContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  });

  return (
    <Layout>
      <AdvertisementControls
        adsPerPage={adsPerPage}
        setAdsPerPage={handleAdsPerPageChange}
      />

      {isLoading && <div>Loading...</div>}

      {error && <ErrorComponent />}

      {!isLoading && !error && (
        <>
          <ProductCardList advertisements={advertisements} />
          <PaginationContainer>
            <PaginationComponent
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </PaginationContainer>
        </>
      )}
    </Layout>
  );
}

export default HomePage;
