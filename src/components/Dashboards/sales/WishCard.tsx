import { Card, LinearProgress } from "@mui/material";
import { alpha, Box, useTheme } from "@mui/system";
import FlexBox from "components/FlexBox";
import { H3, Small, Span } from "components/Typography";
import MedalIcon from "icons/MedalIcon";
import React, { FC } from "react";

const WishCard: FC = () => {
  const theme = useTheme();
  return (
    <Card sx={{ padding: 3, height: "100%" }}>
      <FlexBox
        alignItems="center"
        justifyContent="space-between"
        height="inherit"
        sx={{
          [theme.breakpoints.down(630)]: {
            flexDirection: "column-reverse",
            textAlign: "center",
            "& img": { marginBottom: 1 },
          },
        }}
      >
        <Box>
          <H3 mb={0.5}>Congratulations Watson! 🎉</H3>
          <Small color="text.disabled" display="block">
            You have done <Span color="primary.main">76%</Span> more sales
            today. <br /> Check your inventory and update your stocks.
          </Small>
          <FlexBox
            alignItems="center"
            sx={{
              backgroundColor: "primary.main",
              maxWidth: 260,
              height: 65,
              borderRadius: "16px",
              padding: 2,
              marginTop: 2,
            }}
          >
            <FlexBox alignItems="center" width="100%">
              <MedalIcon sx={{ color: "common.white" }} />
              <Box ml={1} width="100%">
                <FlexBox justifyContent="space-between">
                  <Small color="common.white" fontWeight={600}>
                    Star Seller
                  </Small>
                  <Small color="common.white" fontWeight={600}>
                    76%
                  </Small>
                </FlexBox>
                <LinearProgress
                  variant="determinate"
                  value={76}
                  sx={{
                    marginTop: 0.3,
                    backgroundColor: alpha("#FFF", 0.4),
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Box>
            </FlexBox>
          </FlexBox>
        </Box>

        <Box>
          <img
            src="/static/illustration/sales-dashboard.svg"
            width="100%"
            alt="User"
          />
        </Box>
      </FlexBox>
    </Card>
  );
};

export default WishCard;
