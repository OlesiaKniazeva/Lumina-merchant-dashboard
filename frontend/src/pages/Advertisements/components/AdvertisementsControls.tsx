import { Box } from '@mui/material';
import SearchBar from '@components/SearchBar';
import DropdownSelector from '@/components/DropdownSelector';
import { useLocation } from 'react-router-dom';

interface AdvertisementControlsProps {
  adsPerPage: number;
  setAdsPerPage: (perPage: number) => void;
  onSearch: (query: string) => void;
}

function AdvertisementControls({
  adsPerPage,
  setAdsPerPage,
  onSearch,
}: AdvertisementControlsProps) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

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
      <SearchBar
        onSearch={onSearch}
        initialValue={queryParams.get('q') || ''}
      />
      <DropdownSelector
        value={adsPerPage}
        onChange={setAdsPerPage}
        options={perPageOptions}
        label="Items per page"
      />
    </Box>
  );
}

export default AdvertisementControls;
