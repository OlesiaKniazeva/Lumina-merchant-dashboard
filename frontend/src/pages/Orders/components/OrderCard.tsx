import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Chip,
  Collapse,
  Divider,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import type { Order } from '@/types';
import { getStatusLabel, getStatusColor } from '../orderHelpers';
import OrderItems from './OrderItems';

interface OrderCardProps {
  order: Order;
  onComplete: () => void;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const [expanded, setExpanded] = useState(false);

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
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => setExpanded(!expanded)}
                endIcon={
                  expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
              >
                {expanded ? 'Hide Items' : 'View Items'}
              </Button>
            </Box>
          </Stack>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Divider sx={{ my: 2 }} />
            <OrderItems items={order.items} />
          </Collapse>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
