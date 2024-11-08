import { useState, useEffect, useRef } from 'react';

interface FormData {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

export const useCreateAdvertisement = (isOpen: boolean) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string>('');
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  // Image preview logic
  useEffect(() => {
    if (formData.imageUrl) {
      const img = new Image();
      img.src = formData.imageUrl;

      img.onload = () => {
        setImagePreview(formData.imageUrl);
        setImageError('');
      };

      img.onerror = () => {
        setImagePreview(null);
        setImageError('Invalid image URL');
      };
    } else {
      setImagePreview(null);
      setImageError('');
    }
  }, [formData.imageUrl]);

  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const getErrorMessage = (field: 'title' | 'price') => {
    if (wasSubmitted && !formData[field]) {
      return field === 'title' ? 'Title is required' : 'Price is required';
    }
    return '';
  };

  const handleSubmit = (event: React.FormEvent, onSuccess: () => void) => {
    event.preventDefault();
    setWasSubmitted(true);

    if (isFormValid()) {
      onSuccess();
    }
  };

  const isFormValid = () => {
    return formData.title && formData.price;
  };

  return {
    formData,
    wasSubmitted,
    imagePreview,
    imageError,
    titleInputRef,
    handleChange,
    getErrorMessage,
    handleSubmit,
    isFormValid,
  };
};
