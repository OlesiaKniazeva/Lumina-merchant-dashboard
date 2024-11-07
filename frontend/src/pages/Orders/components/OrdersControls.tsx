import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { OrderStatus } from '@/types';

interface OrdersControlsProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

const OrdersControls = ({
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
}: OrdersControlsProps) => {
  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          label="Status"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value={OrderStatus.Created}>Created</MenuItem>
          <MenuItem value={OrderStatus.Paid}>Paid</MenuItem>
          <MenuItem value={OrderStatus.Transport}>In Transit</MenuItem>
          <MenuItem value={OrderStatus.DeliveredToThePoint}>Delivered</MenuItem>
          <MenuItem value={OrderStatus.Received}>Received</MenuItem>
          <MenuItem value={OrderStatus.Archived}>Archived</MenuItem>
          <MenuItem value={OrderStatus.Refund}>Refunded</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Sort by Total</InputLabel>
        <Select
          value={sortOrder}
          label="Sort by Total"
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        >
          <MenuItem value="asc">Price: Low to High</MenuItem>
          <MenuItem value="desc">Price: High to Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default OrdersControls;
