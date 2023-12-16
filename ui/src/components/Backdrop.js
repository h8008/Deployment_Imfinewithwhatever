// import styled from '@emotion/styled';
import Grid from "../ui_components/Grid";
import attributes from "../config";
import { styled } from "@mui/material";
import { useTheme } from "@mui/material";
import { Backdrop as MUIBackdrop } from "@mui/material";

const BackDropComponent = styled(MUIBackdrop)((props) => ({
  backgroundColor: props.backgroundColor,
  height: props.height ? props.height : "90vh",
  width: props.width ? props.width : "100vw",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  zIndex: -2,
  position: "relative",
}));

const Backdrop = (props) => {
  const theme = useTheme();
  const { backgroundColor } = props;

  return (
    <BackDropComponent backgroundColor={backgroundColor} open={true}>
      {props.children}
    </BackDropComponent>
  );
};

export default Backdrop;
