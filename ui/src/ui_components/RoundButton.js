import styled from "@emotion/styled";
import { Button } from "@mui/material";

const RoundButton = styled(Button)(() => ({
  border: "4px solid black",
  borderRadius: "50%",
  height: "64px",
  width: "64px",
  // marginTop: "100px",
}));

export default RoundButton;
