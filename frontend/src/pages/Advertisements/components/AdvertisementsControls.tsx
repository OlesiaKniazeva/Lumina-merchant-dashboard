import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AdvertisementCountSelector from './AdvertisementsCountSelector';
import SearchBar from '@components/SearchBar';
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
  const theme = useTheme();

  const handleSearch = useCallback(
    (query: string) => {
      navigate(`?q=${encodeURIComponent(query)}&perPage=${adsPerPage}&page=1`);
    },
    [navigate, adsPerPage],
  );

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 3, sm: 3 }}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      sx={{
        width: '100%',
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <SearchBar onSearch={handleSearch} />
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <AdvertisementCountSelector
          count={adsPerPage}
          setCount={setAdsPerPage}
        />
      </Box>
    </Stack>
  );
}

export default AdvertisementControls;
