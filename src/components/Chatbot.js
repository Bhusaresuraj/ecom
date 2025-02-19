import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const ChatbotContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.medium};
  color: white;
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: scale(1.1);
  }
`;

const ChatWindow = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 300px;
  height: 400px;
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.large};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1.1rem;
  }

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px;
    
    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  max-width: 80%;
  padding: 0.8rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  ${props => props.isBot ? `
    background-color: ${props.theme.colors.background};
    align-self: flex-start;
  ` : `
    background-color: ${props.theme.colors.primary};
    color: white;
    align-self: flex-end;
  `}
`;

const ChatInput = styled.form`
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.colors.background};
  display: flex;
  gap: 0.5rem;

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid ${props => props.theme.colors.background};
    border-radius: ${props => props.theme.borderRadius.small};
    outline: none;

    &:focus {
      border-color: ${props => props.theme.colors.secondary};
    }
  }

  button {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: ${props => props.theme.borderRadius.small};
    padding: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: ${props => props.theme.colors.secondary};
    }
  }
`;

const chatbotResponses = {
  greeting: "Hello! How can I help you today?",
  products: "We offer a variety of products including dry fruits, water bottles, and mugs. Would you like to know more about any specific category?",
  shipping: "We offer free shipping on orders above $50. Standard delivery takes 3-5 business days.",
  contact: "You can reach us at info@giftmart.com or call us at (123) 456-7890.",
  default: "I'm not sure about that. Would you like to speak with a customer service representative?"
};

const getResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
    return chatbotResponses.greeting;
  } else if (lowerMessage.includes('product') || lowerMessage.includes('items')) {
    return chatbotResponses.products;
  } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
    return chatbotResponses.shipping;
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
    return chatbotResponses.contact;
  }
  return chatbotResponses.default;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    
    // Add bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: getResponse(input), isBot: true }]);
    }, 500);

    setInput('');
  };

  return (
    <ChatbotContainer>
      <ChatButton onClick={() => setIsOpen(!isOpen)}>
        <ChatBubbleIcon />
      </ChatButton>

      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ChatHeader>
              <h3>GiftMart Assistant</h3>
              <button onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </button>
            </ChatHeader>

            <ChatMessages>
              {messages.map((message, index) => (
                <Message key={index} isBot={message.isBot}>
                  {message.text}
                </Message>
              ))}
            </ChatMessages>

            <ChatInput onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="submit">
                <SendIcon />
              </button>
            </ChatInput>
          </ChatWindow>
        )}
      </AnimatePresence>
    </ChatbotContainer>
  );
};

export default Chatbot; 