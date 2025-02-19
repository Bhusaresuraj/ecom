import React, { useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 2rem;
  padding: 2rem;
  
  @media (min-width: 320px) {
    grid-template-columns: 1fr;
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 4px;
  width: 300px;
  max-width: 100%;
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    color: white;
  }
`;

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || 
                           (category === 'dryfruit' && product.name.toLowerCase().includes('dry fruit')) ||
                           (category === 'bottles' && product.name.toLowerCase().includes('bottle')) ||
                           (category === 'mugs' && product.name.toLowerCase().includes('mug'));
    return matchesSearch && matchesCategory;
  });

  return (
    <ProductsContainer>
      <h1>Our Products</h1>
      <FilterSection>
        <SearchInput 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CategoryFilter>
          <FilterButton 
            active={category === 'all'} 
            onClick={() => setCategory('all')}
          >
            All Products
          </FilterButton>
          <FilterButton 
            active={category === 'dryfruit'} 
            onClick={() => setCategory('dryfruit')}
          >
            Dry Fruits
          </FilterButton>
          <FilterButton 
            active={category === 'bottles'} 
            onClick={() => setCategory('bottles')}
          >
            Water Bottles
          </FilterButton>
          <FilterButton 
            active={category === 'mugs'} 
            onClick={() => setCategory('mugs')}
          >
            Mugs & Cups
          </FilterButton>
        </CategoryFilter>
      </FilterSection>
      <ProductGrid>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </ProductsContainer>
  );
};

export default Products; 