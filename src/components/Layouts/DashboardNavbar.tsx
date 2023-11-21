import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  styled,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC } from "react";
import Link from "next/link";
import firmayaLogo from "../../../public/assets/home/firmayaLogo.png";

// root component interface
interface DashboardNavBarProps {
  setShowSideBar: () => void;
  setShowMobileSideBar: () => void;
}

// root component
const DashboardNavbar: FC<DashboardNavBarProps> = (props) => {
  const userName = "Nombre de la Persona";
  const profilePic = "url_a_la_imagen_de_perfil.jpg"; // Reemplazar con la URL de la imagen

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar>
        {/* Logo a la izquierda */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <img src={firmayaLogo.src} alt="Logo" style={{ maxWidth: "18%" }} />{" "}
          {/* Reemplazar con la URL del logo */}
        </Box>

        {/* Contenido a la derecha */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minWidth: "40%",
          }}
        >
          <Link href="#" sx={{ marginRight: 10 }}>
            Compra el certificado
          </Link>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              border: "1px solid #c7bda7",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            <Typography variant="body1" sx={{ marginRight: 1 }}>
              Hola, soy {userName}
            </Typography>
            <Avatar src={profilePic} alt={userName} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
