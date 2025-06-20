import React from 'react';
import { Package, Plus, Eye } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: 'add' | 'view';
  onPageChange: (page: 'add' | 'view') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ItemFlow</h1>
                <p className="text-xs text-gray-500">Manage your items</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex space-x-1">
              <button
                onClick={() => onPageChange('add')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 
                  ${currentPage === 'add' 
                    ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:block">Add Item</span>
              </button>
              <button
                onClick={() => onPageChange('view')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${currentPage === 'view' 
                    ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:block">View Items</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};