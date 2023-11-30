import styled from "@emotion/styled";
import { Button } from "@mui/material";

const defaultBorder = "6px solid black";

const RoundButton = styled(Button)((props) => ({
  border: props.border ? props.border : defaultBorder,
  borderRadius: "50%",
  height: "64px",
  width: "64px",
  // marginTop: "100px",
}));

export default RoundButton;
