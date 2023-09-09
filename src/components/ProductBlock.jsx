import React from "react";
import { Link } from "react-router-dom";

export default function ProductBlock({
  id,
  title,
  price,
  description,
  image,
  category,
  addToCart,
}) {
  const product = { id, title, price };

  const handleAddToCart = () => {
    console.log("Adding to cart from ProductBlock:", product);
    addToCart(id);
  };

  return (
    <div className="product-block">
      <Link to={`/product/${id}`}>
        <img className="product-image" src={image} alt="" />
        <div className="product-details">
          <div className="product-title">{title}</div>
          <div className="product-category">{category}</div>
          <div className="product-description">{description}</div>
          <div className="product-price">${price}</div>
        </div>
      </Link>
      <button onClick={handleAddToCart} className="add-to-cart-button">
        Add to Cart
      </button>
    </div>
  );
}
