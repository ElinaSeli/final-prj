import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import ProductBlock from "./ProductBlock";
import { useProductContext } from "../ProductContext";

export default function ProductList({ cart, updateCart }) {
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { products, updateProduct } = useProductContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://fakestoreapi.com/products";
        if (selectedCategory) {
          url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
        }
        const response = await axios.get(url);
        setProductList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value); 
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addToCart = (productId) => {
    console.log("addToCart called with productId:", productId);
    const productToAdd = productList.find(
      (product) => product.id === productId
    );

    if (productToAdd) {
      const cartItem = {
        id: productToAdd.id,
        title: productToAdd.title,
        price: productToAdd.price,
        quantity: 1,
      };

      updateCart([...cart, cartItem]);

      handleUpdateProduct(productToAdd);
    }
  };

  const filteredProducts = productList.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      console.log("Before update:", productList);

      updateProduct(updatedProduct);

      console.log("After update:", updatedProduct);

      await refreshProductList();
    } catch (error) {
      console.error(error);
    }
  };

  const refreshProductList = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProductList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      backgroundColor: state.isFocused ? "#fff" : "#333",
      color: state.isFocused ? "#333" : "white",
    }),
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "1px solid #007bff" : "1px solid #ccc",
      borderRadius: "5px",
      minWidth: "150px", 
      cursor: "pointer",
      fontSize: "14px",
    }),
  };
  

  return (
    <div className="product-list">
      <div className="filters">
        <label htmlFor="category" className="filter-label">
          Select a category:
        </label>
        <Select
          id="category"
          value={{ value: selectedCategory, label: selectedCategory }}
          onChange={handleCategoryChange}
          options={[
            { value: "", label: "All Categories" },
            { value: "electronics", label: "Electronics" },
            { value: "jewelery", label: "Jewelry" },
            { value: "men's clothing", label: "Men's Clothing" },
            { value: "women's clothing", label: "Women's Clothing" },
          ]}
          styles={customStyles}
        />
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearchChange}
          className="filter-input"
        />
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductBlock
            key={product.id}
            id={product.id}
            title={product.title}
            category={product.category}
            description={product.description}
            price={product.price}
            image={product.image}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
