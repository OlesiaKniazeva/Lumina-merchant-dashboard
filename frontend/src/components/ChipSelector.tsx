import { Box, Chip, Typography, Button, styled } from '@mui/material';
import { OrderStatus, OrderStatusValue } from '@/types/index';
import ClearIcon from '@mui/icons-material/Clear';
import { getStatusLabel } from '@/pages/Orders/orderHelpers';

// Styled components section
const Container = styled(Box)({
  width: '100%',
});

const FilterHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  minHeight: '24px',
  marginBottom: '8px',
});

const FilterTitleSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const FilterCount = styled(Box)(({ theme }) => ({
  padding: '2px 6px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.secondary.main,
  color: 'white',
  fontSize: '0.75rem',
  fontWeight: 600,
  lineHeight: 1,
}));

const ClearButton = styled(Button)({
  textTransform: 'none',
  padding: '4px',
  minWidth: 'auto',
  fontSize: '0.75rem',
  height: '24px',
});

const ChipsContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '5px',
  alignItems: 'center',
});

const StatusChip = styled(Chip)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  height: '24px',
  '& .MuiChip-label': {
    padding: '0 8px',
    fontSize: '0.75rem',
  },
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    '&.MuiChip-outlined': {
      backgroundColor: 'rgba(107, 78, 113, 0.08)',
    },
  },
  '&.MuiChip-outlined': {
    borderColor: theme.palette.secondary.light,
  },
  '&.MuiChip-filled': {
    borderColor: theme.palette.secondary.main,
  },
}));

// Component interface
interface ChipSelectorProps {
  selectedStatuses: OrderStatusValue[];
  onChange: (statuses: OrderStatusValue[]) => void;
}

function ChipSelector({ selectedStatuses, onChange }: ChipSelectorProps) {
  const handleToggle = (status: OrderStatusValue) => {
    const currentIndex = selectedStatuses.indexOf(status);
    const newStatuses = [...selectedStatuses];

    if (currentIndex === -1) {
      newStatuses.push(status);
    } else {
      newStatuses.splice(currentIndex, 1);
    }

    onChange(newStatuses);
  };

  return (
    <Container>
      <FilterHeader>
        <FilterTitleSection>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: 'text.secondary', lineHeight: 1 }}
          >
            Status Filter
          </Typography>
          {selectedStatuses.length > 0 && (
            <>
              <FilterCount>{selectedStatuses.length}</FilterCount>
              <ClearButton
                size="small"
                variant="text"
                color="secondary"
                startIcon={<ClearIcon />}
                onClick={() => onChange([])}
              >
                Clear all
              </ClearButton>
            </>
          )}
        </FilterTitleSection>
      </FilterHeader>

      <ChipsContainer>
        {Object.values(OrderStatus).map((value) => (
          <StatusChip
            key={value}
            label={getStatusLabel(value)}
            color="secondary"
            size="small"
            variant={selectedStatuses.includes(value) ? 'filled' : 'outlined'}
            onClick={() => handleToggle(value)}
          />
        ))}
      </ChipsContainer>
    </Container>
  );
}

export default ChipSelector;
