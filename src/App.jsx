
import React from 'react';
import AppRouter from './AppRouter';
import { ProductProvider } from './ProductContext'; 

function App() {
  return (
    <ProductProvider> 
        <AppRouter />
    </ProductProvider>
  );
}

export default App;
