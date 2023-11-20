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
  const { likes, dislikes } = preferences;

  const width = window.innerWidth;

  return (
    <Fragment>
      <BarChart data={likes} id={0} pos={0} height={200} width={width} color="red" />
      <BarChart data={dislikes} id={2} pos={25} height={200} width={width} color="black" />
    </Fragment>
  );
};

export default Preferences;
