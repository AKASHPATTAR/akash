import React from 'react';

const MobileStores = ({ onlinePrice }) => {
  const stores = [
    {
      name: 'Pai Mobile Shop',
      address: 'Engineering College, Plot No. 49/2, 19th Cross, Main Road, Vidayagiri, Bagalkote, Karnataka 587102',
      phone: '096069 71552',
      // priceIncrease: 1500,
      offers: [
        'Free Screen Guard',
        'Free Phone Case',
        '1 Year Extended Warranty'
      ]
    },
    {
      name: 'Sangeeta Mobile',
      address: 'The address of this store is Shop No 1, JK Balulmath Building, 17th Main, Hostel Road, Vidyagiri, Bagalkot, Karnataka.',
      phone: '080 6285 9335',
      // priceIncrease: 1800,
      offers: [
        'Free Screen Guard',
        'Free Phone Case',
        '6 Months Extended Warranty'
      ]
    },
    {
      name: 'Shrinidhi Mobile Shop',
      address: 'Near Temple, Bagalkot',
      phone: '080-345678',
      priceIncrease: 1600,
      offers: [
        'Free Screen Guard',
        'Free Phone Case',
        'Free Data Cable'
      ]
    }
    ,

  ];

  return (
    <div style={{ marginTop: '2rem', padding: '1rem' }}>
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
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h4 style={{
              color: '#ff9f00',
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
            <p style={{ margin: '1rem 0', color: '#ff9f00' }}>
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
                    color: '#ff9f00',
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

export default MobileStores;
