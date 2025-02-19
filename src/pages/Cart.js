import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const CartItem = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
  
  @media (min-width: 768px) {
    grid-template-columns: 100px 2fr 1fr 1fr auto;
    align-items: center;
  }
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    text-align: center;
    
    img {
      margin: 0 auto;
    }
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const ItemControls = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Cart = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContainer>
      <h1>Shopping Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {state.items.map(item => (
            <CartItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{formatPrice(item.price)}</p>
              </div>
              <QuantityControl>
                <Button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                <span>{item.quantity}</span>
                <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
              </QuantityControl>
              <p>{formatPrice(item.price * item.quantity)}</p>
              <Button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}>
                Remove
              </Button>
            </CartItem>
          ))}
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <h2>Total: {formatPrice(total)}</h2>
            <Button style={{ marginTop: '1rem' }}>Proceed to Checkout</Button>
          </div>
        </>
      )}
    </CartContainer>
  );
};

export default Cart; 