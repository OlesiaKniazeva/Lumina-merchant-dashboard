import useAdvertisement from '../hooks/useAdvertisement';
import Layout from '../layouts/layout';
import ErrorComponent from '../components/ErrorComponent';
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  Typography,
  Button,
  Modal,
  TextField,
  CircularProgress,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceholderImage from '../assets/placeholderImage.svg';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

function AdvertisementDetailsPage() {
  const { advertisement, isLoading, error, handleUpdate } = useAdvertisement();

  const theme = useTheme();

  const imageUrl = advertisement?.imageUrl;
  const name = advertisement?.name;
  const price = advertisement?.price;
  const description = advertisement?.description;
  const views = advertisement?.views;
  const likes = advertisement?.likes;

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [urlError, setUrlError] = useState('');

  const handleImageUrlUpdate = async () => {
    try {
      setIsImageLoading(true);
      await handleUpdate({ imageUrl: newImageUrl });
      setImageModalOpen(false);
      setNewImageUrl('');
    } catch (error) {
      console.error('Failed to update image URL:', error);
      setUrlError('Failed to update image. Please try again.');
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <Layout>
      {isLoading && <div>Loading...</div>}
      {error && <ErrorComponent />}
      {!isLoading && !error && (
        <Card
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            padding: 2,
            maxWidth: 1000,
            margin: '24px auto',
            boxShadow: 'none',
            position: 'relative',
            bgcolor: '#ffffff',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', md: '50%' },
              mb: { xs: 3, md: 0 },
            }}
          >
            <CardMedia
              component="img"
              image={imageUrl || PlaceholderImage}
              alt={name}
              sx={{
                width: '100%',
                objectFit: 'cover',
                height: { xs: 300, sm: 400, md: 500 },
                borderRadius: 1,
              }}
            />

            <IconButton
              onClick={() => setImageModalOpen(true)}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 1)',
                },
              }}
            >
              <EditIcon />
            </IconButton>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                padding: '8px 16px',
                borderRadius: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                position: 'absolute',
                bottom: 12,
                right: 12,
              }}
            >
              <Box display="flex" alignItems="center">
                <VisibilityOutlinedIcon
                  sx={{
                    fontSize: '18px',
                    color: theme.palette.custom.warmTones.body,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    ml: 0.5,
                    color: theme.palette.custom.warmTones.body,
                    fontSize: '14px',
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
                    color: theme.palette.custom.heart,
                    fontSize: '18px',
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    ml: 0.5,
                    color: theme.palette.custom.warmTones.body,
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: theme.typography.fontFamily,
                  }}
                >
                  {likes}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              paddingTop: { xs: 0, md: 2 },
              paddingLeft: { xs: 0, md: 4 },
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Box>
              <CardHeader
                title={name}
                sx={{
                  padding: 0,
                  marginBottom: 2,
                  '& .MuiTypography-root': {
                    fontSize: { xs: '24px', sm: '28px', md: '32px' },
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: theme.palette.custom.warmTones.header,
                    fontFamily: theme.typography.h4.fontFamily,
                  },
                }}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '24px', sm: '28px', md: '32px' },
                  marginBottom: 3,
                  color: theme.palette.custom.price,
                  fontFamily: theme.typography.h4.fontFamily,
                }}
              >
                ${price}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: {
                  xs: '16px',
                  sm: '16px',
                  md: '18px',
                },
                lineHeight: 1.6,
                color: theme.palette.custom.warmTones.body,
                letterSpacing: '0.2px',
                mb: 1,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              {description}
            </Typography>
          </Box>
        </Card>
      )}

      <Modal
        open={imageModalOpen}
        onClose={() => {
          setImageModalOpen(false);
          setNewImageUrl('');
          setUrlError('');
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            maxWidth: 500,
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Typography variant="h5" textAlign="center">
            Update Image
          </Typography>

          <Box sx={{ width: '100%' }}>
            <TextField
              fullWidth
              placeholder="Paste image URL here"
              value={newImageUrl}
              onChange={(e) => {
                setNewImageUrl(e.target.value);
                setUrlError('');
              }}
              error={!!urlError}
              helperText={urlError}
              sx={{ mb: 2 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  ),
                },
              }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mb: 2 }}
            >
              Please provide a direct link to an image (ends with .jpg, .png,
              .gif, etc.)
            </Typography>
            <Button
              variant="contained"
              onClick={handleImageUrlUpdate}
              disabled={!newImageUrl.trim() || isImageLoading}
              fullWidth
            >
              {isImageLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  <span>Updating...</span>
                </Box>
              ) : (
                'Update Image'
              )}
            </Button>
          </Box>

          <Button
            onClick={() => {
              setImageModalOpen(false);
              setNewImageUrl('');
              setUrlError('');
            }}
            color="inherit"
            disabled={isImageLoading}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Layout>
  );
}

export default AdvertisementDetailsPage;
