import styled from "@emotion/styled";
import Text from "../ui_components/Text";
import Grid from "@mui/material/Grid";

import BarChart from "./BarChart/BarChart";
import { Fragment } from "react";

const PreferenceComponent = styled(Grid)({
  height: "45%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Preferences = (props) => {
  const { preferences } = props;
  const { likes, dislikes, totalDataLength } = preferences;

  const width = window.innerWidth;

  return (
    <Fragment>
      <BarChart
        chartData={likes}
        totalDataLength={totalDataLength}
        id={0}
        pos={0}
        height={400}
        width={width}
        color="red"
      />
      <BarChart
        chartData={dislikes}
        totalDataLength={totalDataLength}
        id={2}
        pos={25}
        height={400}
        width={width}
        color="green"
      />
    </Fragment>
  );
};

export default Preferences;
