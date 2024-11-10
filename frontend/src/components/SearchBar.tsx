import { Box, InputBase, Button, IconButton, styled } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';

const SearchBarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `2px solid ${theme.palette.secondary.main}`,
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  maxWidth: '500px',
  overflow: 'hidden',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  flexGrow: 1,
  padding: '5px 10px',
  color: theme.palette.custom.warmTones.body,
  fontFamily: theme.typography.fontFamily,
  '&::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
}));

const ClearButton = styled(IconButton)(({ theme }) => ({
  padding: '5px',
  marginRight: '10px',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.custom.warmTones.body,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  boxShadow: 'none',
  padding: '10px 16px',
  margin: 0,
  fontFamily: theme.typography.fontFamily,
  fontWeight: 500,
  textTransform: 'none',
}));

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchBarContainer>
      <StyledInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for ads..."
        onKeyDown={handleKeyDown}
      />
      {query && (
        <ClearButton onClick={handleClear}>
          <ClearIcon />
        </ClearButton>
      )}
      <StyledButton
        variant="contained"
        color="secondary"
        onClick={handleSearch}
      >
        Search
      </StyledButton>
    </SearchBarContainer>
  );
}

export default SearchBar;
