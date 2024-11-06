import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface AdvertisementCountSelectorProps {
  count: number;
  setCount: (count: number) => void;
}

function AdvertisementCountSelector({
  count,
  setCount,
}: AdvertisementCountSelectorProps) {
  const theme = useTheme();

  return (
    <FormControl
      variant="outlined"
      sx={{
        minWidth: 200,
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'white',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main,
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: theme.palette.secondary.main,
        },
      }}
    >
      <InputLabel
        id="items-per-page-label"
        sx={{
          fontWeight: 500,
          color: theme.palette.text.secondary,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        Items per page
      </InputLabel>
      <Select
        labelId="items-per-page-label"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        label="Items per page"
        sx={{
          '& .MuiSelect-select': {
            py: 1.5,
            fontFamily: theme.typography.fontFamily,
          },
        }}
      >
        <MenuItem value={10}>10 items</MenuItem>
        <MenuItem value={20}>20 items</MenuItem>
        <MenuItem value={40}>40 items</MenuItem>
        <MenuItem value={50}>50 items</MenuItem>
        <MenuItem value={100}>100 items</MenuItem>
      </Select>
    </FormControl>
  );
}

export default AdvertisementCountSelector;
