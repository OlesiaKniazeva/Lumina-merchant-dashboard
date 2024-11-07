import { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';

interface ImageUpdateModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (imageUrl: string) => Promise<void>;
  isLoading: boolean;
}

function ImageUpdateModal({
  open,
  onClose,
  onUpdate,
  isLoading,
}: ImageUpdateModalProps) {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const handleImageUrlUpdate = async () => {
    try {
      await onUpdate(newImageUrl);
      setNewImageUrl('');
      onClose();
    } catch (error) {
      console.error('Failed to update image URL:', error);
      setUrlError('Failed to update image. Please try again.');
    }
  };

  const handleClose = () => {
    setNewImageUrl('');
    setUrlError('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
            disabled={!newImageUrl.trim() || isLoading}
            fullWidth
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                <span>Updating...</span>
              </Box>
            ) : (
              'Update Image'
            )}
          </Button>
        </Box>

        <Button onClick={handleClose} color="inherit" disabled={isLoading}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}

export default ImageUpdateModal;
