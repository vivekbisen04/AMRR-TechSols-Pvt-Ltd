import React, { useState, useEffect } from 'react';
import { X, Mail, Calendar, Tag, Image as ImageIcon } from 'lucide-react';
import { Item } from '../types/item.types';
import { ImageCarousel } from './ImageCarousel';

interface ItemModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, isOpen, onClose }) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isEnquiring, setIsEnquiring] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Move this after the early return to ensure item is not null
  const allImages = [item.coverImage, ...item.additionalImages];

  const handleEnquire = async () => {
    setIsEnquiring(true);
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you'd integrate with EmailJS or similar service
    alert(`Enquiry sent for "${item.name}"! We'll get back to you soon.`);
    setIsEnquiring(false);
  };

  const openCarousel = (index: number) => {
    setCarouselIndex(index);
    setShowCarousel(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{item.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Tag className="h-4 w-4" />
                  <span>{item.type}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                {item.additionalImages.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <ImageIcon className="h-4 w-4" />
                    <span>{allImages.length} images</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Main Image */}
            <div className="mb-6">
              <img
                src={item.coverImage}
                alt={item.name}
                className="w-full h-64 sm:h-80 object-cover rounded-xl cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => openCarousel(0)}
              />
            </div>

            {/* Additional Images */}
            {item.additionalImages.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {item.additionalImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${item.name} - Image ${index + 2}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
                      onClick={() => openCarousel(index + 1)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* Enquire Button */}
            <div className="flex justify-center">
              <button
                onClick={handleEnquire}
                disabled={isEnquiring}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold
                  hover:from-emerald-600 hover:to-teal-700 focus:ring-4 focus:ring-emerald-300 transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95
                  flex items-center space-x-2"
              >
                {isEnquiring ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5" />
                    <span>Enquire About This Item</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      {showCarousel && (
        <ImageCarousel
          images={allImages}
          currentIndex={carouselIndex}
          onIndexChange={setCarouselIndex}
          onClose={() => setShowCarousel(false)}
        />
      )}
    </>
  );
};