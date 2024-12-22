import React from 'react';

const LaptopStores = ({ onlinePrice }) => {
  const stores = [
    {
      name: 'Vasavi Technologies',
      address: 'Prema acrade near Engineering College  Circle,  vidyagiri Bagalkot',
      phone: '97390 01286',
      priceIncrease: 2000,
      offers: [
        'Free Laptop Bag',
        'Extended Warranty',
        'Free Antivirus Software',
        'price may very please contact them',
      ]
    },
    {
      name: 'Vision Technology',
      address: 'Near Ward No.10, 158 B, opp. Government Girls High School, Extension Area, Bagalkote, Mallapur, Karnataka 58710, Navanagar, Bagalkot',
      phone: '87227 70101',
      priceIncrease: 2500,
      offers: [
        'Free Laptop Bag',
        'Extended Warranty',
        'Free Antivirus Software',
        'price may very please contact them',
      ]
    }
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
              color: '#2874f0',
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
            <p style={{ margin: '1rem 0', color: '#2874f0' }}>
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
                    color: '#2874f0',
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

export default LaptopStores;
