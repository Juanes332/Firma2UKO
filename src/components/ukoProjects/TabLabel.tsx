import { Badge, Box } from "@mui/material";
import { H2, H5 } from "components/Typography";
import React, { FC } from "react";

// component props interface
interface TabLabelProps {
  tabTitle: string;
  amount: number;
  badgeColor: any;
}

const TabLabel: FC<TabLabelProps> = ({ tabTitle, amount, badgeColor }) => {
  return (
    <Badge
      variant="dot"
      overlap="circular"
      badgeContent=""
      color={badgeColor || "default"}
    >
      <Box sx={{ color: "text.primary" }}>
        <H2>{amount}</H2>
        <H5 marginBottom={1}>{tabTitle}</H5>
      </Box>
    </Badge>
  );
};

export default TabLabel;
