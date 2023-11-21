import { Box, ButtonBase, Card, styled, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import FlexBox from "components/FlexBox";
import { H5, Small } from "components/Typography";
import { FC, useState } from "react";
import Chart from "react-apexcharts";

// chart data
const chartData = [
  {
    title: "Month",
    data: [
      {
        name: "Positive",
        data: [32, 80, 36, 40, 60, 50, 90, 66, 75, 40, 55, 65],
      },
      {
        name: "Negative",
        data: [-32, -80, -36, -40, -60, -50, -90, -66, -75, -40, -55, -65],
      },
    ],
  },
  {
    title: "Week",
    data: [
      {
        name: "Positive",
        data: [42, 50, 66, 70, 40, 50, 90, 66, 85, 50, 55, 15],
      },
      {
        name: "Negative",
        data: [-12, -80, -46, -50, -60, -50, -90, -26, -25, -50, -55, -65],
      },
    ],
  },
  {
    title: "Day",
    data: [
      {
        name: "Positive",
        data: [22, 80, 36, 50, 60, 30, 90, 26, 75, 10, 55, 65],
      },
      {
        name: "Negative",
        data: [-22, -80, -36, -50, -60, -30, -90, -26, -75, -10, -55, -65],
      },
    ],
  },
];

const chatCategories = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/// styled component
const StyledButton = styled(ButtonBase)<{ active?: string }>(({ theme, active }) => ({
  fontSize: 12,
  marginLeft: 15,
  fontWeight: 500,
  borderRadius: "8px",
  padding: "5px 10px",
  backgroundColor: active ? theme.palette.primary.main : "transparent",
  color: active ? theme.palette.common.white : theme.palette.text.disabled,
}));

const RecentProjects: FC = () => {
  const theme = useTheme();
  const [active, setActive] = useState("Day");

  const chartOptions: ApexOptions | undefined = {
    chart: {
      background: "transparent",
      stacked: true,
      toolbar: { show: false },
    },
    colors: ["#61A9FF", "#FF6B93"],
    dataLabels: { enabled: false },
    fill: { opacity: 1 },
    grid: {
      borderColor:
        theme.palette.mode === "light" ? theme.palette.primary[100] : theme.palette.divider,
      xaxis: {
        lines: { show: false },
      },
    },
    states: {
      active: {
        filter: { type: "none" },
      },
      hover: {
        filter: { type: "none" },
      },
    },
    legend: { show: false },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      categories: chatCategories,
      labels: {
        style: {
          colors: theme.palette.text.disabled,
        },
      },
    },
    yaxis: {
      min: -100,
      max: 100,
      show: true,
      labels: {
        style: {
          colors: theme.palette.text.disabled,
        },
      },
    },
    tooltip: {
      fixed: {
        enabled: true,
        position: "topRight",
        offsetX: 0,
        offsetY: 0,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: [7, 7],
        columnWidth: "23%",
      },
    },

    responsive: [
      {
        breakpoint: 500,
        options: {
          chart: {
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
        },
      },
    ],
  };

  const handleClick = (value: string) => setActive(value);
  const chartSeries = chartData.find((item) => item.title === active)?.data;

  return (
    <Card sx={{ padding: 2 }}>
      <FlexBox
        justifyContent="space-between"
        sx={{
          [theme.breakpoints.down(525)]: {
            flexDirection: "column",
            "& .button-wrapper": {
              alignSelf: "center",
              marginTop: 2,
            },
          },
        }}
      >
        <Box>
          <H5>Recent Projects</H5>
          <Small color="text.disabled">More than 50+ new projects running</Small>
        </Box>

        <Box className="button-wrapper">
          {["Month", "Week", "Day"].map((item) => (
            <StyledButton
              disableRipple
              key={item}
              active={active === item ? "active" : ""}
              onClick={() => handleClick(item)}
            >
              {item}
            </StyledButton>
          ))}
        </Box>
      </FlexBox>

      <Box sx={{ "& .apexcharts-tooltip-marker": { backgroundColor: "transparent" } }}>
        <Chart height={400} options={chartOptions} series={chartSeries} type="bar" />
      </Box>
    </Card>
  );
};

export default RecentProjects;
