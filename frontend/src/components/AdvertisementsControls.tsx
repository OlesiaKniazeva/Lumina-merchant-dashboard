import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AdvertisementCountSelector from '../components/AdvertisementsCountSelector';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

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

  const handleSearch = (query: string) => {
    navigate(`?q=${encodeURIComponent(query)}&perPage=${adsPerPage}&page=1`);
  };

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
