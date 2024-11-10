import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Button,
  TextField,
} from '@mui/material';
import {
  VisibilityOutlined as VisibilityOutlinedIcon,
  Favorite as FavoriteIcon,
  Edit as EditIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import useAdvertisement from './hooks/useAdvertisement';
import Layout from '@layouts/layout';
import ErrorComponent from '@components/ErrorComponent';
import { DEFAULT_PLACEHOLDER } from '@/constants/common';
import ImageUpdateModal from './components/ImageUpdateModal';
import { FIELD_LIMITS } from '@/constants/fieldLimits';
import { useAdvertisementEdit } from './hooks/useAdvertisementEdit';

function AdvertisementPage() {
  const { advertisement, isLoading, error, handleUpdate, refetch } =
    useAdvertisement();
  const {
    editingField,
    editedFields,
    isEditMode,
    imageModalOpen,
    isImageLoading,
    isDescriptionExpanded,
    setImageModalOpen,
    handleStartEdit,
    handleSave,
    handleCancel,
    handleImageUpdate,
    toggleEditMode,
    handleFieldChange,
    toggleDescription,
    titleInputRef,
    priceInputRef,
    descriptionInputRef,
    validationErrors,
    getFieldTip,
  } = useAdvertisementEdit({
    handleUpdate,
    refetch,
    name: advertisement?.name,
    price: advertisement?.price,
    description: advertisement?.description,
  });

  const theme = useTheme();

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
            flexDirection: { xs: 'column', md: 'row' },
            padding: { xs: 3, sm: 3, md: 4 },
            maxWidth: { xs: '100%', sm: '600px', md: '1200px' },
            width: { xs: 'auto', sm: 'calc(100% - 32px)' },
            margin: '24px auto',
            boxShadow: 'none',
            position: 'relative',
            bgcolor: '#ffffff',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: '500px' },
              flexShrink: 0,
              alignSelf: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <CardMedia
                component="img"
                image={imageUrl || DEFAULT_PLACEHOLDER}
                alt={name}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
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
                display: 'flex',
                gap: 1,
                justifyContent: { xs: 'flex-start', md: 'center' },
                mt: { xs: 2, md: 0 },
                order: { xs: 2, md: 'unset' },
                position: { md: 'absolute' },
                top: { md: 16 },
                right: { md: 16 },
              }}
            >
              {isEditMode ? (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                    startIcon={<CheckIcon />}
                    sx={{
                      boxShadow: theme.shadows[2],
                      '&:hover': {
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleCancel}
                    startIcon={<CloseIcon />}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={toggleEditMode}
                  startIcon={<EditIcon />}
                  sx={{
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: theme.shadows[2],
                    '&:hover': {
                      bgcolor: 'background.paper',
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  Edit Details
                </Button>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              paddingTop: { xs: 3, md: 4 },
              paddingLeft: { xs: 0, md: 4 },
              paddingRight: { xs: 0, md: 2 },
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
              maxHeight: { md: '800px' },
            }}
          >
            <Box sx={{ mb: 4, width: '100%' }}>
              <Box
                sx={{
                  cursor: isEditMode ? 'pointer' : 'default',
                  borderBottom: isEditMode
                    ? '1px dotted rgba(0, 0, 0, 0.2)'
                    : 'none',
                  transition: 'all 0.2s ease',
                  p: isEditMode ? 2 : 1,
                  mb: 2,
                  borderRadius: 1,
                  '&:hover': isEditMode
                    ? {
                        bgcolor: 'rgba(0, 0, 0, 0.02)',
                      }
                    : {},
                }}
                onClick={() => isEditMode && handleStartEdit('title')}
              >
                {editingField === 'title' ? (
                  <TextField
                    ref={titleInputRef}
                    fullWidth
                    multiline
                    maxRows={3}
                    value={editedFields.title || ''}
                    onChange={handleFieldChange('title')}
                    variant="outlined"
                    size="small"
                    autoFocus
                    error={!!validationErrors.title}
                    helperText={validationErrors.title || getFieldTip('title')}
                    sx={{
                      flex: 1,
                      '& .MuiInputBase-root': {
                        width: '100%',
                      },
                    }}
                  />
                ) : (
                  <Typography
                    variant="pageTitle"
                    component="h1"
                    sx={{
                      wordBreak: 'break-word',
                      flex: 1,
                    }}
                  >
                    {editedFields.title || name}
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  cursor: isEditMode ? 'pointer' : 'default',
                  borderBottom: isEditMode
                    ? '1px dotted rgba(0, 0, 0, 0.2)'
                    : 'none',
                  transition: 'all 0.2s ease',
                  p: isEditMode ? 1 : 0,
                  mb: 3,
                  borderRadius: 1,
                  '&:hover': isEditMode
                    ? {
                        bgcolor: 'rgba(0, 0, 0, 0.02)',
                      }
                    : {},
                }}
                onClick={() => isEditMode && handleStartEdit('price')}
              >
                {editingField === 'price' ? (
                  <TextField
                    ref={priceInputRef}
                    value={editedFields.price || ''}
                    onChange={handleFieldChange('price')}
                    variant="outlined"
                    size="small"
                    autoFocus
                    error={!!validationErrors.price}
                    helperText={validationErrors.price || getFieldTip('price')}
                    sx={{
                      width: '200px',
                      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: 'none',
                          margin: 0,
                        },
                      '& input[type=number]': {
                        MozAppearance: 'textfield',
                      },
                    }}
                    slotProps={{
                      input: {
                        startAdornment: '$',
                        inputProps: {
                          pattern: '[0-9]*.?[0-9]*',
                          inputMode: 'decimal',
                          min: FIELD_LIMITS.price.min,
                          max: FIELD_LIMITS.price.max,
                        },
                      },
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '24px', sm: '28px', md: '32px' },
                      color: theme.palette.custom.price,
                    }}
                  >
                    ${editedFields.price || price}
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  cursor: isEditMode ? 'pointer' : 'default',
                  borderBottom: isEditMode
                    ? '1px dotted rgba(0, 0, 0, 0.2)'
                    : 'none',
                  transition: 'all 0.2s ease',
                  p: isEditMode ? 1 : 0,
                  mx: isEditMode ? -1 : 0,
                  borderRadius: 1,
                  '&:hover': isEditMode
                    ? {
                        bgcolor: 'rgba(0, 0, 0, 0.02)',
                      }
                    : {},
                }}
                onClick={() => isEditMode && handleStartEdit('description')}
              >
                {editingField === 'description' ? (
                  <TextField
                    ref={descriptionInputRef}
                    fullWidth
                    multiline
                    maxRows={10}
                    value={editedFields.description || ''}
                    onChange={handleFieldChange('description')}
                    variant="outlined"
                    placeholder="Add a description..."
                    autoFocus
                    sx={{
                      maxWidth: '800px',
                      '& .MuiInputBase-root': {
                        maxHeight: '300px',
                        overflowY: 'auto',
                      },
                    }}
                    helperText={`${(editedFields.description || '').length}/${FIELD_LIMITS.description.max}`}
                  />
                ) : (
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      '&:hover': isEditMode
                        ? {
                            bgcolor: 'rgba(0, 0, 0, 0.02)',
                            borderRadius: 1,
                          }
                        : undefined,
                      padding: 1,
                      margin: -1,
                      cursor: isEditMode ? 'pointer' : 'default',
                    }}
                    onClick={() => isEditMode && handleStartEdit('description')}
                  >
                    {description ? (
                      <>
                        <Typography
                          sx={{
                            fontSize: { xs: '16px', sm: '16px', md: '18px' },
                            lineHeight: 1.6,
                            color: theme.palette.custom.warmTones.body,
                            letterSpacing: '0.2px',
                            mb: 1,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: isDescriptionExpanded
                              ? 'unset'
                              : 3,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {editedFields.description || description}
                        </Typography>
                        {description && description.length > 600 && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDescription(e);
                            }}
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
                      </>
                    ) : (
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: 'rgba(0,0,0,0.02)',
                          borderRadius: 1,
                          border: '1px dashed rgba(0,0,0,0.1)',
                        }}
                      >
                        <Typography color="text.secondary">
                          Add a description to help buyers understand your
                          product better
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
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
