import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { AddItemForm } from './components/AddItemForm';
import { ViewItems } from './components/ViewItems';
import { ItemsProvider } from './contexts/ItemsContext';

function App() {
  const [currentPage, setCurrentPage] = useState<'add' | 'view'>('view');

  return (
    <ItemsProvider>
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {currentPage === 'add' ? (
          <AddItemForm />
        ) : (
          <ViewItems />
        )}
      </Layout>
    </ItemsProvider>
  );
}

export default App;