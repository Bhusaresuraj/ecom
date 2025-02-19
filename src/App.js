import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import About from './pages/About';
import Chatbot from './components/Chatbot';
import { GlobalStyles } from './styles/GlobalStyles';

const theme = {
  colors: {
    primary: '#2C3E50',      // Deep blue-gray
    secondary: '#E67E22',    // Warm orange
    accent: '#27AE60',       // Fresh green
    background: '#F9F9F9',   // Light gray
    text: '#2C3E50',         // Dark blue-gray
    lightText: '#7F8C8D',    // Medium gray
    white: '#FFFFFF',
    error: '#E74C3C',        // Red
    success: '#2ECC71'       // Green
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
    large: '0 8px 24px rgba(0, 0, 0, 0.2)'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    circle: '50%'
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease'
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1200px'
  },
  mediaQueries: {
    mobile: `@media (min-width: 320px)`,
    tablet: `@media (min-width: 768px)`,
    laptop: `@media (min-width: 1024px)`,
    desktop: `@media (min-width: 1200px)`
  }
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CartProvider>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
            <Chatbot />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App; 