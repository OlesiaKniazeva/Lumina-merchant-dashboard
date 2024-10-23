import { Box, InputBase, styled } from '@mui/material';
import AdvertisementCountSelector from '../components/AdvertisementsCountSelector';

interface AdvertisementControlsProps {
  adsPerPage: number;
  setAdsPerPage: (perPage: number) => void;
}

const SearchBar = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '5px 10px',
  borderRadius: theme.shape.borderRadius,
  border: '2px solid',
  borderColor: theme.palette.secondary.main,
  width: '400px',
}));

const AdvertisementControls = ({
  adsPerPage,
  setAdsPerPage,
}: AdvertisementControlsProps) => {
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
        <SearchBar placeholder="Find something..." />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AdvertisementCountSelector
          count={adsPerPage}
          setCount={setAdsPerPage}
        />
      </Box>
    </Box>
  );
};

export default AdvertisementControls;
