import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

interface PaginationComponentProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

function PaginationComponent({
  page = 1,
  totalPages = 1,
  setPage,
}: PaginationComponentProps) {
  const theme = useTheme();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        shape="rounded"
        size="large"
        sx={{
          '& .MuiPaginationItem-root': {
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.custom.warmTones.body,
            borderColor: theme.palette.divider,
            '&:hover': {
              backgroundColor: 'rgba(107, 78, 113, 0.04)',
            },
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: '#806386',
            color: 'white',
            '&:hover': {
              backgroundColor: '#755A7B',
            },
          },
        }}
      />
    </Stack>
  );
}

export default PaginationComponent;
