// NotFound.js
import React from 'react';
import './NotFound.css';
import notFoundIcon from '../assets/404.jpg'; // Make sure you have an image in your project directory

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img src={notFoundIcon} alt="Page Not Found" className="not-found-icon" />
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Page Not Found</p>
      <p className="not-found-description">
        Sorry, the page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <a href="/" className="not-found-home-button">Go to Home</a>
    </div>
  );
};

export default NotFound;
