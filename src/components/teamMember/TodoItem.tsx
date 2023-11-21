import { MoreHoriz } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import FlexBox from "components/FlexBox";
import { H6, Tiny } from "components/Typography";
import React, { FC, MouseEvent } from "react";

// component interface
interface TodoItemProps {
  item: { id: number; title: string; date: string; status: string };
  handleTodoMore: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TodoItem: FC<TodoItemProps> = ({ item, handleTodoMore }) => {
  let statusColor;
  if (item.status === "Completed") {
    statusColor = "success.main";
  } else if (item.status === "Pending") {
    statusColor = "info.main";
  } else {
    statusColor = "primary.main";
  }
  return (
    <FlexBox justifyContent="space-between" alignItems="center">
      <FlexBox alignItems="center">
        <Box
          sx={{
            backgroundColor: statusColor,
            opacity: 0.8,
            width: 32,
            height: 32,
            borderRadius: "4px",
          }}
        />
        <Box ml="1rem">
          <H6>{item.title}</H6>
          <Tiny color="secondary.400">{item.date}</Tiny>
        </Box>
      </FlexBox>
      <IconButton onClick={handleTodoMore}>
        <MoreHoriz sx={{ color: "secondary.400" }} />
      </IconButton>
    </FlexBox>
  );
};

export default TodoItem;
