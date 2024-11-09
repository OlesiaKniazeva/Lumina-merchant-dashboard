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
  const navigate = useNavigate();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);

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
      if (field === 'title') {
        titleInputRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        titleInputRef.current?.focus();
        return 'Title is required';
      }
      if (field === 'price') {
        priceInputRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        priceInputRef.current?.focus();
        return 'Price is required';
      }
    }
    return '';
  };

  const handleSubmit = async (
    event: React.FormEvent,
    onSuccess: () => void,
  ) => {
    event.preventDefault();
    setWasSubmitted(true);

    if (!formData.title) {
      titleInputRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      titleInputRef.current?.focus();
      return;
    }

    if (!formData.price) {
      priceInputRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      priceInputRef.current?.focus();
      return;
    }

    if (isFormValid()) {
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

        onSuccess(); // Close modal
        navigate(`/advertisements/${newAd.id}`); // Redirect to new ad
      } catch (error) {
        console.error('Failed to create advertisement:', error);
      }
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
    priceInputRef,
    handleChange,
    getErrorMessage,
    handleSubmit,
    isFormValid,
  };
};
