import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientMove = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const HomeContainer = styled.div`
  min-height: calc(100vh - 140px);
`;

const Hero = styled.div`
  height: 90vh;
  background: linear-gradient(-45deg, 
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.secondary},
    ${props => props.theme.colors.accent},
    ${props => props.theme.colors.primary}
  );
  background-size: 400% 400%;
  animation: ${gradientMove} 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent 50%, rgba(0,0,0,0.5) 100%);
  }
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  color: white;
  z-index: 1;
  padding: 2rem;

  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    font-weight: 700;
    background: linear-gradient(to right, #fff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
`;

const ShopButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2.5rem;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  font-size: 1.1rem;
  transition: all ${props => props.theme.transitions.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const FeaturedSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${props => props.theme.colors.background};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 3rem;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoryCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.small};
  transition: transform ${props => props.theme.transitions.medium};
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .content {
    padding: 1.5rem;
    text-align: center;

    h3 {
      color: ${props => props.theme.colors.primary};
      margin-bottom: 0.5rem;
    }

    p {
      color: ${props => props.theme.colors.lightText};
    }
  }
`;

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <HomeContainer>
      <Hero>
        <HeroContent
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 variants={itemVariants}>
            Discover Perfect Gifts
          </motion.h1>
          <motion.p variants={itemVariants}>
            Explore our curated collection of premium gifts
          </motion.p>
          <motion.div variants={itemVariants}>
            <ShopButton to="/products">
              Explore Collection
            </ShopButton>
          </motion.div>
        </HeroContent>
      </Hero>

      <FeaturedSection>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Featured Categories</SectionTitle>
        </motion.div>

        <CategoryGrid>
          <CategoryCard
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/images/dry-fruits-category.jpg" alt="Dry Fruits" />
            <div className="content">
              <h3>Premium Dry Fruits</h3>
              <p>Handpicked selection of finest dry fruits</p>
            </div>
          </CategoryCard>

          <CategoryCard
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/images/bottles-category.jpg" alt="Water Bottles" />
            <div className="content">
              <h3>Designer Bottles</h3>
              <p>Stylish and sustainable water bottles</p>
            </div>
          </CategoryCard>

          <CategoryCard
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/images/mugs-category.jpg" alt="Mugs" />
            <div className="content">
              <h3>Elegant Mugs</h3>
              <p>Beautiful mugs for every occasion</p>
            </div>
          </CategoryCard>
        </CategoryGrid>
      </FeaturedSection>
    </HomeContainer>
  );
};

export default Home; 