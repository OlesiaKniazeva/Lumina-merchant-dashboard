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
  color: theme.palette.text.primary,
}));

const ClearButton = styled(IconButton)({
  padding: '5px',
  marginRight: '10px',
});

const StyledButton = styled(Button)(() => ({
  borderRadius: 0,
  boxShadow: 'none',
  padding: '10px 16px',
  margin: 0,
}));

function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <SearchBarContainer>
      <StyledInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for ads..."
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
