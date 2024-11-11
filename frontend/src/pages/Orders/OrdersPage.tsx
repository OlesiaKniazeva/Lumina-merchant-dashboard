import { useState } from 'react';
import Layout from '@layouts/layout';
import { Box, Typography, Container, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';
import OrderCard from './components/OrderCard';
import PaginationComponent from '@components/Pagination';
import { OrderStatusValue } from '@/types/index';
import { useOrders } from './hooks/useOrders';
import OrdersControls from './components/OrdersControls';

const ContentContainer = styled(Box)({
  maxWidth: '100%',
  width: '100%',
  margin: '0 auto',
});

function OrdersPage() {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedStatuses, setSelectedStatuses] = useState<OrderStatusValue[]>(
    [],
  );
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

  const { orders, totalPages, loading, error } = useOrders({
    page,
    perPage: itemsPerPage,
    statuses: selectedStatuses.length > 0 ? selectedStatuses : undefined,
    sortOrder,
  });

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 3, px: { xs: 2, sm: 3, md: 4 } }}>
        <ContentContainer>
          <Box sx={{ mb: 4 }}>
            <Typography variant="pageTitle" component="h1">
              Orders
            </Typography>
          </Box>

          <OrdersControls
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setPage={setPage}
          />

          {loading ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography>Loading orders...</Typography>
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography color="error">
                Error loading orders: {error.message}
              </Typography>
            </Box>
          ) : orders.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography
                sx={{
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
              >
                No orders found
              </Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
                {orders.map((order) => (
                  <Grid key={order.id} size={{ xs: 12 }}>
                    <OrderCard order={order} onComplete={() => {}} />
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <PaginationComponent
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                />
              </Box>
            </>
          )}
        </ContentContainer>
      </Container>
    </Layout>
  );
}

export default OrdersPage;
