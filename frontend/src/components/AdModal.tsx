import { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

interface AdModalProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function AdModal({ open, handleClose }: AdModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Новое Объявление
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          type="number"
          label="Стоимость"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <TextField
          fullWidth
          margin="normal"
          label="URL Картинки"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleClose} sx={{ mr: 2 }}>
            Отмена
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Создать
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AdModal;
