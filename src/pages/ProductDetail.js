import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCustomizer from '../components/ProductCustomizer';
import { formatPrice } from '../utils/formatPrice';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 767px) {
    max-height: 400px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Price = styled.p`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
`;

const AddToCartButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 2rem;
  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }
`;

const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
`;

const CustomizerWrapper = styled.div`
  @media (max-width: 767px) {
    grid-column: 1 / -1;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const [customizedImage, setCustomizedImage] = useState(null);

  const product = products.find(p => p.id === parseInt(id));

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...product,
        image: customizedImage || product.image
      }
    });
  };

  const isCustomizable = product?.name.toLowerCase().includes('mug') || 
                        product?.name.toLowerCase().includes('bottle');

  const handleCustomizationComplete = (finalImage) => {
    setCustomizedImage(finalImage);
  };

  if (!product) {
    return (
      <NotFound>
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <BackButton onClick={() => navigate('/products')}>
          Back to Products
        </BackButton>
      </NotFound>
    );
  }

  return (
    <ProductContainer>
      <ProductImage src={customizedImage || product.image} alt={product.name} />
      <ProductInfo>
        <h1>{product.name}</h1>
        <Price>{formatPrice(product.price)}</Price>
        <p>{product.description}</p>
        <div>
          <h3>Product Details:</h3>
          <ul>
            {product.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
        <AddToCartButton onClick={handleAddToCart}>
          Add to Cart
        </AddToCartButton>
      </ProductInfo>

      {isCustomizable && (
        <CustomizerWrapper>
          <ProductCustomizer
            productImage={product.image}
            onCustomizationComplete={handleCustomizationComplete}
          />
        </CustomizerWrapper>
      )}
    </ProductContainer>
  );
};

export default ProductDetail; 