import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import Home from "./components/Home";
import ProductPage from "./components/ProductPage";
import Login from "./Login";
import Cart from "./components/Cart";
import ThankYou from "./components/Thanks";
import Footer from "./components/Footer";

export default function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [cart, setCart] = useState([]);
  const [productList, setProductList] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  useEffect(() => {
   
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
    }
  }, []);

  const removeFromCart = (productToRemove) => {
    const updatedCart = cart.filter(
      (product) => product.id !== productToRemove.id
    );
    setCart(updatedCart);
  };

  useEffect(() => {
 
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const refreshProductList = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      console.log("ProductList updated:", response.data); 
      setProductList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <BrowserRouter>
        <div className="navbar">
          <Link to="/">Home</Link>
          {isLoggedIn ? (
            <div className="">
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart</Link>
            </div>
          ) : (
            <Link to="/login">Log In</Link>
          )}
          {isLoggedIn && (
            <div className="logout-btn-container">
              <button className="logout-btn" onClick={handleLogout}>
                <Link to="/login">Log Out</Link>
              </button>
            </div>
          )}
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {isLoggedIn}
          <Route
            exact
            path="/products"
            element={
              <ProductList
                cart={cart}
                updateCart={setCart}
                productList={productList}
                refreshProductList={refreshProductList}
              />
            }
          />
          <Route
            exact
            path="/product/:id"
            element={<ProductPage refreshProductList={refreshProductList} />} // Pass refreshProductList as a prop
          />
          <Route
            exact
            path="/cart"
            element={<Cart cart={cart} removeFromCart={removeFromCart} />}
          />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route
            exact
            path="/login"
            element={isLoggedIn ? <Home /> : <Login onLogin={handleLogin} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
