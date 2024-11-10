import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useId } from 'react';

// Define a type for valid option values
type OptionValue = string | number;

// Define a type for the options array with specific value types
type Option<T extends OptionValue> = {
  value: T;
  label: string;
};

interface DropdownSelectorProps<T extends OptionValue> {
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
  label?: string;
  minWidth?: number;
  variant?: 'outlined' | 'standard' | 'filled';
  size?: 'small' | 'medium';
}

function DropdownSelector<T extends OptionValue>({
  value,
  onChange,
  options,
  label = 'Select',
  minWidth = 200,
  variant = 'outlined',
  size = 'medium',
}: DropdownSelectorProps<T>) {
  const theme = useTheme();
  const uniqueId = useId();
  const labelId = `dropdown-selector-${uniqueId}`;

  const handleChange = (event: SelectChangeEvent<T>) => {
    const selectedOption = options.find(
      (opt) => opt.value === event.target.value,
    );
    if (selectedOption) {
      onChange(selectedOption.value);
    }
  };

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
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main,
            borderWidth: '1px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: theme.palette.secondary.main,
        },
      }}
    >
      <InputLabel
        id={labelId}
        sx={{
          fontWeight: 500,
          color: theme.palette.text.secondary,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        {label}
      </InputLabel>
      <Select<T>
        labelId={labelId}
        value={value}
        onChange={handleChange}
        label={label}
        sx={{
          '& .MuiSelect-select': {
            py: 1.5,
            fontFamily: theme.typography.fontFamily,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropdownSelector;
