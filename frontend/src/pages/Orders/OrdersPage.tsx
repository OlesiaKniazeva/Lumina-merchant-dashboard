import { useState } from 'react';
import Layout from '@layouts/layout';
import { Box, Typography, Select, MenuItem, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';
import OrderCard from './components/OrderCard';
import { useOrders } from './hooks/useOrders';

function OrdersPage() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { orders, totalPages, loading, error } = useOrders({ page, perPage });

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

      <Box sx={{ mb: 2 }}>
        <Select
          size="small"
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setPage(1);
          }}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value={5}>5 per page</MenuItem>
          <MenuItem value={10}>10 per page</MenuItem>
          <MenuItem value={20}>20 per page</MenuItem>
        </Select>
      </Box>

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
