import { MoreHoriz } from "@mui/icons-material";
import {
  AvatarGroup,
  Card,
  Grid,
  IconButton,
  LinearProgress,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import FlexBox from "components/FlexBox";
import MoreOptions from "components/MoreOptions";
import { H5, H6, Small } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import { FC, MouseEvent, useState } from "react";

const Progress: FC = () => {
  const [moreEl, setMoreEl] = useState<null | HTMLElement>(null);
  const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreEl(event.currentTarget);
  };
  const handleMoreClose = () => setMoreEl(null);

  return (
    <Box pt={3} pb={5} px={3}>
      <H5 marginBottom={2}>Progress</H5>
      <Grid container spacing={3}>
        {[1, 2].map((item) => (
          <Grid item xs={12} sm={6} key={item}>
            <ProgressCard handleMoreOpen={handleMoreOpen} />
          </Grid>
        ))}

        <MoreOptions anchorEl={moreEl} handleMoreClose={handleMoreClose} />
      </Grid>
    </Box>
  );
};

type ProgressCardProps = {
  handleMoreOpen: (event: MouseEvent<HTMLButtonElement>) => void;
};
function ProgressCard({ handleMoreOpen }: ProgressCardProps) {
  const theme = useTheme();

  return (
    <Card sx={{ padding: 2, boxShadow: 2 }}>
      <FlexBox alignItems="center" justifyContent="space-between">
        <Small
          sx={{
            borderRadius: 3,
            fontWeight: 500,
            padding: "3px 12px",
            backgroundColor: "primary.100",
            color:
              theme.palette.mode === "light"
                ? "primary.main"
                : "background.paper",
          }}
        >
          Web Design
        </Small>
        <IconButton onClick={handleMoreOpen} sx={{ padding: 0 }}>
          <MoreHoriz fontSize="small" />
        </IconButton>
      </FlexBox>

      <Small display="block" my={2}>
        Membuat konsep ilustrasi untuk halaman homepage dan about us
      </Small>

      <H6 textAlign="right" mb={0.5}>
        32%
      </H6>
      <LinearProgress variant="determinate" value={32} />

      <FlexBox alignItems="center" justifyContent="space-between" pt="1.5rem">
        <AvatarGroup>
          <UkoAvatar alt="Remy Sharp" src="/static/avatar/001-man.svg" />
          <UkoAvatar alt="Travis Howard" src="/static/avatar/002-girl.svg" />
        </AvatarGroup>

        <Small
          sx={{
            marginLeft: 1,
            fontWeight: 500,
            padding: "5px 15px",
            borderRadius: "20px",
            color: "text.disabled",
            backgroundColor: "divider",
          }}
        >
          3 Weeks Left
        </Small>
      </FlexBox>
    </Card>
  );
}

export default Progress;
