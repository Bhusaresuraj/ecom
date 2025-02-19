import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TextFieldsIcon from '@mui/icons-material/TextFields';

const CustomizerContainer = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.small};
`;

const PreviewContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CustomImage = styled.img`
  position: absolute;
  width: ${props => props.width}px;
  height: auto;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  cursor: move;
  user-select: none;
`;

const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const Controls = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ControlButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: ${props => props.theme.colors[props.variant || 'primary']};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const Slider = styled.input`
  width: 100%;
  max-width: 200px;
  margin: 0.5rem 0;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
`;

const TextInput = styled.input`
  width: 100%;
  max-width: 200px;
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: 0.5rem;
`;

const TextControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  padding: 1rem;
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.small};
`;

const CustomText = styled.div`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  font-size: ${props => props.fontSize}px;
  color: ${props => props.color};
  cursor: move;
  user-select: none;
  font-family: ${props => props.fontFamily};
  transform: rotate(${props => props.rotation}deg);
`;

const ColorPicker = styled.input`
  width: 50px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
`;

const FontSelect = styled.select`
  width: 100%;
  max-width: 200px;
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: 0.5rem;
`;

const ProductCustomizer = ({ productImage, onCustomizationComplete }) => {
  const [customImage, setCustomImage] = useState(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState(100);
  const fileInputRef = useRef(null);

  // New state for text customization
  const [customText, setText] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 50, y: 150 });
  const [isTextDragging, setIsTextDragging] = useState(false);
  const [textDragStart, setTextDragStart] = useState({ x: 0, y: 0 });
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textRotation, setTextRotation] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTextMouseDown = (e) => {
    setIsTextDragging(true);
    setTextDragStart({
      x: e.clientX - textPosition.x,
      y: e.clientY - textPosition.y
    });
  };

  const handleTextMouseMove = (e) => {
    if (isTextDragging) {
      setTextPosition({
        x: e.clientX - textDragStart.x,
        y: e.clientY - textDragStart.y
      });
    }
  };

  const handleTextMouseUp = () => {
    setIsTextDragging(false);
  };

  const handleReset = () => {
    setCustomImage(null);
    setPosition({ x: 50, y: 50 });
    setImageSize(100);
    setText('');
    setTextPosition({ x: 50, y: 150 });
    setTextColor('#000000');
    setFontSize(20);
    setFontFamily('Arial');
    setTextRotation(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = productImage;
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the product
      ctx.drawImage(img, 0, 0);
      
      // Draw the custom image if it exists
      if (customImage) {
        const customImg = new Image();
        customImg.src = customImage;
        customImg.onload = () => {
          ctx.drawImage(
            customImg,
            position.x,
            position.y,
            imageSize,
            (imageSize * customImg.height) / customImg.width
          );
          
          // Add text
          if (customText) {
            ctx.save();
            ctx.translate(textPosition.x, textPosition.y);
            ctx.rotate((textRotation * Math.PI) / 180);
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.fillStyle = textColor;
            ctx.fillText(customText, 0, 0);
            ctx.restore();
          }
          
          const finalImage = canvas.toDataURL('image/png');
          onCustomizationComplete(finalImage);
        };
      } else {
        // If there's only text, add it directly
        if (customText) {
          ctx.save();
          ctx.translate(textPosition.x, textPosition.y);
          ctx.rotate((textRotation * Math.PI) / 180);
          ctx.font = `${fontSize}px ${fontFamily}`;
          ctx.fillStyle = textColor;
          ctx.fillText(customText, 0, 0);
          ctx.restore();
        }
        const finalImage = canvas.toDataURL('image/png');
        onCustomizationComplete(finalImage);
      }
    };
  };

  return (
    <CustomizerContainer>
      <PreviewContainer
        onMouseMove={(e) => {
          handleMouseMove(e);
          handleTextMouseMove(e);
        }}
        onMouseUp={() => {
          handleMouseUp();
          handleTextMouseUp();
        }}
        onMouseLeave={() => {
          handleMouseUp();
          handleTextMouseUp();
        }}
      >
        <ProductImage src={productImage} alt="Product" />
        {customImage && (
          <CustomImage
            src={customImage}
            alt="Custom"
            width={imageSize}
            x={position.x}
            y={position.y}
            onMouseDown={handleMouseDown}
            draggable="false"
          />
        )}
        {customText && (
          <CustomText
            x={textPosition.x}
            y={textPosition.y}
            fontSize={fontSize}
            color={textColor}
            fontFamily={fontFamily}
            rotation={textRotation}
            onMouseDown={handleTextMouseDown}
          >
            {customText}
          </CustomText>
        )}
      </PreviewContainer>

      <Controls>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
          ref={fileInputRef}
          id="image-upload"
        />
        <UploadButton htmlFor="image-upload">
          <CloudUploadIcon /> Upload Image
        </UploadButton>

        <TextControls>
          <TextInput
            type="text"
            value={customText}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text..."
          />
          <ColorPicker
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
          <Slider
            type="range"
            min="10"
            max="50"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
          <FontSelect
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
          </FontSelect>
          <Slider
            type="range"
            min="-180"
            max="180"
            value={textRotation}
            onChange={(e) => setTextRotation(Number(e.target.value))}
          />
        </TextControls>

        {(customImage || customText) && (
          <>
            <ControlButton onClick={handleReset} variant="error">
              <RestartAltIcon /> Reset
            </ControlButton>
            <ControlButton onClick={handleSave} variant="success">
              Save Design
            </ControlButton>
          </>
        )}
      </Controls>
    </CustomizerContainer>
  );
};

export default ProductCustomizer; 