import { Box, Chip, Typography, styled } from '@mui/material';

const SortChip = styled(Chip)(({ theme }) => ({
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

interface SortingChipsProps {
  value: 'none' | 'asc' | 'desc';
  onChange: (value: 'none' | 'asc' | 'desc') => void;
}

function SortingChips({ value, onChange }: SortingChipsProps) {
  const handleToggle = (newValue: 'asc' | 'desc') => {
    onChange(value === newValue ? 'none' : newValue);
  };

  return (
    <Box>
      <Box sx={{ mb: 1 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, color: 'text.secondary', lineHeight: 1 }}
        >
          Sort by Price
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 0.6 }}>
        <SortChip
          label="Low to High"
          color="secondary"
          size="small"
          variant={value === 'asc' ? 'filled' : 'outlined'}
          onClick={() => handleToggle('asc')}
        />
        <SortChip
          label="High to Low"
          color="secondary"
          size="small"
          variant={value === 'desc' ? 'filled' : 'outlined'}
          onClick={() => handleToggle('desc')}
        />
      </Box>
    </Box>
  );
}

export default SortingChips;
