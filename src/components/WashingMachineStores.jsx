import React from 'react';

const WashingMachineStores = ({ onlinePrice }) => {
  const stores = [
    {
      name: 'Veerabhadreshwar Store',
      address: 'Near Basaveshwar Circle, Bagalkot',
      phone: '094481 12233',
      priceIncrease: 2000,
      offers: [
        'Free Installation',
        '2 Years Extended Warranty',
        'Free First Service'
      ]
    },
    {
      name: 'Harsha Store',
      address: 'Near SBM Bank, Navanagar, Bagalkot',
      phone: '094481 12244',
      priceIncrease: 2500,
      offers: [
        'Free Installation',
        '1 Year Extended Warranty',
        'Free Stabilizer'
      ]
    }
  ];

  return (
    <div className="offline-stores" style={{ 
      marginTop: '2rem', 
      padding: '1rem',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ 
        color: '#2c3e50', 
        marginBottom: '1.5rem', 
        textAlign: 'center', 
        fontSize: '1.5rem' 
      }}>
        Available at Local Stores in Bagalkot
      </h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem', 
        padding: '1rem' 
      }}>
        {stores.map((store, index) => (
          <div key={index} style={{ 
            background: 'white',
            border: '1px solid #e1e8ed',
            borderRadius: '8px', 
            padding: '1.5rem',
            transition: 'transform 0.2s, box-shadow 0.2s',
            ':hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }
          }}>
            <h4 style={{ 
              color: '#388e3c', 
              margin: '0 0 1rem 0', 
              fontSize: '1.2rem' 
            }}>
              {store.name}
            </h4>
            <p style={{ margin: '0.5rem 0', color: '#666' }}>
              <strong>Address:</strong> {store.address}
            </p>
            <p style={{ margin: '0.5rem 0', color: '#666' }}>
              <strong>Phone:</strong> {store.phone}
            </p>
            <p style={{ margin: '1rem 0', color: '#388e3c' }}>
              <strong>Estimated Price:</strong> ₹{(onlinePrice + store.priceIncrease).toLocaleString()}
              <span style={{ 
                display: 'block', 
                color: '#666', 
                fontSize: '0.8rem', 
                marginTop: '0.25rem' 
              }}>
                (₹{store.priceIncrease.toLocaleString()} more than online)
              </span>
            </p>
            <div style={{ marginTop: '1rem' }}>
              <strong>Special Offers:</strong>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: '0.5rem 0 0 0' 
              }}>
                {store.offers.map((offer, i) => (
                  <li key={i} style={{ 
                    color: '#388e3c', 
                    margin: '0.25rem 0', 
                    paddingLeft: '1.5rem',
                    position: 'relative'
                  }}>
                    <span style={{ 
                      position: 'absolute', 
                      left: 0 
                    }}>🎁</span>
                    {offer}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WashingMachineStores;
