import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import type { Order } from '@/types';
import OrderCard from './OrderCard';

interface OrdersListProps {
  orders: Order[];
  loading: boolean;
  onOrderComplete: () => void;
}

const OrdersList = ({ orders, loading, onOrderComplete }: OrdersListProps) => {
  if (loading) {
    return <Typography>Loading orders...</Typography>;
  }

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {orders.map((order) => (
        <Grid key={order.id} size={{ xs: 12 }}>
          <OrderCard order={order} onComplete={onOrderComplete} />
        </Grid>
      ))}
    </Grid>
  );
};

export default OrdersList;
