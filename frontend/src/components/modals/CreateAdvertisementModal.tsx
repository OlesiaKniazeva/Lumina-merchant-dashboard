import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  useTheme,
  Fade,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useCreateAdvertisement } from '@/hooks/useCreateAdvertisement';

interface AdModalProps {
  open: boolean;
  handleClose: () => void;
}

function AdModal({ open, handleClose }: AdModalProps) {
  const theme = useTheme();
  const {
    formData,
    handleChange,
    getErrorMessage,
    handleSubmit,
    imagePreview,
    imageError,
    titleInputRef,
  } = useCreateAdvertisement(open);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 600 },
    maxHeight: '90vh',
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
  };

  const inputStyles = {
    '& .MuiFilledInput-root': {
      backgroundColor: '#f8f9fa',
      '&:hover': {
        backgroundColor: '#f3f4f6',
      },
      '&.Mui-focused': {
        backgroundColor: '#f3f4f6',
      },
      '&::before, &::after': {
        display: 'none',
      },
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
      '&.Mui-focused': {
        color: theme.palette.secondary.main,
      },
    },
    borderRadius: 1,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Paper sx={style}>
        <Box sx={{ p: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography
              id="modal-title"
              variant="h5"
              component="h2"
              fontWeight="bold"
            >
              Create New Advertisement
            </Typography>
            <IconButton
              onClick={handleClose}
              size="small"
              aria-label="close modal"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <form onSubmit={(e) => handleSubmit(e, handleClose)}>
            <Box display="flex" flexDirection="column" gap={2.5}>
              <TextField
                inputRef={titleInputRef}
                label="Title"
                variant="filled"
                value={formData.title}
                onChange={handleChange('title')}
                error={!!getErrorMessage('title')}
                helperText={getErrorMessage('title')}
                placeholder="Enter advertisement title"
                sx={{ ...inputStyles, width: '100%' }}
                slotProps={{
                  input: {
                    sx: { height: '56px', borderRadius: 1 },
                    'aria-required': 'true',
                  },
                }}
              />

              <TextField
                label="Description (optional)"
                variant="filled"
                value={formData.description}
                onChange={handleChange('description')}
                placeholder="Enter detailed description of your advertisement"
                multiline
                rows={4}
                sx={{ ...inputStyles, width: '100%' }}
              />

              <TextField
                label="Price"
                type="number"
                variant="filled"
                value={formData.price}
                onChange={handleChange('price')}
                error={!!getErrorMessage('price')}
                helperText={getErrorMessage('price')}
                placeholder="0.00"
                sx={{ ...inputStyles, width: '200px' }}
                slotProps={{
                  input: {
                    sx: {
                      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                        {
                          display: 'none',
                        },
                      '& input[type=number]': {
                        MozAppearance: 'textfield',
                      },
                      height: '56px',
                      borderRadius: 1,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="Image URL (optional)"
                variant="filled"
                value={formData.imageUrl}
                onChange={handleChange('imageUrl')}
                error={!!imageError}
                helperText={imageError}
                placeholder="https://example.com/image.jpg"
                sx={{ ...inputStyles, width: '100%' }}
                slotProps={{
                  input: {
                    sx: { height: '56px', borderRadius: 1 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Image Preview */}
              {imagePreview && (
                <Fade in>
                  <Box
                    sx={{
                      width: '100%',
                      maxWidth: '250px',
                      position: 'relative',
                      paddingTop: '250px',
                      borderRadius: 1,
                      overflow: 'hidden',
                      border: `1px solid ${theme.palette.divider}`,
                      mx: 'auto',
                      bgcolor: 'rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    <img
                      src={imagePreview}
                      alt="Advertisement preview"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                </Fade>
              )}

              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    width: '250px',
                    height: '48px',
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    borderRadius: 2,
                    bgcolor: theme.palette.secondary.main,
                    color: '#fff',
                    '&:hover': {
                      bgcolor: theme.palette.secondary.dark,
                    },
                  }}
                >
                  Create Advertisement
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Paper>
    </Modal>
  );
}

export default AdModal;
