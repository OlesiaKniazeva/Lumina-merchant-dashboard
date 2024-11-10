import { Box } from '@mui/material';
import SearchBar from '@components/SearchBar';
import CountSelector from '@components/CountSelector';
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
      <CountSelector
        count={adsPerPage}
        setCount={setAdsPerPage}
        size="medium"
        variant="outlined"
        minWidth={200}
        label="Items per page"
        options={[10, 20, 40, 50, 100]}
      />
    </Box>
  );
}

export default AdvertisementControls;
