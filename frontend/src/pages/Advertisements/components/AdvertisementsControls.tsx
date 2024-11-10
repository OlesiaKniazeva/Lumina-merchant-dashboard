import { Box } from '@mui/material';
import SearchBar from '@components/SearchBar';
import DropdownSelector from '@/components/DropdownSelector';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

interface AdvertisementControlsProps {
  adsPerPage: number;
  setAdsPerPage: (perPage: number) => void;
}

function AdvertisementControls({
  adsPerPage,
  setAdsPerPage,
}: AdvertisementControlsProps) {
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (query: string) => {
      navigate(`?q=${encodeURIComponent(query)}&perPage=${adsPerPage}&page=1`);
    },
    [navigate, adsPerPage],
  );

  const perPageOptions = [
    { value: 10, label: '10 items' },
    { value: 20, label: '20 items' },
    { value: 40, label: '40 items' },
    { value: 50, label: '50 items' },
    { value: 100, label: '100 items' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        mb: { xs: 3, sm: 4 },
      }}
    >
      <SearchBar onSearch={handleSearch} />
      <DropdownSelector<number>
        value={adsPerPage}
        onChange={setAdsPerPage}
        options={perPageOptions}
        label="Items per page"
        size="medium"
        variant="outlined"
        minWidth={200}
      />
    </Box>
  );
}

export default AdvertisementControls;
