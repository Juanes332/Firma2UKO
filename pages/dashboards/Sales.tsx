import { AttachMoney, Autorenew } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import CardItem from "components/Dashboards/sales/CardItem";
import EarningReport from "components/Dashboards/sales/EarningReport";
import PopularProducts from "components/Dashboards/sales/PopularProducts";
import RecentOrders from "components/Dashboards/sales/RecentOrders";
import SalesProductDetails from "components/Dashboards/sales/SalesProductDetails";
import TotalSales from "components/Dashboards/sales/TotalSales";
import WishCard from "components/Dashboards/sales/WishCard";
import DashboardLayout from "components/Layouts/DashboardLayout";
import useTitle from "hooks/useTitle";
import EarningIcon from "icons/EarningIcon";
import PeopleIcon from "icons/PeopleIcon";
import React, { FC } from "react";

const Sales: FC = () => {
  // change navbar title
  useTitle("Sales");

  return (
    <DashboardLayout>
      <Box pt={2} pb={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <WishCard />
          </Grid>

          <Grid item xs={12} lg={6}>
            <Box width="100%" height="100%">
              <Grid container spacing={3}>
                {cardList.map((item, index) => (
                  <Grid key={index} item xs={12} sm={6} md={3} lg={6}>
                    <CardItem
                      Icon={item.Icon}
                      title={item.title}
                      amount={item.amount}
                      color={item.color}
                      percentage={item.percentage}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          <Grid item lg={9} md={8} xs={12}>
            <EarningReport />
          </Grid>
          <Grid item lg={3} md={4} xs={12}>
            <TotalSales />
          </Grid>

          <Grid item lg={9} md={8} xs={12}>
            <PopularProducts />
          </Grid>
          <Grid item lg={3} md={4} xs={12}>
            <RecentOrders />
          </Grid>

          {/* <Grid item lg={9} md={8} xs={12}>
          <SalesByCountry />
        </Grid> */}

          <Grid item lg={3} md={4} xs={12}>
            <SalesProductDetails />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default Sales;

const cardList = [
  {
    title: "Revenue",
    amount: 35800,
    Icon: EarningIcon,
    color: "#7EB9FF",
    percentage: 10.23,
  },
  {
    title: "Repeat Purchase",
    amount: 12900,
    Icon: Autorenew,
    color: "#A798FF",
    percentage: 20.4,
  },
  {
    title: "Average Order Value",
    amount: 42000,
    Icon: AttachMoney,
    color: "#FF6B93",
    percentage: 10.23,
  },
  {
    title: "New Customers",
    amount: 689,
    Icon: PeopleIcon,
    color: "#FF9777",
    percentage: 10.23,
  },
];
