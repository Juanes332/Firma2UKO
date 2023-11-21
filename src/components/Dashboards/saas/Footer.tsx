import { Box, Button, Card, styled } from "@mui/material";
import { H1, Paragraph } from "components/Typography";
import { FC } from "react";

// styled components
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 3rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    padding: "2rem",
    "& img": {
      marginBottom: "1.5rem",
    },
  },
}));

const Footer: FC = () => {
  return (
    <StyledCard>
      <Box>
        <H1 fontSize={24}>Buy Uko & Get 15% Off</H1>
        <Paragraph fontSize={13} color="secondary.400">
          Well Designed Theme to make everything better
        </Paragraph>
        <Button variant="contained" size="small" sx={{ mt: "2rem" }}>
          Buy Now
        </Button>
      </Box>

      <Box>
        <img
          src="/static/illustration/sass-dashboard.svg"
          alt="saas-dasboard-footer"
        />
      </Box>
    </StyledCard>
  );
};

export default Footer;
