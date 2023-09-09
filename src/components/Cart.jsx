import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png";

export default function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (productToRemove) => {
    const updatedCart = cart.filter(
      (product) => product.id !== productToRemove.id
    );

    setCart(updatedCart);
  };

  const handleBuy = () => {
    setCart([]); 
  };

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="">
          <p>Your cart is empty.</p>
          <img src={emptyCart} alt="empty cart" />
        </div>
      ) : (
        <div>
          <ul className="cart-list">
            {cart.map((product) => (
              <li key={product.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-title">{product.title}</span>
                  <span className="cart-item-price">${product.price}</span>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(product)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <p>Total Price: ${total.toFixed(2)}</p>
            <Link to="/thank-you">
              <button className="buy-button" onClick={handleBuy}>
                Buy
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
