import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { OrderItem } from '@/types';

const PLACEHOLDER_IMAGE = 'https://placehold.co/80x80?text=No+Image';

interface OrderItemsProps {
  items: OrderItem[];
}

const OrderItems = ({ items }: OrderItemsProps) => {
  return (
    <Stack spacing={2}>
      {items.map((item) => (
        <Box
          component={Link}
          to={`/advertisements/${item.id}`}
          key={item.id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1,
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
            <Box
              component="img"
              src={item.imageUrl || PLACEHOLDER_IMAGE}
              alt={item.name}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
            <Stack spacing={1} sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                color="text.primary"
                sx={{ fontWeight: 600 }}
              >
                {item.name}
              </Typography>
              {item.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.description}
                </Typography>
              )}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <VisibilityIcon
                    fontSize="small"
                    sx={{ color: 'text.secondary' }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {item.views}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <FavoriteIcon
                    fontSize="small"
                    sx={{ color: 'custom.heart' }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {item.likes}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Price per item: ${item.price}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'secondary.main',
                  fontWeight: 600,
                  bgcolor: 'rgba(107, 78, 113, 0.08)',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  display: 'inline-block',
                  width: 'fit-content',
                }}
              >
                Amount: {item.count}
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ ml: 2, textAlign: 'right' }}>
            <Typography
              color="custom.price"
              sx={{ fontWeight: 600, fontSize: '1.1rem' }}
            >
              ${item.price * item.count}
            </Typography>
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default OrderItems;
