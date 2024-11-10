import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface CountSelectorProps {
  count: number;
  setCount: (count: number) => void;
  label?: string;
  options?: number[];
  minWidth?: number;
  variant?: 'outlined' | 'standard' | 'filled';
  size?: 'small' | 'medium';
}

function CountSelector({
  count,
  setCount,
  label = 'Items per page',
  options = [10, 20, 40, 50, 100],
  minWidth = 200,
  variant = 'outlined',
  size = 'medium',
}: CountSelectorProps) {
  const theme = useTheme();

  return (
    <FormControl
      variant={variant}
      size={size}
      sx={{
        minWidth,
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
        {label}
      </InputLabel>
      <Select
        labelId="items-per-page-label"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        label={label}
        sx={{
          '& .MuiSelect-select': {
            py: 1.5,
            fontFamily: theme.typography.fontFamily,
          },
        }}
      >
        {options.map((value) => (
          <MenuItem key={value} value={value}>
            {value} items
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CountSelector;
