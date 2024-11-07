import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import {
  VisibilityOutlined as VisibilityOutlinedIcon,
  Favorite as FavoriteIcon,
  Edit as EditIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import useAdvertisement from '@hooks/useAdvertisement';
import Layout from '@layouts/layout';
import ErrorComponent from '@components/ErrorComponent';
import { DEFAULT_PLACEHOLDER } from '@/constants/common';
import ImageUpdateModal from './components/ImageUpdateModal';

function AdvertisementPage() {
  const { advertisement, isLoading, error, handleUpdate } = useAdvertisement();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const theme = useTheme();

  const imageUrl = advertisement?.imageUrl;
  const name = advertisement?.name;
  const price = advertisement?.price;
  const description = advertisement?.description;
  const views = advertisement?.views;
  const likes = advertisement?.likes;

  const handleImageUpdate = async (newImageUrl: string) => {
    setIsImageLoading(true);
    try {
      await handleUpdate({ imageUrl: newImageUrl });
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
              minHeight: { xs: 300, sm: 400, md: 500 },
              flexShrink: 0,
            }}
          >
            <CardMedia
              component="img"
              image={imageUrl || DEFAULT_PLACEHOLDER}
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
                  },
                }}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '24px', sm: '28px', md: '32px' },
                  marginBottom: 3,
                  color: theme.palette.custom.price,
                }}
              >
                ${price}
              </Typography>
            </Box>

            <Box>
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
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: isDescriptionExpanded ? 'unset' : 3,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {description}
              </Typography>
              {description && description.length > 600 && (
                <Button
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                  sx={{
                    textTransform: 'none',
                    color: theme.palette.custom.warmTones.body,
                    padding: '4px 8px',
                    minWidth: 'auto',
                    '&:hover': {
                      background: 'rgba(0, 0, 0, 0.04)',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  {isDescriptionExpanded ? (
                    <>
                      Show less
                      <KeyboardArrowUp fontSize="small" />
                    </>
                  ) : (
                    <>
                      Show more
                      <KeyboardArrowDown fontSize="small" />
                    </>
                  )}
                </Button>
              )}
            </Box>
          </Box>
        </Card>
      )}

      <ImageUpdateModal
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        onUpdate={handleImageUpdate}
        isLoading={isImageLoading}
      />
    </Layout>
  );
}

export default AdvertisementPage;
