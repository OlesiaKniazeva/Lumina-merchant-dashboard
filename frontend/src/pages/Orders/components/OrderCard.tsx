import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import type { Order } from '@/types';
import { getStatusLabel, getStatusColor } from '../orderHelpers';

interface OrderCardProps {
  order: Order;
  onComplete: () => void;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const [showItems, setShowItems] = useState(false);

  return (
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

          <Stack spacing={1}>
            <Typography color="text.secondary">
              Delivery: {order.deliveryWay}
            </Typography>
            <Typography color="text.secondary">
              Created: {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
            {order.finishedAt && (
              <Typography color="text.secondary">
                Finished: {new Date(order.finishedAt).toLocaleDateString()}
              </Typography>
            )}
            <Typography color="custom.price" sx={{ fontWeight: 600 }}>
              Total: ${order.total}
            </Typography>
            <Typography color="text.secondary">
              Items: {order.items.length}
            </Typography>
          </Stack>

          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => setShowItems(true)}
          >
            View Items
          </Button>
        </Stack>

        <Dialog
          open={showItems}
          onClose={() => setShowItems(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Order Items</DialogTitle>
          <DialogContent>
            {/* TODO: Add OrderItems component */}
            <Typography>Items list will go here</Typography>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
