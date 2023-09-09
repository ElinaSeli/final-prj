import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useProductContext } from "../ProductContext";

export default function ProductPage({ refreshProductList }) {
  const { id } = useParams();
  const { products, updateProduct } = useProductContext();
  const [product, setProduct] = useState({});
  const [editedProduct, setEditedProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        editedProduct
      );
      const updatedProduct = response.data;
      setProduct(updatedProduct);
      setIsEditing(false);
  
      updateProduct(updatedProduct); 
      refreshProductList();
  
      console.log("After update:", updatedProduct);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleEdit = () => {
    setEditedProduct(product);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };
  const handleUpdateProduct = async (updatedProduct) => {
    try {
    
      console.log("Before update:", product);

      updateProduct(updatedProduct);

      console.log("After update:", updatedProduct);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="product-page">
      <div className="image-container">
        <img className="image" src={product.image} alt="" />
      </div>
      <div className="text-content">
        <div className="name">{product.title}</div>
        <div className="category">{product.category}</div>
        <div className="description">{product.description}</div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="form-row">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                value={editedProduct.title}
                onChange={handleInputChange}
                id="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                id="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                id="price"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image URL:</label>
              <input
                type="text"
                name="image"
                value={editedProduct.image}
                onChange={handleInputChange}
                id="image"
              />
            </div>
            <button type="submit" className="edit-button">
              Save
            </button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </form>
        ) : (
          <button
          onClick={handleEdit}
          className="edit-button"
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "18px",
            cursor: "pointer",
            padding: "10px",
          }}
        >
          Edit
        </button>
        )}
      </div>
    </div>
  );
  
  
}
