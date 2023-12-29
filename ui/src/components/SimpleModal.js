// import MUIModal from "@mui/material/Modal";
import { Box, Modal as MUIModal, Typography, styled, Grid } from "@mui/material";
import { useContext } from "react";
import { MessageContext } from "../providers/MessageProvider";
import { useTheme } from "@mui/material";

const ModalComponent = styled(MUIModal)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 300,
  backgroundColor: theme.palette.primary.light.main,
  // backgroundColor: 'white',
  boxShadow: 24,
  p: 4,
  border: `8px solid white`,
  borderRadius: `20px`,
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}));

const SimpleModal = ({ open, message, onClickCallback }) => {
  const theme = useTheme();

  return (
    <ModalComponent open={open} onClick={onClickCallback}>
      {/* <Grid width={"100%"} height={"100%"}> */}
        <Typography text={theme.palette.primary.light.main} >
          {message}
        </Typography>
      {/* </Grid> */}
    </ModalComponent>
  );
};

export default SimpleModal;
