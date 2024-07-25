import React from 'react';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#f5f5f5', padding: '16px', margin: '32px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Левая часть футера */}
        <div>
          <p style={{ color: '#333', marginBottom: '8px' }}>© 2024 Your Company Name</p>
          {/* Если у вас есть логотип компании, замените следующую строку на соответствующий тег img */}
          {/* <img src="../path/to/your/logo.png" alt="Your Company Logo" /> */}
        </div>

        {/* Правая часть футера с ссылками на социальные сети */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="#" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
