import { useState, useEffect } from 'react';
import Layout from '@layouts/layout';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getOrders } from '@/services/ordersService';
import type { Order } from '@/types';
import { getStatusLabel, getStatusColor } from './orderHelpers';

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Typography>Loading orders...</Typography>
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

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {orders.map((order) => (
          <Grid key={order.id} size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h6" color="text.primary">
                      Order #{order.id}
                    </Typography>
                    <Chip
                      label={getStatusLabel(order.status)}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Stack spacing={1}>
                        <Typography color="text.secondary">
                          Delivery: {order.deliveryWay}
                        </Typography>
                        <Typography color="text.secondary">
                          Created:{' '}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </Typography>
                        {order.finishedAt && (
                          <Typography color="text.secondary">
                            Finished:{' '}
                            {new Date(order.finishedAt).toLocaleDateString()}
                          </Typography>
                        )}
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Stack spacing={1}>
                        <Typography
                          color="custom.price"
                          sx={{ fontWeight: 600 }}
                        >
                          Total: ${order.total}
                        </Typography>
                        <Typography color="text.secondary">
                          Items: {order.items.length}
                        </Typography>
                        <Box>
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                          >
                            View Items
                          </Button>
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export default OrdersPage;
