import { Card } from "@mui/material";
import { H5 } from "components/Typography";
import { FC } from "react";
import VectorMap from "./VectorMap";

const SalesByCountry: FC = () => {
  return (
    <Card sx={{ padding: 3 }}>
      <H5>Sales By Country</H5>

      <VectorMap />
    </Card>
  );
};

export default SalesByCountry;
