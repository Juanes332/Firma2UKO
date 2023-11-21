import { Box, Grid } from "@mui/material";
import Analytics from "components/Dashboards/saas/Analytics";
import SaaSCard from "components/Dashboards/saas/Card";
import Footer from "components/Dashboards/saas/Footer";
import RecentOrders from "components/Dashboards/saas/RecentOrders";
import TopSelling from "components/Dashboards/saas/TopSelling";
import TotalSpent from "components/Dashboards/saas/TotalSpent";
import DashboardLayout from "components/Layouts/DashboardLayout";
import useTitle from "hooks/useTitle";
import BucketIcon from "icons/BucketIcon";
import EarningIcon from "icons/EarningIcon";
import PeopleIcon from "icons/PeopleIcon";
import WindowsLogoIcon from "icons/WindowsLogoIcon";
import { FC } from "react";

const SaaS: FC = () => {
  // change navbar title
  useTitle("Saas");

  return (
    <DashboardLayout>
      <Box pt={2} pb={4}>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {cardList.map((card, index) => (
            <Grid item lg={3} xs={6} key={index}>
              <SaaSCard card={card} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4} pt="2rem">
          <Grid item lg={8} md={7} xs={12}>
            <TotalSpent />
          </Grid>
          <Grid item lg={4} md={5} xs={12}>
            <Analytics />
          </Grid>
        </Grid>

        <Grid container spacing={4} pt="2rem">
          <Grid item lg={8} md={7} xs={12}>
            <RecentOrders />
          </Grid>
          <Grid item lg={4} md={5} xs={12}>
            <TopSelling />
          </Grid>
        </Grid>

        <Box pt="2rem" />

        <Footer />
      </Box>
    </DashboardLayout>
  );
};

export default SaaS;

const cardList = [
  {
    title: "All Spending",
    price: 574.34,
    Icon: BucketIcon,
    color: "#7EB9FF",
  },
  {
    title: "Earnings",
    price: 521,
    Icon: EarningIcon,
    color: "#A798FF",
  },
  {
    title: "Weekly revenue",
    price: 684,
    Icon: WindowsLogoIcon,
    color: "#FF6B93",
  },
  {
    title: "New Clients",
    price: 321,
    Icon: PeopleIcon,
    color: "#FF9777",
  },
];
