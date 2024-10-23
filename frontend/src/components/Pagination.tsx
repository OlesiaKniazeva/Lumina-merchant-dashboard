import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
      />
    </Stack>
  );
}

export default PaginationComponent;
