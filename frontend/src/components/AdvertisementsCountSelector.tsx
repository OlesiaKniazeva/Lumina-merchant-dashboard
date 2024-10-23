import {
  Select,
  MenuItem,
  Box,
  Typography,
  SelectChangeEvent,
} from '@mui/material';

interface AdvertisementCountSelectorProps {
  count: number;
  setCount: (count: number) => void;
}

function AdvertisementCountSelector({
  count,
  setCount,
}: AdvertisementCountSelectorProps) {
  const options = [10, 20, 40, 50, 100];

  const handleChange = (event: SelectChangeEvent<number>) => {
    const selectedCount = Number(event.target.value);
    setCount(selectedCount);
  };

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1" sx={{ mr: 1 }}>
        Ads per page:
      </Typography>
      <Select value={count} onChange={handleChange} sx={{ minWidth: 120 }}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default AdvertisementCountSelector;
