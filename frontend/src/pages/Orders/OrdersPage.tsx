import { useState } from 'react';
import Layout from '@layouts/layout';
import { Box, Typography, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';
import OrderCard from './components/OrderCard';
import OrdersControls from './components/OrdersControls';
import { useOrders } from './hooks/useOrders';

function OrdersPage() {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { orders, totalPages, loading, error } = useOrders({
    page,
    perPage: itemsPerPage,
  });

  if (loading) {
    return (
      <Layout>
        <Typography>Loading orders...</Typography>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Typography color="error">
          Error loading orders: {error.message}
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="pageTitle" component="h1">
          Orders
        </Typography>
      </Box>

      <OrdersControls
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value);
          setPage(1);
        }}
      />

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {orders.map((order) => (
          <Grid
            key={order.id}
            size={{
              xs: 12,
            }}
          >
            <OrderCard
              order={order}
              onComplete={() => {
                // TODO: Implement order completion
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_: React.ChangeEvent<unknown>, newPage: number) =>
            setPage(newPage)
          }
          color="primary"
        />
      </Box>
    </Layout>
  );
}

export default OrdersPage;
