import { Box, useTheme } from "@mui/material";
import FlexBox from "components/FlexBox";
import { Tiny } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import React, { FC } from "react";

const IncomingMsg: FC = () => {
  const theme = useTheme();
  const lightTheme = theme.palette.mode === "light";
  return (
    <FlexBox mt={3}>
      <UkoAvatar
        src="/static/avatar/055-bodybuilder.svg"
        sx={{ width: 28, height: 28 }}
      />
      <Box
        sx={{
          padding: 2,
          maxWidth: 250,
          marginLeft: 1.5,
          borderRadius: "0px 8px 8px 8px",
          backgroundColor: lightTheme ? "secondary.200" : "divider",
        }}
      >
        <Tiny display="block" fontWeight={500} lineHeight={1.7}>
          Hey, Pixy can we get on a quick call? i need to show you something
        </Tiny>
      </Box>
    </FlexBox>
  );
};

export default IncomingMsg;
