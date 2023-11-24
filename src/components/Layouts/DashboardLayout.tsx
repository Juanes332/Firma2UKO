import React, { useState, useRef, useEffect, createRef } from "react";
import { Box, Button, styled, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import DashboardNavbar from "./DashboardNavbar";
import { Document, Page, pdfjs } from "react-pdf";
import DashboardSideBar from "./DashboardSideBar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SignatureField from "./SignatureField";
import SignatureModal from "./SignatureModal";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DocumentHeader = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px", // Espacio entre elementos
  marginBottom: "1rem",
});

const PdfViewer = styled(Box)({
  maxHeight: "500px",
  overflowY: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "top",
  padding: "1rem",
  marginTop: "1rem",
  backgroundColor: "#f0f0f0",
  borderRadius: "5px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
});
const FloatingNavBar = styled(Box)({
  position: "relative",
  top: 0,
  right: 10,
  display: "flex",
  gap: "10px",
  padding: "2px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "5px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  justifyContent: "center",
});

const NavButton = styled(Button)({
  backgroundColor: "#f1f1f1",
  color: "black",
  "&:hover": {
    backgroundColor: "#bdbdbd",
  },
});

const Wrapper = styled(Box)<{ show?: boolean }>(({ theme, show }) => ({
  paddingLeft: "3rem",
  paddingRight: "3rem",
  transition: "0.4s ease",
  marginLeft: show ? 80 : 0,
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
}));

const InnerWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    maxWidth: 1200,
    margin: "auto",
  },
}));

const StyledButton = styled(Button)({
  backgroundColor: "#e77401",
  color: "white",
  width: "18%",
  justifyContent: "center",

  marginTop: "2%",
  "&:hover": {
    backgroundColor: "#cc6600",
  },
});

const Title = styled("h1")({
  textAlign: "center",
});

const Subtitle = styled("p")({
  textAlign: "center",
  marginTop: "1rem",
});

const BoxWithShadow = styled(Box)({
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "1rem",
  marginTop: "1rem",
});
const ZoomInfoContainer = styled("div")({
  display: "flex",
  alignItems: "center", // Centra verticalmente el contenido
  justifyContent: "center", // Centra horizontalmente el contenido
  width: "60px", // Ancho del contenedor
});

const FileDropArea = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "2px dashed grey",
  borderRadius: "5px",
  padding: "10px",
  marginTop: "25px",
  textAlign: "center",
  cursor: "pointer",
  minHeight: "500px",
});

const PageContainer = styled("div")({
  position: "relative",
  marginBottom: "20px", // Espacio entre páginas
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.7)", // Sombra
});

const predefinedSignatureSrc = '/assets/imgs/firmaPredefinida.png';

