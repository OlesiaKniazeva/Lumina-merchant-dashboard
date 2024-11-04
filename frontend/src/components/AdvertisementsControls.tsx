import { Box } from '@mui/material';
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

  const handleSearch = (query: string) => {
    navigate(`?q=${encodeURIComponent(query)}&perPage=${adsPerPage}&page=1`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <SearchBar onSearch={handleSearch} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AdvertisementCountSelector
          count={adsPerPage}
          setCount={setAdsPerPage}
        />
      </Box>
    </Box>
  );
}

export default AdvertisementControls;
