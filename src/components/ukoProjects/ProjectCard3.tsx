import { AvatarGroup, Card } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import AddIconButton from "components/AddIconButton";
import FlexBox from "components/FlexBox";
import { H3, Small } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import Link from "next/link";
import { FC } from "react";

// component props interface
interface ProjectCardProps {
  project: {
    name: string;
    thumbnail: string;
    description: string;
    teamMember: string[];
  };
}

const ProjectCard3: FC<ProjectCardProps> = ({ project }) => {
  const theme = useTheme();

  return (
    <Link href="/dashboard/project-details" passHref>
      <Card>
        <Box
          sx={{
            margin: "1rem",
            borderRadius: "8px",
            overflow: "hidden",
            height: 165,
            "& img": {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }}
        >
          <img src={project.thumbnail} alt="Project Thumbnail" />
        </Box>

        <Box padding={2} paddingTop={0}>
          <H3>{project.name}</H3>
          <Small color="text.disabled" letterSpacing={0.5} fontWeight={500}>
            {project.description}
          </Small>

          <FlexBox
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            pt="1rem"
          >
            <FlexBox alignItems="center">
              <AvatarGroup>
                <UkoAvatar alt="Remy Sharp" src={project.teamMember[0]} />
                <UkoAvatar alt="Travis Howard" src={project.teamMember[1]} />
              </AvatarGroup>
              <AddIconButton sx={{ marginLeft: 0 }} />
            </FlexBox>

            <Small
              sx={{
                backgroundColor: "divider",
                padding: "5px 15px",
                borderRadius: "20px",
                color: "text.disabled",
                fontWeight: 600,
                [theme.breakpoints.between(960, 1050)]: {
                  width: "100%",
                  textAlign: "center",
                  marginTop: 1,
                },
              }}
            >
              3 Weeks Left
            </Small>
          </FlexBox>
        </Box>
      </Card>
    </Link>
  );
};

export default ProjectCard3;
