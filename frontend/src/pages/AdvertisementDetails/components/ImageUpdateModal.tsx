import { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

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
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isValidImage, setIsValidImage] = useState(false);
  const theme = useTheme();

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setNewImageUrl('');
      setUrlError('');
      setIsValidImage(false);
    }
  }, [open]);

  // Validate image URL
  useEffect(() => {
    if (!newImageUrl) {
      setIsValidImage(false);
      return;
    }

    setIsPreviewLoading(true);
    const img = new Image();
    img.src = newImageUrl;

    img.onload = () => {
      setIsValidImage(true);
      setUrlError('');
      setIsPreviewLoading(false);
    };

    img.onerror = () => {
      setIsValidImage(false);
      setUrlError('Invalid image URL');
      setIsPreviewLoading(false);
    };
  }, [newImageUrl]);

  return (
    <Modal
      open={open}
      onClose={onClose}
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
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          overflowY: 'auto',
        }}
      >
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 600 }}>
          Update Image
        </Typography>

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
          sx={{ mb: 3 }}
          slotProps={{
            input: {
              startAdornment: (
                <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />
              ),
            },
          }}
        />

        {/* Preview Loading State */}
        {isPreviewLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress size={40} />
          </Box>
        )}

        {/* Image Preview with smaller container */}
        {isValidImage && (
          <Box
            sx={{
              width: '100%',
              maxWidth: '300px',
              position: 'relative',
              paddingTop: '300px',
              borderRadius: 1,
              overflow: 'hidden',
              border: `1px solid ${theme.palette.divider}`,
              mx: 'auto',
            }}
          >
            <img
              src={newImageUrl}
              alt="Preview"
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
        )}

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onClose} color="inherit" disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => onUpdate(newImageUrl)}
            disabled={!isValidImage || isLoading}
            color="secondary"
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
      </Box>
    </Modal>
  );
}

export default ImageUpdateModal;
