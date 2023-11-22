import React, { useState, useRef, useEffect } from "react";
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
  const [signatureImage, setSignatureImage] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setShowSignatureModal(true); // Mostrar modal de firma
    accumulatedHeights.current = new Array(numPages).fill(0);
  };

  const onSelectSignature = (signature) => {
    setSignatureImage(signature);
  };

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

  const addSignField = () => {
    setSignFields([
      ...signFields,
      {
        x: 100,
        y: 100,
        width: 200,
        height: 50,
        page: pageNumber,
      },
    ]);
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
        return { ...field, ...size, ...position };
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
              <NavButton>
                {" "}
                100% <ZoomInIcon />
              </NavButton>
              <NavButton>
                {" "}
                <ModeEditIcon />
                Solicitar Firmas
              </NavButton>
              <NavButton>Opción 4</NavButton>
              <NavButton>
                {" "}
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
                      >
                        {signFields.map(
                          (field, fieldIndex) =>
                            field.page === index + 1 && ( // Solo renderizamos los campos de firma que pertenecen a esta página
                              <SignatureField
                                key={fieldIndex}
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
