import { useRef, useState } from 'react';
import { FIELD_LIMITS } from '@/constants/fieldLimits';

type EditingField = 'title' | 'price' | 'description' | null;

interface EditableFields {
  title: string;
  price: string;
  description: string;
}

interface UseAdvertisementEditProps {
  handleUpdate: (updates: Record<string, string | number>) => Promise<void>;
  refetch: () => Promise<void>;
  name?: string;
  price?: number;
  description?: string;
}

export const useAdvertisementEdit = ({
  handleUpdate,
  refetch,
  name,
  price,
  description,
}: UseAdvertisementEditProps) => {
  // Temporary state for edited fields
  const [editedFields, setEditedFields] = useState<EditableFields>({
    title: '',
    price: '',
    description: '',
  });
  const titleInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  const [editingField, setEditingField] = useState<EditingField>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [validationErrors, setValidationErrors] = useState<{
    title?: string;
    price?: string;
  }>({});

  const getFieldTip = (field: EditingField) => {
    if (!field) return '';

    switch (field) {
      case 'title':
        return editedFields.title.length >= FIELD_LIMITS.title.min
          ? `${editedFields.title.length}/${FIELD_LIMITS.title.max} characters`
          : `Minimum ${FIELD_LIMITS.title.min} characters`;
      case 'price':
        return `From $${FIELD_LIMITS.price.min} to $${FIELD_LIMITS.price.max}`;
      default:
        return '';
    }
  };

  const toggleEditMode = () => {
    const newEditMode = !isEditMode;
    setIsEditMode(newEditMode);

    if (newEditMode) {
      // When entering edit mode, initialize fields with current values
      setEditedFields({
        title: name || '',
        price: price ? String(price) : '',
        description: description || '',
      });
    } else {
      // When exiting edit mode, clear edited fields
      setEditedFields({
        title: '',
        price: '',
        description: '',
      });
      setEditingField(null);
    }
  };

  const handleStartEdit = (field: EditingField) => {
    if (isEditMode && field !== editingField) {
      setEditingField(field);

      setTimeout(() => {
        const ref =
          field === 'title'
            ? titleInputRef.current
            : field === 'price'
              ? priceInputRef.current
              : descriptionInputRef.current;

        if (ref) {
          ref.focus();
          const input = ref.querySelector('input, textarea') as
            | HTMLInputElement
            | HTMLTextAreaElement;
          if (input) {
            input.selectionStart = input.selectionEnd = input.value.length;
          }
        }
      }, 0);
    }
  };

  const handleFieldChange =
    (field: EditingField) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (field) {
        if (field === 'price') {
          handlePriceChange(e);
        } else {
          const limit = FIELD_LIMITS[field as keyof typeof FIELD_LIMITS]?.max;
          const newValue = value.slice(0, limit);
          setEditedFields((prev) => ({
            ...prev,
            [field]: newValue,
          }));
        }
        // Clear validation errors when user starts typing again
        setValidationErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and at most one decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      // Prevent multiple decimal points
      if (value.split('.').length <= 2) {
        setEditedFields((prev) => ({
          ...prev,
          price: value,
        }));
      }
    }
  };

  const validateFields = () => {
    const errors: { title?: string; price?: string } = {};

    if (!editedFields.price || editedFields.price.trim() === '') {
      errors.price = 'Price is required';
    } else {
      const numPrice = Number(editedFields.price);
      if (
        numPrice > FIELD_LIMITS.price.max ||
        numPrice < FIELD_LIMITS.price.min
      ) {
        errors.price = `Price must be between $${FIELD_LIMITS.price.min} and $${FIELD_LIMITS.price.max}`;
      }
    }

    if (!editedFields.title || editedFields.title.trim() === '') {
      errors.title = 'Title is required';
    } else if (editedFields.title.trim().length < FIELD_LIMITS.title.min) {
      errors.title = `Title must be at least ${FIELD_LIMITS.title.min} characters`;
    }

    return errors;
  };

  const handleSaveChanges = async () => {
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      // Focus the first field with an error
      if (errors.title) {
        setEditingField('title');
        titleInputRef.current?.focus();
      } else if (errors.price) {
        setEditingField('price');
        priceInputRef.current?.focus();
      }
      return;
    }

    try {
      const updates: Record<string, string | number> = {};

      if (editedFields.title && editedFields.title.trim()) {
        updates.name = editedFields.title.trim();
      }

      if (editedFields.price) {
        const numPrice = Number(editedFields.price);
        if (!isNaN(numPrice)) {
          updates.price = numPrice;
        }
      }

      if (editedFields.description) {
        updates.description = editedFields.description.trim();
      }

      if (Object.keys(updates).length > 0) {
        await handleUpdate(updates);
        await refetch();
      }

      setEditingField(null);
      setEditedFields({
        title: '',
        price: '',
        description: '',
      });
      setIsEditMode(false);
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditedFields({
      title: '',
      price: '',
      description: '',
    });
    setIsEditMode(false);
  };

  const handleImageUpdate = async (newImageUrl: string) => {
    setIsImageLoading(true);
    try {
      await handleUpdate({ imageUrl: newImageUrl });
      await refetch();
      setImageModalOpen(false);
    } finally {
      setIsImageLoading(false);
    }
  };

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return {
    editingField,
    editedFields,
    isEditMode,
    imageModalOpen,
    isImageLoading,
    isDescriptionExpanded,
    setIsEditMode,
    setEditingField,
    setImageModalOpen,
    handleStartEdit,
    handleSave: handleSaveChanges,
    handleCancel,
    handlePriceChange,
    handleImageUpdate,
    toggleEditMode,
    handleFieldChange,
    toggleDescription,
    titleInputRef,
    priceInputRef,
    descriptionInputRef,
    validationErrors,
    getFieldTip,
  };
};
