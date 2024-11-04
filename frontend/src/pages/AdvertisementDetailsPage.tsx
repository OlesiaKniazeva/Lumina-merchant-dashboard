import useAdvertisement from '../hooks/useAdvertisement';
import Layout from '../layouts/layout';
import ErrorComponent from '../components/ErrorComponent';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceholderImage from '../assets/placeholderImage.svg';

function AdvertisementDetailsPage() {
  const { advertisement, isLoading, error } = useAdvertisement();

  const imageUrl = advertisement?.imageUrl;
  const name = advertisement?.name;
  const price = advertisement?.price;
  const description = advertisement?.description;
  const views = advertisement?.views;
  const likes = advertisement?.likes;

  return (
    <Layout>
      {isLoading && <div>Loading...</div>}
      {error && <ErrorComponent />}
      {!isLoading && !error && (
        <Card
          sx={{
            display: 'flex',
            padding: 2,
            maxWidth: 1000,
            margin: 'auto',
            boxShadow: 'none',
            position: 'relative',
          }}
        >
          {/* Image Section with Responsive Height */}
          <CardMedia
            component="img"
            image={imageUrl || PlaceholderImage}
            alt={name}
            sx={{
              width: '50%',
              objectFit: 'cover',
              height: { xs: 300, sm: 400, md: 500 },
            }}
          />

          {/* Content Section */}
          <Box sx={{ flex: 1, padding: 2 }}>
            <CardHeader
              title={name}
              sx={{ padding: 0, marginBottom: 1 }}
              titleTypographyProps={{ variant: 'h4' }}
            />
            <Typography color="text.primary" sx={{ fontWeight: 'bold' }}>
              ${price}
            </Typography>
            <CardContent sx={{ padding: 0, marginTop: 1 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: '16px',
                    sm: '18px',
                    md: '20px',
                  },
                }}
              >
                {description}
              </Typography>
            </CardContent>

            {/* Stats Section - Positioned in the Bottom Right */}
            <Box display="flex">
              <Box display="flex" alignItems="center" mr={2}>
                <VisibilityOutlinedIcon fontSize="small" />
                <Typography variant="subtitle1" color="text.secondary" ml={0.5}>
                  {views}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <FavoriteIcon sx={{ color: 'red' }} fontSize="small" />
                <Typography variant="subtitle1" color="text.secondary" ml={0.5}>
                  {likes}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      )}
    </Layout>
  );
}

export default AdvertisementDetailsPage;
