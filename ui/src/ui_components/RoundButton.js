import styled from "@emotion/styled";
import { Button } from "@mui/material";

const defaultBorder = "6px solid black";

const RoundButton = styled(Button)((children, ...otherProps) => ({
  border: otherProps.border ? otherProps.border : defaultBorder,
  borderRadius: "50%",
  height: otherProps.height ? otherProps.height : "64px",
  width: otherProps.width ? otherProps.width : "64px",
  ...otherProps,
}));

export default RoundButton;
