import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import { Advertisement } from '../types';

interface ProductCardListProps {
  advertisements: Advertisement[];
}

function ProductCardList({ advertisements }: ProductCardListProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: {
          xs: 1,
          sm: 2,
          lg: 3,
        },
        rowGap: 4,
      }}
    >
      {advertisements.map((advertisement) => (
        <ProductCard
          key={advertisement.id}
          name={advertisement.name}
          price={advertisement.price}
          views={advertisement.views}
          likes={advertisement.likes}
          imageUrl={advertisement.imageUrl}
        />
      ))}
    </Box>
  );
}

export default ProductCardList;
