import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';

type ProductCardProps = {
  image: string;
  title: string;
  price: number;
  views: number;
  likes: number;
};

function ProductCard({ image, title, price, views, likes }: ProductCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="h5" color="text.primary">
          ${price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box display="flex" alignItems="center" mr={2}>
          <VisibilityIcon fontSize="small" />
          <Typography variant="body2" color="text.secondary" ml={0.5}>
            {views}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <FavoriteIcon fontSize="small" color="error" />
          <Typography variant="body2" color="text.secondary" ml={0.5}>
            {likes}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