const DashboardLayout = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [showSideBar, setShowSideBar] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [signFields, setSignFields] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const pdfViewerRef = useRef();
  const pageHeights = useRef([]);
  const accumulatedHeights = useRef([]);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureImage, setSignatureImage] = useState(predefinedSignatureSrc);
  const [convertedSignFields, setConvertedSignFields] = useState([]);
  const [signaturePreferences, setSignaturePreferences] = useState(null);
  const signFieldRefs = useRef([]);
  

  

  const [zoomLevel, setZoomLevel] = useState(1.0);
  const minZoo = 0.8; // 75%
  const maxZoo = 1.8; // 175%

  const zoomIn = () => {
    const newZoom = zoomLevel + 0.2;
    if (newZoom <= maxZoo) {
      adjustSignFieldsForZoom(newZoom);
      setZoomLevel(newZoom);
    }
  };

  const zoomOut = () => {
    const newZoom = zoomLevel - 0.2;
    if (newZoom >= minZoo) {
      adjustSignFieldsForZoom(newZoom);
      setZoomLevel(newZoom);
    }
  };
  const pixelsToPoints = (pixels, dpi = 96) => {
    return (pixels * 72) / dpi; // 72 puntos por pulgada
  };

 useEffect(() => {
   const dpi = window.devicePixelRatio * 96; 
   const convertToPoints = (pixels) => (pixels * 72) / dpi;

   const newConvertedFields = signFields.map((field) => ({
     ...field,
     x: convertToPoints(field.x),
     y: convertToPoints(field.y),
     width: convertToPoints(field.width),
     height: convertToPoints(field.height),
   }));

   setConvertedSignFields(newConvertedFields);
   
 }, [signFields]);
 console.log(convertedSignFields)

  const adjustSignFieldsForZoom = (newZoom) => {
    const adjustedFields = signFields.map((field) => {
      const zoomRatio = newZoom / field.zoomAtCreation;
      return {
        ...field,
        x: field.x * zoomRatio,
        y: field.y * zoomRatio,
        width: field.width * zoomRatio,
        height: field.height * zoomRatio,
        zoomAtCreation: newZoom, // lizar el nivel de zoom de creación
      };
    });
    setSignFields(adjustedFields);
  };
 


  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    accumulatedHeights.current = new Array(numPages).fill(0);
  };

  const onSelectSignature = (signature) => {
    setSignatureImage(signature); // Establece la imagen de la firma actual
    setSignaturePreferences(signature); // Guarda la preferencia de firma
  };

  useEffect(() => {
    // Si hay preferencias de firma y se ha seleccionado un archivo, aplicar la firma
    if (signaturePreferences && selectedFile) {
      setSignatureImage(signaturePreferences);
    }
  }, [selectedFile, signaturePreferences]);
  
  

  useEffect(() => {
    const calculatePageHeights = () => {
      if (pdfViewerRef.current) {
        const pages = Array.from(
          pdfViewerRef.current.getElementsByClassName("react-pdf__Page")
        );
        let accumulatedHeight = 0;

        pages.forEach((page, index) => {
          accumulatedHeight += page.getBoundingClientRect().height;
          accumulatedHeights.current[index] = accumulatedHeight;
        });
      }
    };

    const timeoutId = setTimeout(() => {
      calculatePageHeights();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [numPages]);

  const onScroll = () => {
    const scrollTop = pdfViewerRef.current.scrollTop;

    const newPageNumber =
      accumulatedHeights.current.findIndex(
        (accumulatedHeight) => scrollTop < accumulatedHeight
      ) + 1;

    if (newPageNumber !== pageNumber) {
      setPageNumber(newPageNumber);
    }
  };

  const isElementInView = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const addSignField = () => {
    // Asumiendo que cada página tiene el mismo tamaño, obtenemos las dimensiones de la primera página
    const page = document.querySelector(".react-pdf__Page");
    if (!page) {
      console.error("No se encontró la página del PDF");
      return;
    }
  
    const pageRect = page.getBoundingClientRect();
    const pageWidth = pageRect.width;
    const pageHeight = pageRect.height;
  
    // Dimensiones y posición del campo de firma
    const fieldWidth = 200;  // Ancho del campo de firma
    const fieldHeight = 50;  // Altura del campo de firma
    const fieldX = (pageWidth - fieldWidth) / 2; // Posición X centrada
    const marginFromBottom = 200; // Margen desde la parte inferior de la página
    const fieldY = pageHeight - fieldHeight - marginFromBottom; // Posición Y ajustada
  
    // Asegúrate de que el campo de firma no se coloque fuera de la página
    const newField = {
      x: Math.max(0, fieldX),
      y: Math.max(0, fieldY),
      width: fieldWidth,
      height: fieldHeight,
      page: pageNumber,
      zoomAtCreation: zoomLevel,
    };
  
    setSignFields((prevFields) => {
      const newFields = [...prevFields, newField];
      // Asegurar que el arreglo de refs tenga el mismo tamaño que el de campos
      signFieldRefs.current = newFields.map((_, i) => signFieldRefs.current[i] || createRef());
      return newFields;
    });

    // Desplazarse al nuevo campo después de que se haya actualizado el estado
  setTimeout(() => {
    const newFieldRef = signFieldRefs.current[signFieldRefs.current.length - 1];
    if (newFieldRef.current && !isElementInView(newFieldRef.current)) {
      newFieldRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 1000); // Retraso para asegurar que el estado y el DOM se hayan actualizado
};
  
  

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Verificar tipo de archivo
      if (file.type !== "application/pdf") {
        setSnackbar({
          open: true,
          message: "Solo se permiten archivos PDF",
          severity: "error",
        });
        return;
      }
      // Verificar tamaño del archivo (20 MB en bytes)
      if (file.size > 20 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: "Solo se permiten archivos de un máximo de 20MB",
          severity: "warning",
        });
        return;
      }
      // Si pasa las validaciones, procesar el archivo
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const onDragStop = (fieldIndex, d) => {
    const updatedFields = signFields.map((field, index) => {
      if (index === fieldIndex) {
        return { ...field, x: d.x, y: d.y };
      }
      return field;
    });
    setSignFields(updatedFields);
  };

  const onResizeStop = (fieldIndex, size, position) => {
    const updatedFields = signFields.map((field, index) => {
      if (index === fieldIndex) {
        const newSize = {
          width: parseFloat(size.width.replace("px", "")), // Asegurarse de que width es un número
          height: parseFloat(size.height.replace("px", "")), // Asegurarse de que height es un número
        };
        const newPosition = {
          x: position.x, // Asumiendo que x es ya un número
          y: position.y, // Asumiendo que y es ya un número
        };

        return {
          ...field,
          ...newSize,
          ...newPosition,
          zoomAtCreation: zoomLevel, // Actualiza con el nivel de zoom actual
        };
      }
      return field;
    });
    setSignFields(updatedFields);
  };


  const handleBackButtonClick = () => {
    setSelectedFile(null);
    setFileName("");
    setSignFields([]);
    setPageNumber(1);
    setNumPages(null);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <React.Fragment>
      <DashboardSideBar showSideBar={showSideBar} />
      <Wrapper show={showSideBar}>
        <InnerWrapper>
          <DashboardNavbar
            setShowSideBar={() => setShowSideBar((state) => !state)}
          />
          {!selectedFile ? (
            <>
              <Title>¿Qué quieres hacer hoy?</Title>
              <Subtitle>Sube tu documento, fírmalo, verifícalo y más</Subtitle>
            </>
          ) : (
            <DocumentHeader>
              <Button onClick={handleBackButtonClick}>
                <ArrowBackIcon />
              </Button>
              <Title>{fileName}</Title>
            </DocumentHeader>
          )}
          <BoxWithShadow>
            <FloatingNavBar>
              {/* Ejemplo de opciones en la barra de navegación */}
              <NavButton>
                Firmar <KeyboardArrowDownIcon />{" "}
              </NavButton>
              <NavButton onClick={zoomOut}>
                {" "}
                <ZoomOutIcon />
              </NavButton>
              <ZoomInfoContainer>
                {Math.round(zoomLevel * 100)}%
              </ZoomInfoContainer>
              <NavButton onClick={zoomIn}>
                {" "}
                <ZoomInIcon />
              </NavButton>
              <NavButton>
                {" "}
                <ModeEditIcon />
                Solicitar Firmas
              </NavButton>
              <NavButton>Opción 4</NavButton>
              <NavButton onClick={() => setShowSignatureModal(true)}>
  <SettingsSuggestIcon /> Preferencias
</NavButton>

              {selectedFile && (
                <NavButton onClick={addSignField}>
                  Agregar campo de Firma
                </NavButton>
              )}
            </FloatingNavBar>
            {!selectedFile && (
              <FileDropArea onDragOver={handleDragOver} onDrop={handleDrop}>
                <CloudUploadIcon style={{ fontSize: 100, color: "#BDBDBD" }} />
                Arrastra tus archivos aquí o haz clic para seleccionarlos
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
                <StyledButton onClick={() => fileInputRef.current.click()}>
                  Seleccionar Archivos
                </StyledButton>
              </FileDropArea>
            )}

            {selectedFile && (
              <PdfViewer ref={pdfViewerRef} onScroll={onScroll}>
                <Document
                  file={selectedFile}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from(new Array(numPages), (_, index) => (
                    <PageContainer key={`page_container_${index}`}>
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        className="react-pdf__Page"
                        scale={zoomLevel}
                      >
                        {signFields.map(
                          (field, fieldIndex) =>
                            field.page === index + 1 && ( // Solo renderizamos los campos de firma que pertenecen a esta página
                              <SignatureField
                                key={fieldIndex}
                                ref={signFieldRefs.current[fieldIndex]}
                                field={field}
                                onDragStop={(e, d) => onDragStop(fieldIndex, d)}
                                onResizeStop={(
                                  e,
                                  direction,
                                  ref,
                                  delta,
                                  position
                                ) => {
                                  onResizeStop(
                                    fieldIndex,
                                    {
                                      width: ref.style.width,
                                      height: ref.style.height,
                                    },
                                    position
                                  );
                                }}
                                signatureImage={signatureImage}
                              />
                            )
                        )}
                      </Page>
                    </PageContainer>
                  ))}
                </Document>
              </PdfViewer>
            )}

            {numPages && (
              <p>
                Página {pageNumber} de {numPages}
              </p>
            )}
          </BoxWithShadow>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Cambia la posición aquí
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </InnerWrapper>
      </Wrapper>
      <SignatureModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onSelectSignature={onSelectSignature}
      />
    </React.Fragment>
  );
};

export default DashboardLayout;
