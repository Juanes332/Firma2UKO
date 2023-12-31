import {
  Box,
  ButtonBase,
  Card,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import { H5, H6, Small } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { useRowSelect, useTable } from "react-table";
import ScrollBar from "simplebar-react";

const TeamProgress: FC = () => {
  const columns: any = useMemo(() => columnShape, []);
  const data: any = useMemo(() => fakeData, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  }: any = useTable(
    {
      columns,
      data,
    },
    useRowSelect
  );

  return (
    <Card sx={{ padding: 2 }}>
      <H5>Team Progress</H5>
      <Small color="text.disabled" display="block" mb={2}>
        890,344 Sales
      </Small>

      <ScrollBar>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <TableCell
                    {...column.getHeaderProps({
                      style: {
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                      },
                    })}
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "text.disabled",
                      paddingBottom: 0,
                    }}
                  >
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {rows.map((row: any) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell: any) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollBar>
    </Card>
  );
};

const columnShape = [
  {
    Header: "Author",
    accessor: "author",
    minWidth: 200,
    maxWidth: 200,
    Cell: ({ value }: any) => (
      <FlexBox alignItems="center">
        <UkoAvatar
          src={value.image}
          alt={value.name}
          sx={{ borderRadius: "15%" }}
        />

        <Box ml={1}>
          <H6>{value.name}</H6>
          <Small color="text.disabled" display="block">
            {value.skill}
          </Small>
        </Box>
      </FlexBox>
    ),
  },
  {
    Header: "Company",
    accessor: "company",
    minWidth: 150,
    maxWidth: 150,
    Cell: ({ value }: any) => (
      <>
        <H6>{value.name}</H6>
        <Small color="text.disabled" display="block">
          {value.service}
        </Small>
      </>
    ),
  },
  {
    Header: "Progress",
    accessor: "progress",
    minWidth: 150,
    maxWidth: 150,
    Cell: ({ value }: any) => {
      return (
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 5,
            borderRadius: 5,
          }}
        />
      );
    },
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: () => {
      const router = useRouter();
      return (
        <ButtonBase
          sx={{
            padding: "5px 10px",
            borderRadius: "8px",
            color: "text.disabled",
            backgroundColor: "secondary.200",
          }}
          onClick={() => router.push("/dashboard/project-details")}
        >
          View
        </ButtonBase>
      );
    },
  },
];

const fakeData = [
  {
    id: 1,
    author: {
      name: "Brad Simmons",
      skill: "HTML, JS, ReactJS",
      image: "/static/avatar/001-man.svg",
    },
    company: {
      name: "Intertico",
      service: "Web, UI/UX Design",
    },
    progress: 90,
  },
  {
    id: 2,
    author: {
      name: "Selena Williams",
      skill: "HTML, JS, VueJS",
      image: "/static/avatar/002-girl.svg",
    },
    company: {
      name: "Web Devs",
      service: "Web, Mobile Apps",
    },
    progress: 65,
  },
  {
    id: 3,
    author: {
      name: "Steve Jobs",
      skill: "Python, Django",
      image: "/static/avatar/005-man-1.svg",
    },
    company: {
      name: "PyCharm",
      service: "ML, DS",
    },
    progress: 78,
  },
];

export default TeamProgress;
