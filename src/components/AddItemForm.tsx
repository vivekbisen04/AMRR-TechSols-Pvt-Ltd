import React, { useState } from 'react';
import { Upload, X, Image, CheckCircle } from 'lucide-react';
import { useItems } from '../contexts/ItemsContext';
import { ITEM_TYPES } from '../utils/constants';
import { validateItemForm, isValidImageFile, formatFileSize } from '../utils/validation';

export const AddItemForm: React.FC = () => {
  const { addItem } = useItems();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    customType: '',
    description: '',
    coverImage: null as File | null,
    additionalImages: [] as File[]
  });

  const [previews, setPreviews] = useState({
    coverImage: '',
    additionalImages: [] as string[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidImageFile(file)) {
      setFormData(prev => ({ ...prev, coverImage: file }));
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreviews(prev => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
      
      if (errors.coverImage) {
        setErrors(prev => ({ ...prev, coverImage: '' }));
      }
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(isValidImageFile).slice(0, 5);
    
    setFormData(prev => ({ 
      ...prev, 
      additionalImages: [...prev.additionalImages, ...validFiles].slice(0, 5)
    }));

    // Create previews for new files
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviews(prev => ({
          ...prev,
          additionalImages: [...prev.additionalImages, reader.result as string].slice(0, 5)
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
    setPreviews(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
  };

  const removeCoverImage = () => {
    setFormData(prev => ({ ...prev, coverImage: null }));
    setPreviews(prev => ({ ...prev, coverImage: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalType = formData.type === 'Custom' ? formData.customType : formData.type;
    const validationData = {
      name: formData.name,
      type: finalType,
      description: formData.description,
      coverImage: formData.coverImage
    };

    const validation = validateItemForm(validationData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate image upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, you'd upload images and get URLs
      // For demo, we'll use placeholder URLs
      const coverImageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400&h=400&fit=crop`;
      const additionalImageUrls = formData.additionalImages.map((_, index) => 
        `https://images.unsplash.com/photo-${Date.now() + index}?w=600&h=600&fit=crop`
      );

      addItem({
        name: formData.name,
        type: finalType,
        description: formData.description,
        coverImage: coverImageUrl,
        additionalImages: additionalImageUrls
      });

      setShowSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        type: '',
        customType: '',
        description: '',
        coverImage: null,
        additionalImages: []
      });
      setPreviews({
        coverImage: '',
        additionalImages: []
      });

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h2 className="text-2xl font-bold text-white">Add New Item</h2>
          <p className="text-blue-100 mt-1">Fill in the details to add your item</p>
        </div>

        {showSuccess && (
          <div className="p-4 bg-green-50 border-l-4 border-green-400 m-6 rounded-r-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-green-700 font-medium">Item successfully added!</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Item Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
                ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Enter item name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Item Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
              Item Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
                ${errors.type ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            >
              <option value="">Select item type</option>
              {ITEM_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
          </div>

          {/* Custom Type */}
          {formData.type === 'Custom' && (
            <div>
              <label htmlFor="customType" className="block text-sm font-semibold text-gray-700 mb-2">
                Custom Type *
              </label>
              <input
                type="text"
                id="customType"
                name="customType"
                value={formData.customType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter custom type"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none
                ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Describe your item (minimum 10 characters)"
            />
            <div className="flex justify-between mt-1">
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              <p className="text-gray-500 text-sm ml-auto">{formData.description.length} characters</p>
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Image *
            </label>
            {!previews.coverImage ? (
              <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer hover:border-blue-400 hover:bg-blue-50
                ${errors.coverImage ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="hidden"
                  id="coverImage"
                />
                <label htmlFor="coverImage" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 font-medium">Click to upload cover image</p>
                  <p className="text-gray-500 text-sm mt-1">PNG, JPG, WEBP up to 10MB</p>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={previews.coverImage}
                  alt="Cover preview"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeCoverImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            {errors.coverImage && <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>}
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Images (Optional, max 5)
            </label>
            
            {formData.additionalImages.length < 5 && (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-colors cursor-pointer hover:border-blue-400 hover:bg-blue-50 mb-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                  className="hidden"
                  id="additionalImages"
                />
                <label htmlFor="additionalImages" className="cursor-pointer">
                  <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 text-sm">Add more images ({formData.additionalImages.length}/5)</p>
                </label>
              </div>
            )}

            {previews.additionalImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {previews.additionalImages.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Additional preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold 
              hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 
              disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding Item...</span>
              </div>
            ) : (
              'Add Item'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};