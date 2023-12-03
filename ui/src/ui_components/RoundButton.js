import styled from "@emotion/styled";
import { Button } from "@mui/material";

const defaultBorder = "6px solid black";

const RoundButton = styled(Button)((props) => ({
  border: props.border ? props.border : defaultBorder,
  borderRadius: "50%",
  height: props.height ? props.height : "64px",
  width: props.width ? props.width : "64px",
}));

export default RoundButton;
