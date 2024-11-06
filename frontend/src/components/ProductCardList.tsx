import Grid from '@mui/material/Grid2';
import ProductCard from '@components/ProductCard';
import { Advertisement } from '@/types';

interface ProductCardListProps {
  advertisements: Advertisement[];
}

function ProductCardList({ advertisements }: ProductCardListProps) {
  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 2, md: 3 }}
      sx={{
        width: '100%',
        mx: 'auto',
      }}
    >
      {advertisements.map((ad) => (
        <Grid
          key={ad.id}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
        >
          <ProductCard
            id={ad.id}
            name={ad.name}
            price={ad.price}
            views={ad.views}
            likes={ad.likes}
            imageUrl={ad.imageUrl}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductCardList;
