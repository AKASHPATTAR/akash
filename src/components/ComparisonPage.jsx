import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import OfflineStores from './OfflineStores';
import '../styles/ComparisonPage.css';

const ComparisonPage = ({ product, onClose }) => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      const currentPrice = parseFloat(product.nx9bqj?.replace(/[^0-9.]/g, '') || '0');
      const originalPrice = parseFloat(product.yray8j?.replace(/[^0-9.]/g, '') || '0');

      const amazonPrice = Math.floor(currentPrice * (1 + (Math.random() * 0.1 - 0.05)));

      const history = [];
      const today = new Date();
      const endDate = new Date('2024-12-24');
      const futureDays = 5;


      let currentDate = new Date('2024-12-22'); // DATE START 
      while (currentDate <= endDate) {
        // Generate random prices 
        const flipkartDayPrice = Math.floor(
          currentPrice + (originalPrice - currentPrice) * Math.random() * 0.5
        );
        const amazonDayPrice = Math.floor(
          amazonPrice + (originalPrice - amazonPrice) * Math.random() * 0.5
        );

        history.push({
          date: currentDate.toLocaleDateString(),
          Flipkart: flipkartDayPrice,
          Amazon: amazonDayPrice,
          isPrediction: false
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      const lastFlipkartPrice = history[history.length - 1].Flipkart;
      const lastAmazonPrice = history[history.length - 1].Amazon;
      const predictionStartDate = new Date(endDate);
      predictionStartDate.setDate(predictionStartDate.getDate() + 1);

      for (let i = 0; i < futureDays; i++) {

        const trend = Math.random() > 0.5 ? 1 : -1;
        const flipkartPrediction = Math.floor(
          lastFlipkartPrice * (1 + trend * Math.random() * 0.03)
        );
        const amazonPrediction = Math.floor(
          lastAmazonPrice * (1 + trend * Math.random() * 0.03)
        );

        predictionStartDate.setDate(predictionStartDate.getDate() + 1);
        history.push({
          date: predictionStartDate.toLocaleDateString(),
          Flipkart: flipkartPrediction,
          Amazon: amazonPrediction,
          isPrediction: true
        });
      }

      setPriceHistory(history);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="comparison-page">
        <div className="error-state">
          <p>Error: No product data available</p>
          <button onClick={onClose} className="back-button">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const currentPrice = parseFloat(product.nx9bqj?.replace(/[^0-9.]/g, '') || '0');
  const amazonPrice = Math.floor(currentPrice * (1 + (Math.random() * 0.1 - 0.05)));
  const priceDifference = Math.abs(currentPrice - amazonPrice);
  const bestDeal = currentPrice <= amazonPrice ? 'Flipkart' : 'Amazon';

  return (
    <div className="comparison-page">
      <div className="comparison-header">
        <button onClick={onClose} className="back-button">
          ← Back to Products
        </button>
        <h2>{product.Title || 'Product Comparison'}</h2>
      </div>

      <div className="comparison-content">
        <div className="product-details">
          <img
            src={product.Image}
            alt={product.Title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
            }}
          />
          <div className="product-info">
            <h3>{product.Title}</h3>
            <p className="rating">Rating: {product.xqddhh || 'N/A'}</p>
            <p className="specs">{product.jigdf || 'No specifications available'}</p>
            <p className="features">{product.jigdf2 || 'No features available'}</p>
          </div>
        </div>

        <div className="price-comparison-section">
          <h3>Price Comparison</h3>
          <div className="price-cards">
            <div className={`price-card ${bestDeal === 'Flipkart' ? 'best-deal' : ''}`}>
              <h4>Flipkart Price</h4>
              <p className="price">₹{currentPrice.toLocaleString()}</p>
              {bestDeal === 'Flipkart' && <span className="best-deal-badge">Best Deal!</span>}
            </div>
            <div className={`price-card ${bestDeal === 'Amazon' ? 'best-deal' : ''}`}>
              <h4>Amazon Price</h4>
              <p className="price">₹{amazonPrice.toLocaleString()}</p>
              {bestDeal === 'Amazon' && <span className="best-deal-badge">Best Deal!</span>}
            </div>
          </div>
          <p className="price-difference">
            Save ₹{priceDifference.toLocaleString()} on {bestDeal}
          </p>
        </div>

        <div className="price-history-section">
          <h3>Price History & Predictions</h3>
          <div className="price-chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  domain={['auto', 'auto']}
                />
                <Tooltip content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const isPrediction = payload[0]?.payload?.isPrediction;
                    return (
                      <div className="custom-tooltip">
                        <p className="date">{label}</p>
                        {isPrediction && (
                          <p className="prediction-label">Predicted Prices:</p>
                        )}
                        <p className="flipkart-price">
                          Flipkart: ₹{payload[0].value.toLocaleString()}
                        </p>
                        <p className="amazon-price">
                          Amazon: ₹{payload[1].value.toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Flipkart"
                  stroke="#2874f0"
                  strokeWidth={2}
                  dot={(props) => {
                    const isPrediction = props.payload.isPrediction;
                    return isPrediction ? (
                      <circle {...props} r={4} fill="#2874f0" stroke="#2874f0" strokeDasharray="3 3" />
                    ) : (
                      <circle {...props} r={4} fill="#2874f0" stroke="#2874f0" />
                    );
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="Amazon"
                  stroke="#ff9f00"
                  strokeWidth={2}
                  dot={(props) => {
                    const isPrediction = props.payload.isPrediction;
                    return isPrediction ? (
                      <circle {...props} r={4} fill="#ff9f00" stroke="#ff9f00" strokeDasharray="3 3" />
                    ) : (
                      <circle {...props} r={4} fill="#ff9f00" stroke="#ff9f00" />
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="price-legend">
            <div className="legend-item">
              <span className="dot history"></span> Historical Prices
            </div>
            <div className="legend-item">
              <span className="dot prediction"></span> Predicted Prices
            </div>
          </div>
        </div>

        <div className="offline-stores-section">
          <h3>Local Store Prices</h3>
          <OfflineStores
            productType={getProductType(product)}
            onlinePrice={currentPrice}
          />
        </div>
      </div>
    </div>
  );
};


const getProductType = (product) => {
  if (!product?.Title) return 'laptop';

  const title = product.Title.toLowerCase();
  const specs = (product.wphh3n || '').toLowerCase();

  if (title.includes('washing') || specs.includes('washing')) {
    return 'washingmachine';
  }

  if (title.includes('laptop') || title.includes('notebook') ||
    specs.includes('laptop') || specs.includes('processor')) {
    return 'laptop';
  }

  if (title.includes('mobile') || title.includes('phone') ||
    specs.includes('mobile') || specs.includes('battery') ||
    specs.includes('camera') || title.includes('iphone') ||
    title.includes('galaxy')) {
    return 'mobile';
  }

  return 'laptop';
};

export default ComparisonPage;
