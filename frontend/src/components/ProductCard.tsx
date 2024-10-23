import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ProductCardProps {
  imageUrl: string;
  title: string;
  originalPrice: number;
  viewCount: number;
  likeCount: number;
}

function ProductCard({
  imageUrl,
  title,
  originalPrice,
  viewCount,
  likeCount,
}: ProductCardProps) {
  return (
    <Card
      sx={{
        maxWidth: 350,
        minWidth: 200,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 0,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: 3,
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontSize: '1rem',
      }}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        alt={title}
        sx={{
          width: '100%',
          aspectRatio: '1 / 1',
          objectFit: 'cover',
        }}
      />
      <CardContent
        sx={{
          padding: 0,
          mx: 1,
        }}
      >
        <Typography
          margin={0}
          gutterBottom
          variant="subtitle2"
          component="div"
          noWrap
        >
          {title}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mx: 1,
          mb: 0.5,
        }}
      >
        <Typography variant="body2" color="text.primary">
          ${originalPrice}
        </Typography>

        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center" mr={2}>
            <VisibilityOutlinedIcon fontSize="small" />
            <Typography variant="subtitle2" color="text.secondary" ml={0.5}>
              {viewCount}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <FavoriteIcon sx={{ color: 'red' }} fontSize="small" />
            <Typography variant="subtitle2" color="text.secondary" ml={0.5}>
              {likeCount}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default ProductCard;
