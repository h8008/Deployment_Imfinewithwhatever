import styled from "@emotion/styled";
import Text from "../ui_components/Text";
import Grid from "@mui/material/Grid";

import BarChart from "./BarChart/BarChart";
import PieChart from "./PieChart/PieChart";

import { Fragment } from "react";

const PreferenceComponent = styled(Grid)({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  container: true,
});

const BarChartComponent = styled(Grid)({
  width: "100%",
  gridRow: true,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const Preferences = (props) => {
  const { preferences } = props;
  const { likes, dislikes, totalDataLength } = preferences;

  // const width = window.innerWidth / 2;

  return (
    <PreferenceComponent>
      {/* <BarChartComponent data_id={"barchart-component"}>
        <BarChart
          chartData={likes}
          totalDataLength={totalDataLength}
          id={0}
          pos={0}
          height={400}
          // width={"50%"}
          color="red"
        />
      </BarChartComponent>
      <BarChartComponent>
        <BarChart
          chartData={dislikes}
          totalDataLength={totalDataLength}
          id={2}
          pos={25}
          height={400}
          // width={"50%"}
          color="green"
        />
      </BarChartComponent> */}
      <PieChart chartData={dislikes} height={400} width={500} radius={45} />
    </PreferenceComponent>
  );
};

export default Preferences;
