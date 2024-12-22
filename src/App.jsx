import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import ComparisonPage from './components/ComparisonPage';
import NotFound from './components/NotFound';
import config from './config';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('mobile');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${config.apiBaseUrl}/api/products/${selectedCategory}`);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCompareClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseComparison = () => {
    setSelectedProduct(null);
  };

  const formatPrice = (priceStr) => {
    if (!priceStr) return '';
    return priceStr.replace('₹', '').replace(',', '');
  };

  const formatProductDisplay = (product) => {
    const currentPrice = formatPrice(product.nx9bqj);
    const originalPrice = formatPrice(product.yray8j);
    const discount = originalPrice && currentPrice 
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : null;

    
    const textLines = product.Text?.split('\n') || [];
    const exchangeOffer = textLines.find(line => line.includes('Exchange'))?.trim();
    const comboOffer = textLines.find(line => line.includes('combo'))?.trim();

    return (
      <div className="product-info">
        <h3>{product.Title}</h3>
        <div className="product-details">
          <div className="price-section">
            <span className="current-price">{product.nx9bqj || '₹N/A'}</span>
            {product.yray8j && (
              <>
                <span className="original-price">{product.yray8j}</span>
                {discount && <span className="discount">{discount}% off</span>}
              </>
            )}
          </div>
          
          <div className="offers-section">
            {exchangeOffer && (
              <div className="offer-item">
                <span className="offer-icon">↔️</span>
                <span>{exchangeOffer}</span>
              </div>
            )}
            {comboOffer && (
              <div className="offer-item">
                <span className="offer-icon">🎁</span>
                <span>{comboOffer}</span>
              </div>
            )}
          </div>

          <div className="rating-section">
            {product.xqddhh && (
              <>
                <span className="rating">⭐ {product.xqddhh}</span>
                <span className="ratings-count">{product.Text?.split('\n')[2] || ''}</span>
              </>
            )}
          </div>

          <div className="features-section">
            {product.jigdf && <div className="feature-item">• {product.jigdf}</div>}
            {product.jigdf2 && <div className="feature-item">• {product.jigdf2}</div>}
            {product.jigdf3 && <div className="feature-item">• {product.jigdf3}</div>}
            {product.jigdf4 && <div className="feature-item">• {product.jigdf4}</div>}
            {product.jigdf5 && <div className="feature-item">• {product.jigdf5}</div>}
          </div>

          {product.Text?.includes('Free delivery') && (
            <div className="delivery-info">
              <span className="free-delivery">✓ Free Delivery</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              {selectedProduct ? (
                <ComparisonPage 
                  product={selectedProduct} 
                  onClose={handleCloseComparison}
                />
              ) : (
                <>
                  <header>
                    <h1> PRODUCT LIST </h1>
                    <div className="category-buttons">
                      <button 
                        className={selectedCategory === 'laptop' ? 'active' : ''} 
                        onClick={() => setSelectedCategory('laptop')}
                      >
                        Laptops
                      </button>
                      <button 
                        className={selectedCategory === 'mobile' ? 'active' : ''} 
                        onClick={() => setSelectedCategory('mobile')}
                      >
                        Mobiles
                      </button>
                      <button 
                        className={selectedCategory === 'washingmachine' ? 'active' : ''} 
                        onClick={() => setSelectedCategory('washingmachine')}
                      >
                        Washing Machines
                      </button>
                    </div>
                    <button onClick={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}>
                      {viewMode === 'grid' ? 'List View' : 'Grid View'}
                    </button>
                  </header>

                  {loading && <div className="loading">Loading...</div>}
                  {error && <div className="error">Error: {error}</div>}
                  
                  <div className={`products-${viewMode}`}>
                    {products.map((product, index) => (
                      <div key={index} className="product-card">
                        <img src={product.Image} alt={product.Title} />
                        {formatProductDisplay(product)}
                        <button className="compare-button" onClick={() => handleCompareClick(product)}>
                          Compare Prices
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
