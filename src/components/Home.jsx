import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ReactSwipe from "react-swipe";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  let reactSwipeEl;

  const carouselContainerStyle = {
    position: "relative",
    width: "90%",
  };

  const imageContainerStyle = {
    width: "100%",
    height: "350px",
    overflow: "hidden",
    position: "relative",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  };

  const buttonStyle = {
    backgroundColor: "rgba(90, 90, 90, 0.7)",
    color: "rgba(255, 255, 255, 0.7)",
    border: "none",
    padding: "10px 15px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "24px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };
  const qaData = [
    {
      question: "What products do you offer?",
      answer:
        "We offer a wide range of products including electronics, exquisite jewelry, and stylish clothing for both men and women.",
    },
    {
      question: "How can I track my order?",
      answer:
        "To track your order, simply go to the 'Order Tracking' page on our website and enter your order number and email address. You'll receive real-time updates on your order's status.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept a variety of payment methods, including credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. You can select your preferred payment method during checkout.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to many countries. During the checkout process, you can select your country from the list of available shipping destinations.",
    },
  ];
  const reviews = [
    {
      name: "Alice",
      rating: 5,
      comment: "Great products and fast shipping!",
    },
    {
      name: "Bob",
      rating: 4,
      comment: "Good variety of items, but shipping could be faster.",
    },
  ];
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <span key={i} className="star filled" role="img" aria-label="star">
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star" role="img" aria-label="star">
            &#9733;
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our Website</h1>

      <div style={carouselContainerStyle}>
        <ReactSwipe
          className="carousel"
          swipeOptions={{ continuous: false }}
          ref={(el) => (reactSwipeEl = el)}
        >
          <div style={imageContainerStyle}>
            <img src={img1} alt="Image 1" style={imageStyle} />
          </div>
          <div style={imageContainerStyle}>
            <img src={img2} alt="Image 2" style={imageStyle} />
          </div>
          <div style={imageContainerStyle}>
            <img src={img3} alt="Image 3" style={imageStyle} />
          </div>
        </ReactSwipe>

        <button
          onClick={() => reactSwipeEl.next()}
          style={{ ...buttonStyle, right: "0" }}
        >
          &#9654;
        </button>
        <button
          onClick={() => reactSwipeEl.prev()}
          style={{ ...buttonStyle, left: "0" }}
        >
          &#9664;
        </button>
      </div>
      <div className="text-style">
        <p>
          Explore a wide range of products at our store, including electronics,
          exquisite jewelry, and stylish clothing for both men and women.
        </p>
        <p>
          Whether you're looking for the latest tech gadgets, stunning
          accessories, or trendy apparel, we have something for everyone. Shop
          with us and discover the perfect items to enhance your lifestyle.
        </p>
      </div>
      <div className="qa-section">
        <h2>Frequently Asked Questions</h2>
        {qaData.map((qa, index) => (
          <div
            className="qa-item"
            key={index}
            onClick={() => toggleDropdown(index)}
          >
            <div className="question">Q: {qa.question}</div>
            <div className={`answer ${openIndex === index ? "open" : ""}`}>
              A: {qa.answer}
            </div>
          </div>
        ))}
      </div>
      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        <div className="reviews-wrapper">
          {reviews.map((review, index) => (
            <div className="review" key={index}>
              <div className="review-header">
                <div className="review-profile">
                  <div className="blank-profile-pic">
                    {review.name.charAt(0)}
                  </div>
                  <div className="review-name">{review.name}</div>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
              <div className="review-comment">{review.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
