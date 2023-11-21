import { ArrowUpward } from "@mui/icons-material";
import { Card, SvgIconProps } from "@mui/material";
import { alpha, Box } from "@mui/system";
import FlexBox from "components/FlexBox";
import { H3, Small } from "components/Typography";
import numeral from "numeral";
import React, { FC } from "react";

// component props interface
interface CardItemProps {
  title: string;
  amount: number;
  color: string;
  percentage: number;
  Icon: (props: SvgIconProps) => JSX.Element;
}

const CardItem: FC<CardItemProps> = (props) => {
  const { Icon, title, color, percentage, amount } = props;

  return (
    <Card sx={{ padding: "1rem 1.5rem" }}>
      <Box
        sx={{
          width: 27,
          height: 27,
          borderRadius: "8px",
          backgroundColor: alpha(color, 0.3),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon sx={{ fontSize: 15, color }} />
      </Box>

      <Small color="text.disabled" display="block" mt={1} fontWeight={500}>
        {title}
      </Small>

      <FlexBox justifyContent="space-between" alignItems="flex-end">
        <H3>${numeral(amount).format("0a")}</H3>

        <FlexBox alignItems="center">
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
          <Small fontWeight={600} ml={0.5}>
            +{percentage}%
          </Small>
        </FlexBox>
      </FlexBox>
    </Card>
  );
};

export default CardItem;
