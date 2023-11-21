import { Avatar, Box, useTheme } from "@mui/material";
import FlexBox from "components/FlexBox";
import { H6, Tiny } from "components/Typography";
import { FC } from "react";

// component props interface
interface ConversationBoxProps {
  conversation: {
    name: string;
    image: string;
    lastMsg: string;
    time: string;
  };
}

const ConversationBox: FC<ConversationBoxProps> = ({ conversation }) => {
  const theme = useTheme();

  return (
    <FlexBox
      p={2}
      borderBottom={1}
      alignItems="center"
      justifyContent="space-between"
      borderColor={theme.palette.mode === "light" ? "secondary.300" : "divider"}
      sx={{ "&:last-of-type": { borderBottom: 0 }, cursor: "pointer" }}
    >
      <FlexBox alignItems="center">
        <Avatar
          src={conversation.image}
          sx={{
            width: 30,
            height: 30,
            backgroundColor: "primary.200",
          }}
        />
        <Box marginLeft={1}>
          <H6>{conversation.name}</H6>
          <Tiny ellipsis display="block" color="text.disabled">
            {conversation.lastMsg}
          </Tiny>
        </Box>
      </FlexBox>

      <Tiny color="text.disabled">{conversation.time}</Tiny>
    </FlexBox>
  );
};

export default ConversationBox;
