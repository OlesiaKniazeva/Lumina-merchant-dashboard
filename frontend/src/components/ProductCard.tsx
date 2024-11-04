import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceholderImage from '../assets/placeholderImage.svg';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  views: number;
  likes: number;
  imageUrl: string | undefined;
}

function ProductCard({
  id,
  name,
  price,
  views,
  likes,
  imageUrl = '',
}: ProductCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/advertisements/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        maxWidth: 350,
        minWidth: 200,
        backgroundColor: 'white',
        borderRadius: 0,
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
        alt={name}
        image={imageUrl || PlaceholderImage}
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
          {name}
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
          ${price}
        </Typography>

        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center" mr={2}>
            <VisibilityOutlinedIcon fontSize="small" />
            <Typography variant="subtitle2" color="text.secondary" ml={0.5}>
              {views}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <FavoriteIcon sx={{ color: 'red' }} fontSize="small" />
            <Typography variant="subtitle2" color="text.secondary" ml={0.5}>
              {likes}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default ProductCard;
