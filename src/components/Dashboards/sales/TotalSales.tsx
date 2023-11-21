import { ArrowUpward } from "@mui/icons-material";
import { Button, Card } from "@mui/material";
import { alpha, Box } from "@mui/system";
import FlexBox from "components/FlexBox";
import { H1, H4, H6, Small } from "components/Typography";
import ShoppingBagIcon from "icons/ShoppingBagIcon";
import numeral from "numeral";
import React, { FC } from "react";

const TotalSales: FC = () => {
  return (
    <Card sx={{ padding: 3, textAlign: "center", height: "100%" }}>
      <H4 fontWeight={600} mb={3}>
        Total Sales
      </H4>
      <Box
        sx={{
          width: 30,
          height: 30,
          backgroundColor: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          margin: "auto",
        }}
      >
        <ShoppingBagIcon sx={{ fontSize: 18, color: "common.white" }} />
      </Box>

      <H1 color="primary.main" my={1}>
        {numeral(26543).format("$0,0")}
      </H1>

      <FlexBox alignItems="center" justifyContent="center">
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: alpha("#27CE88", 0.1),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ArrowUpward sx={{ fontSize: 14, color: "success.main" }} />
        </Box>
        <Small color="success.main" fontWeight={600} ml={0.5}>
          +10.23%
        </Small>
      </FlexBox>

      <H6 color="text.disabled" mt={1} mb={3}>
        Calculated in last 7 days
      </H6>

      <Button variant="contained" fullWidth>
        View Full Report
      </Button>
    </Card>
  );
};

export default TotalSales;
