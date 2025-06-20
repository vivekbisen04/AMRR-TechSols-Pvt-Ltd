export const validateItemForm = (data: {
  name: string;
  type: string;
  description: string;
  coverImage: File | null;
}) => {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = 'Item name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Item name must be at least 2 characters';
  }

  if (!data.type.trim()) {
    errors.type = 'Item type is required';
  }

  if (!data.description.trim()) {
    errors.description = 'Item description is required';
  } else if (data.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  if (!data.coverImage) {
    errors.coverImage = 'Cover image is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
};