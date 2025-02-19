import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Card = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  position: relative;
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  background: white;
  position: relative;
  z-index: 1;
`;

const ProductTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
  font-size: 1.3rem;
  margin: 0.5rem 0;
`;

const ProductDescription = styled.p`
  color: ${props => props.theme.colors.lightText};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;

  ${props => props.primary ? `
    background-color: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      background-color: ${props.theme.colors.secondary};
    }
  ` : `
    background-color: transparent;
    color: ${props.theme.colors.primary};
    border: 1px solid ${props.theme.colors.primary};
    
    &:hover {
      background-color: ${props.theme.colors.primary};
      color: white;
    }
  `}
`;

const Badge = styled(motion.span)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 500;
  z-index: 2;
`;

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {product.isNew && (
        <Badge
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          New Arrival
        </Badge>
      )}
      
      <ImageContainer>
        <Link to={`/product/${product.id}`}>
          <ProductImage src={product.image} alt={product.name} />
        </Link>
      </ImageContainer>

      <ProductInfo>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductPrice>{formatPrice(product.price)}</ProductPrice>
        <ProductDescription>{product.description}</ProductDescription>
        
        <ButtonsContainer>
          <Button
            primary
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCartIcon /> Add to Cart
          </Button>
          <Button
            as={Link}
            to={`/product/${product.id}`}
            whileTap={{ scale: 0.95 }}
          >
            <VisibilityIcon /> View
          </Button>
        </ButtonsContainer>
      </ProductInfo>
    </Card>
  );
};

export default ProductCard; 