import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAdvertisement } from '@/services/advertisementsService';

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
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Focus title input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small timeout to ensure modal is fully rendered
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
      if (field === 'title') {
        return 'Title is required';
      }
      if (field === 'price') {
        return 'Price is required';
      }
    }
    return '';
  };

  const focusOnInvalidField = () => {
    if (!formData.title) {
      titleInputRef.current?.focus();
    } else if (!formData.price) {
      priceInputRef.current?.focus();
    } else if (imageError) {
      imageInputRef.current?.focus();
    }
  };

  const handleSubmit = async (
    event: React.FormEvent,
    onSuccess: () => void,
  ) => {
    event.preventDefault();
    setWasSubmitted(true);
    setError(null);

    if (!isFormValid()) {
      focusOnInvalidField();
    }

    if (isFormValid()) {
      setIsCreating(true);
      try {
        const newAd = await createAdvertisement({
          name: formData.title,
          description: formData.description,
          price: Number(formData.price),
          imageUrl: formData.imageUrl,
          createdAt: new Date().toISOString(),
          views: 0,
          likes: 0,
        });

        setShowSuccess(true);
        // Reset form only after successful creation
        setFormData({
          title: '',
          description: '',
          price: '',
          imageUrl: '',
        });
        setImagePreview(null);
        setImageError('');
        setWasSubmitted(false);

        setTimeout(() => {
          onSuccess();
          navigate(`/advertisements/${newAd.id}`);
        }, 1500);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to create advertisement',
        );
      } finally {
        setIsCreating(false);
      }
    }
  };

  const isFormValid = () => {
    return formData.title && formData.price && !imageError;
  };

  // Only reset validation states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setWasSubmitted(false);
      setError(null);
    }
  }, [isOpen]);

  return {
    formData,
    wasSubmitted,
    imagePreview,
    imageError,
    isCreating,
    showSuccess,
    error,
    setError,
    titleInputRef,
    priceInputRef,
    imageInputRef,
    handleChange,
    getErrorMessage,
    handleSubmit,
    isFormValid,
  };
};
