export interface Item {
  id: string;
  name: string;
  type: string;
  description: string;
  coverImage: string;
  additionalImages: string[];
  createdAt: Date;
}

export interface ItemFormData {
  name: string;
  type: string;
  description: string;
  coverImage: File | null;
  additionalImages: File[];
}

export type SortOption = 'name-asc' | 'name-desc' | 'type' | 'date-new' | 'date-old';

export interface ItemsContextType {
  items: Item[];
  addItem: (item: Omit<Item, 'id' | 'createdAt'>) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  filteredItems: Item[];
}