import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Modal, Button, Box, styled, Snackbar, Alert } from '@mui/material';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ModalContent = styled(Box)({
  backgroundColor: 'black',
  borderRadius: '10px',
  padding: '20px',
  outline: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '90vw',
  maxWidth: '1000px',
});

const SignatureModal = ({ isOpen, onClose, onSelectSignature }) => {
  const [isCreating, setIsCreating] = useState(false);
  const sigCanvasRef = useRef();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const predefinedSignatureSrc = '/assets/imgs/firmaPredefinida.png';

  const selectPredefinedSignature = () => {
    onSelectSignature(predefinedSignatureSrc); 
    onClose();
  };

  const saveSignature = () => {
    const signatureURL = sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png');
    onSelectSignature(signatureURL); 
    onClose();
  };

  const clearSignature = () => {
    sigCanvasRef.current.clear();
  };

  const handleCloseModal = (event, reason) => {
    if (reason === 'backdropClick') {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <StyledModal open={isOpen} onClose={handleCloseModal} disableBackdropClick>
        <ModalContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginRight="50px"
          >
            <Button
              onClick={() => setIsCreating(false)}
              variant="contained"
              style={{
                backgroundColor: 'white',
                color: 'black',
                marginBottom: '20px',
              }}
            >
              Usar Firma Predefinida
            </Button>
            <Button
              onClick={() => setIsCreating(true)}
              variant="contained"
              style={{
                backgroundColor: 'white',
                color: 'black',
                marginBottom: '20px',
              }}
            >
              Crear Firma Propia
            </Button>
          </Box>
          {isCreating ? (
            <Box display="flex" flexDirection="column" alignItems="center">
              <SignatureCanvas
                ref={sigCanvasRef}
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'sigCanvas',
                  style: { backgroundColor: 'white', borderRadius: '5px' },
                }}
              />
              <Box
                display="flex"
                justifyContent="space-around"
                width="100%"
                marginTop="10px"
              >
                <Button
                  onClick={saveSignature}
                  variant="contained"
                  style={{ backgroundColor: 'white', color: 'black' }}
                >
                  Guardar Firma
                </Button>
                <Button
                  onClick={clearSignature}
                  variant="contained"
                  style={{ backgroundColor: 'white', color: 'black' }}
                >
                  Borrar Firma
                </Button>
              </Box>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center">
              <img
                src={predefinedSignatureSrc}
                alt="Firma Predefinida"
                style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
              />
              <Button
                onClick={selectPredefinedSignature}
                variant="contained"
                style={{ backgroundColor: 'white', color: 'black' }}
              >
                Usar Firma
              </Button>
            </Box>
          )}
        </ModalContent>
      </StyledModal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ width: '100%' }}
        >
          Debes escoger una opción
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignatureModal;
