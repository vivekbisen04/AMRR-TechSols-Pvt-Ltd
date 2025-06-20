import React, { createContext, useContext, useMemo } from 'react';
import { Item, ItemsContextType, SortOption } from '../types/item.types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SAMPLE_ITEMS } from '../utils/constants';

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useLocalStorage<Item[]>('items', SAMPLE_ITEMS);
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');
  const [sortBy, setSortBy] = useLocalStorage<SortOption>('sortBy', 'date-new');

  const addItem = (itemData: Omit<Item, 'id' | 'createdAt'>) => {
    const newItem: Item = {
      ...itemData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setItems(prevItems => [newItem, ...prevItems]);
  };

  const filteredItems = useMemo(() => {
    let filtered = items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'date-new':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'date-old':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [items, searchTerm, sortBy]);

  const contextValue: ItemsContextType = {
    items,
    addItem,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filteredItems
  };

  return (
    <ItemsContext.Provider value={contextValue}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};