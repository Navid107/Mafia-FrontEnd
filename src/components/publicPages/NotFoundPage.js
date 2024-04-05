import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-message">The page you're looking for does not exist.</p>
      <Link to="/" className="not-found-link">Go to Home</Link>
    </div>
  );
};

export default NotFoundPage;
