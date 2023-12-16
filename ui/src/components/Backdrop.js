// import styled from '@emotion/styled';
import Grid from "../ui_components/Grid";
import attributes from "../config";
import { styled } from "@mui/material";
import { useTheme } from "@mui/material";
import { Backdrop as MUIBackdrop } from "@mui/material";

const BackDropComponent = styled(Grid)(({ children, theme, ...otherProps }) => ({
  backgroundColor: theme.palette.primary.dark.main,
  height: otherProps.height ? otherProps.height : "90vh",
  width: otherProps.width ? otherProps.width : "100vw",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: -4,
  position: "relative",
  ...otherProps,
}));

const Backdrop = (props) => {
  const theme = useTheme();

  return <BackDropComponent open={true}>{props.children}</BackDropComponent>;
};

export default Backdrop;
