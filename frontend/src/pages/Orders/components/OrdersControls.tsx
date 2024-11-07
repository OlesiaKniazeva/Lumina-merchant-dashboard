import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { OrderStatus } from '@/types';
import { useTheme } from '@mui/material/styles';

interface OrdersControlsProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

function OrdersControls({
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
  itemsPerPage,
  onItemsPerPageChange,
}: OrdersControlsProps) {
  const theme = useTheme();

  const selectStyles = {
    minWidth: 200,
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.main,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.main,
        borderWidth: '1px',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.secondary.main,
    },
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
      <FormControl size="small" sx={selectStyles}>
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

      <FormControl size="small" sx={selectStyles}>
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

      <FormControl size="small" sx={selectStyles}>
        <InputLabel>Items per page</InputLabel>
        <Select
          value={itemsPerPage}
          label="Items per page"
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <MenuItem value={10}>10 items</MenuItem>
          <MenuItem value={20}>20 items</MenuItem>
          <MenuItem value={40}>40 items</MenuItem>
          <MenuItem value={50}>50 items</MenuItem>
          <MenuItem value={100}>100 items</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default OrdersControls;
