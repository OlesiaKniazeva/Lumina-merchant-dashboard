import { Card, CardMedia, Typography, Box, useTheme } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceholderImage from '@/assets/placeholderImage.svg';
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
  const theme = useTheme();

  const handleClick = () => {
    navigate(`/advertisements/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        maxWidth: { xs: 350, md: 'none' },
        minWidth: { xs: 200, md: 'none' },
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 0,
        boxShadow: 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
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
          borderRadius: 0,
        }}
      />
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          position: 'relative',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: '1.1rem',
            fontWeight: 500,
            color: theme.palette.custom.warmTones.header,
            fontFamily: theme.typography.h6.fontFamily,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </Typography>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1.25rem',
            color: theme.palette.custom.price,
            fontFamily: theme.typography.h6.fontFamily,
          }}
        >
          ${price}
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
        >
          <Box display="flex" alignItems="center">
            <VisibilityOutlinedIcon
              sx={{
                fontSize: 18,
                color: theme.palette.custom.warmTones.body,
              }}
            />
            <Typography
              sx={{
                ml: 0.5,
                fontSize: '0.875rem',
                color: theme.palette.custom.warmTones.body,
                fontWeight: 500,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              {views}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <FavoriteIcon
              sx={{
                fontSize: 18,
                color: theme.palette.custom.heart,
              }}
            />
            <Typography
              sx={{
                ml: 0.5,
                fontSize: '0.875rem',
                color: theme.palette.custom.warmTones.body,
                fontWeight: 500,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              {likes}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default ProductCard;
