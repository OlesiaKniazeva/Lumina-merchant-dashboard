import { Box, styled } from '@mui/material';
import { OrderStatusValue } from '@/types/index';
import DropdownSelector from '@/components/DropdownSelector';
import ChipSelector from '@/components/ChipSelector';
import { itemsPerPageOptions } from '../constants';
import SortingChips from './SortingChips';

// Styled components section
const ControlsContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'flex-end',
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
    gap: theme.spacing(3),
  },
}));

const FilterSection = styled(Box)(({ theme }) => ({
  flex: '1 1 auto',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flex: '1 1 100%',
    maxWidth: '100%',
  },
}));

const SortingSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    flex: '1 1 100%',
    flexDirection: 'column',
    gap: theme.spacing(3),
    alignItems: 'stretch',
    '& > *': {
      maxWidth: '250px',
      width: '100%',
    },
  },
  [theme.breakpoints.up('sm')]: {
    flex: '0 0 auto',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
}));

interface OrdersControlsProps {
  selectedStatuses: OrderStatusValue[];
  setSelectedStatuses: (statuses: OrderStatusValue[]) => void;
  sortOrder: 'none' | 'asc' | 'desc';
  setSortOrder: (order: 'none' | 'asc' | 'desc') => void;
  itemsPerPage: number;
  setItemsPerPage: (perPage: number) => void;
  setPage: (page: number) => void;
}

function OrdersControls({
  selectedStatuses,
  setSelectedStatuses,
  sortOrder,
  setSortOrder,
  itemsPerPage,
  setItemsPerPage,
  setPage,
}: OrdersControlsProps) {
  return (
    <ControlsContainer>
      {/* Status filter section */}
      <FilterSection>
        <ChipSelector
          selectedStatuses={selectedStatuses}
          onChange={setSelectedStatuses}
        />
      </FilterSection>

      {/* Sorting and pagination controls */}
      <SortingSection>
        <SortingChips value={sortOrder} onChange={setSortOrder} />

        <DropdownSelector<number>
          value={itemsPerPage}
          onChange={(value) => {
            setItemsPerPage(value);
            setPage(1);
          }}
          options={itemsPerPageOptions}
          label="Items per page"
          size="small"
        />
      </SortingSection>
    </ControlsContainer>
  );
}

export default OrdersControls;
