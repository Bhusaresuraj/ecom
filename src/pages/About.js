import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
`;

const SubTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const Text = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const StoreInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Map = styled.iframe`
  width: 100%;
  height: 400px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ContactInfo = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const InfoItem = styled.div`
  margin-bottom: 1.5rem;
  
  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <Section>
        <Title>About GiftMart</Title>
        <Text>
          Welcome to GiftMart, your premier destination for thoughtful gifts and premium dry fruits. 
          Established in 2020, we've been dedicated to bringing joy to our customers through carefully 
          curated gift selections and high-quality products.
        </Text>
      </Section>

      <Section>
        <SubTitle>Our Story</SubTitle>
        <Text>
          GiftMart began with a simple idea: to make gift-giving easier and more meaningful. 
          We understand the importance of finding the perfect gift, whether it's for a special 
          occasion or just to show someone you care. Our collection of premium dry fruits, 
          elegant water bottles, and beautiful mugs has been carefully selected to help you 
          express your feelings in the most thoughtful way.
        </Text>
      </Section>

      <Section>
        <SubTitle>Visit Our Store</SubTitle>
        <StoreInfo>
          <ContactInfo>
            <InfoItem>
              <h3>Store Hours</h3>
              <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
              <p>Saturday: 10:00 AM - 6:00 PM</p>
              <p>Sunday: 11:00 AM - 5:00 PM</p>
            </InfoItem>
            
            <InfoItem>
              <h3>Contact Information</h3>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@giftmart.com</p>
            </InfoItem>
            
            <InfoItem>
              <h3>Location</h3>
              <p>123 Gift Street</p>
              <p>Shopping District</p>
              <p>City, State 12345</p>
            </InfoItem>
          </ContactInfo>
          
          <Map
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.98!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMCcwMC4wIk4gNzPCsDU4JzQ4LjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
            allowFullScreen
            loading="lazy"
            title="Store Location"
          />
        </StoreInfo>
      </Section>
    </AboutContainer>
  );
};

export default About; 