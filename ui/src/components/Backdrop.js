// import styled from '@emotion/styled';
import Grid from "../ui_components/Grid";
import attributes from "../config";
import { styled } from "@mui/material";
import { useTheme } from "@mui/material";
import { Backdrop as MUIBackdrop } from "@mui/material";

const BackDropComponent = styled(MUIBackdrop)({
  backgroundColor: attributes.backgroundColor,
  height: "100vh",
  width: "100%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  zIndex: -1,
  // position: "relative",
});

const Backdrop = (props) => {
  const theme = useTheme();

  return <BackDropComponent open={true}>{props.children}</BackDropComponent>;
};

export default Backdrop;
