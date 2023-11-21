import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box } from "@mui/system";
import FlexBox from "components/FlexBox";
import { H6, Small } from "components/Typography";
import { FC } from "react";

interface Props {
  activity: {
    id: number;
    title: string;
    date: string;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  };
}

const ActivityListItem: FC<Props> = ({ activity }) => {
  const { title, Icon, date } = activity;
  return (
    <FlexBox marginBottom={2}>
      <Box marginRight={1.5}>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: "secondary.400",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5px",
          }}
        >
          <Icon sx={{ color: "white", fontSize: 16 }} />
        </Box>
      </Box>
      <Box>
        <H6>{title}</H6>
        <Small color="text.disabled">{date}</Small>
      </Box>
    </FlexBox>
  );
};

export default ActivityListItem;
