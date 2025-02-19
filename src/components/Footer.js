import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 3rem 1rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  @media (max-width: 767px) {
    text-align: center;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About Us</h3>
          <p>Premium gift and dry fruits store offering the finest selection of products for all occasions.</p>
        </FooterSection>
        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li><StyledLink to="/">Home</StyledLink></li>
            <li><StyledLink to="/products">Products</StyledLink></li>
            <li><StyledLink to="/cart">Cart</StyledLink></li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>Contact Us</h3>
          <ul>
            <li>Email: info@giftmart.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: 123 Gift Street, Shop City</li>
          </ul>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 