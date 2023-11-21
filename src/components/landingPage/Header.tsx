import { Menu } from "@mui/icons-material";
import {
  Box,
  Container,
  Drawer,
  IconButton,
  styled,
  Theme,
  useMediaQuery,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import { FC, useState } from "react";

// styled components
const MenuList = styled("ul")(({ theme }) => ({
  margin: 0,
  padding: 0,
  listStyle: "none",
  [theme.breakpoints.down("sm")]: {
    "& a": { display: "block", marginTop: "1rem" },
  },
}));

const MenuListItem = styled("a")(({ theme }) => ({
  display: "inline-block",
  margin: "0 1rem",
  fontSize: 12,
  color: theme.palette.text.disabled,
  fontWeight: 500,
  cursor: "pointer",
  "&:last-of-type": {
    padding: ".4rem 1rem",
    borderRadius: "6px",
    border: "1px solid",
    borderColor: theme.palette.divider,
  },
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const Header: FC = () => {
  // const theme = useTheme();
  const [open, setOpen] = useState(false);
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const Menus = () => {
    return (
      <MenuList>
        <Link href="/" passHref>
          <MenuListItem>Home</MenuListItem>
        </Link>
        <Link href="/" passHref>
          <MenuListItem>Purchase Now</MenuListItem>
        </Link>
      </MenuList>
    );
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 2,
        minHeight: 64,
        justifyContent: "center",
        backgroundColor: "background.default",
      }}
    >
      <Container>
        <Toolbar sx={{ justifyContent: "space-between", pl: 0, pr: 0 }}>
          <Link href="/" passHref>
            <img src="/static/logo/logo.svg" width={30} alt="Logo" />
          </Link>
          {downMd ? (
            <Box>
              <IconButton onClick={() => setOpen(true)}>
                <Menu />
              </IconButton>
              <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Menus />
              </Drawer>
            </Box>
          ) : (
            <Menus />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
