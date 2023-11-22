import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';

const SignatureField = ({ field, onDragStop, onResizeStop, signatureImage }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    setBackgroundColor(field.background || `#${Math.floor(Math.random()*16777215).toString(16)}`);
  }, [field.background]);

  const handleDelete = (event) => {
    event.preventDefault(); 
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  // Estilos transferidos del primer componente
  const fieldStyle = {
    border: '1px solid #007bff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundSize: '100% 100%',
    backgroundImage: `url(${signatureImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: signatureImage ? '#fff' : backgroundColor,
    color: 'black',
    fontSize: '14px'
  };

  const resizeDotStyle = {
    position: 'absolute',
    width: '10px',
    height: '10px',
    background: '#fff',
    border: '1px solid #007bff',
    borderRadius: '50%',
  };

  // Estilos del botón de eliminar (copiados del primer componente)
  const removeButtonStyle = {
    position: 'absolute',
    right: '18px', 
    top: '-6px',
    zIndex: 1000,
    background: 'red',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    padding: '2px',
    borderRadius: '0%',
    fontSize: '10px',
    lineHeight: '10px',
    textAlign: 'center',
    height: '12px',
    width: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };


  return (
    <Rnd
      size={{ width: field.width, height: field.height }}
      position={{ x: field.x, y: field.y }}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      bounds="parent"
      style={fieldStyle}
      enableResizing={{
        topLeft: true,
        topRight: true,
        bottomLeft: true,
        bottomRight: true,
      }}
      minWidth={32.1094}
      minHeight={30.8594}
      maxWidth={380.172}
      maxHeight={200.431}
      lockAspectRatio={true}
    >
      
      <button 
        onClick={handleDelete}
        onTouchEnd={handleDelete} 
        style={removeButtonStyle}>
        X
      </button>
      <div style={{ ...resizeDotStyle, top: '-5px', left: '-5px' }} />
      <div style={{ ...resizeDotStyle, top: '-5px', right: '-5px' }} />
      <div style={{ ...resizeDotStyle, bottom: '-5px', left: '-5px' }} />
      <div style={{ ...resizeDotStyle, bottom: '-5px', right: '-5px' }} />
      {field.text}
    </Rnd>
  );
};

export default SignatureField;
