import FlexBox from "components/FlexBox";
import { H6, Small } from "components/Typography";
import React, { FC } from "react";

// component props interface
interface TabLabelProps {
  tabTitle: string;
  amount: number;
}

const TabLabel: FC<TabLabelProps> = ({ tabTitle, amount }) => {
  return (
    <FlexBox alignItems="center">
      <H6>{tabTitle}</H6>
      <Small
        sx={{
          backgroundColor: "divider",
          padding: "0px 10px",
          borderRadius: "10px",
          marginLeft: 1,
        }}
      >
        {amount}
      </Small>
    </FlexBox>
  );
};

export default TabLabel;
