import { Box, Button, Grid } from "@mui/material";
import { H5 } from "components/Typography";
import ProjectCard3 from "components/ukoProjects/ProjectCard3";
import React, { FC } from "react";

const Projects: FC = () => {
  return (
    <Box pt={3} pb={5} px={3}>
      <H5 marginBottom={2}>Projects</H5>

      <Grid container spacing={3}>
        {projectList.map((item, key) => (
          <Grid item xs={12} sm={6} key={key}>
            <ProjectCard3 project={item} />
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        sx={{
          fontWeight: 500,
          textAlign: "center",
          padding: "0.5rem 3rem",
          display: "block",
          margin: "auto",
          marginTop: 4,
        }}
      >
        Load More
      </Button>
    </Box>
  );
};

const projectList = [
  {
    name: "Project Nightfall",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
    thumbnail: "/static/thumbnail/thumbnail-1.png",
    teamMember: [
      "/static/avatar/010-girl-1.svg",
      "/static/avatar/011-man-2.svg",
    ],
  },
  {
    name: "Project Nightfall",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
    thumbnail: "/static/thumbnail/thumbnail-2.png",
    teamMember: [
      "/static/avatar/013-woman-3.svg",
      "/static/avatar/012-woman-2.svg",
    ],
  },
];

export default Projects;
