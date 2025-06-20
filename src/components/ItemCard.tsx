import React from 'react';
import { Calendar, Tag } from 'lucide-react';
import { Item } from '../types/item.types';

interface ItemCardProps {
  item: Item;
  onClick: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden cursor-pointer
        transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-200
        group relative"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.coverImage}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
            {item.type}
          </span>
        </div>

        {/* Additional Images Indicator */}
        {item.additionalImages.length > 0 && (
          <div className="absolute top-3 left-3">
            <div className="bg-blue-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <span>+{item.additionalImages.length}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {item.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Tag className="h-3 w-3" />
            <span>{item.type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};