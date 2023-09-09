import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const updateProduct = (updatedProduct) => {
    const productIndex = products.findIndex((product) => product.id === updatedProduct.id);

    if (productIndex !== -1) {
      const updatedProducts = [...products];
      updatedProducts[productIndex] = updatedProduct;
      setProducts(updatedProducts);
    }
  };

  return (
    <ProductContext.Provider value={{ products, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
