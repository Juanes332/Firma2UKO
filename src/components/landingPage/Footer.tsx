import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Box, styled } from "@mui/material";
import { H6 } from "components/Typography";
import Link from "next/link";
import React from "react";

// styled components
const StyledNavLink = styled(Link)(({ theme }) => ({
  padding: 10,
  display: "inline-flex",
  borderRadius: "50%",
  "&:hover": {
    background: theme.palette.grey[100],
  },
}));

const Footer = () => {
  return (
    <Box py={8} textAlign="center">
      <H6>
        Developed with 💗 & Care by <a href="https://ui-lib.com/">UI Lib</a>
      </H6>

      <Box mt={1}>
        <Link href="#" passHref>
          <Facebook color="primary" sx={{ fontSize: 22 }} />
        </Link>

        <Link href="#" passHref>
          <Twitter color="primary" />
        </Link>

        <Link href="#" passHref>
          <YouTube color="primary" />
        </Link>

        <Link href="#" passHref>
          <Instagram color="primary" sx={{ fontSize: 22 }} />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
