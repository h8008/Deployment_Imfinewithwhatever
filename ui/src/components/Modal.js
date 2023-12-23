import MUIModal from "@mui/material/Modal";
import { Box, styled } from "@mui/material";
import { useContext } from "react";
import { MessageContext } from "../providers/MessageProvider";

const ModalComponent = styled(MUIModal)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 300,
  backgroundColor: theme.palette.primary.light.main,
  boxShadow: 24,
  p: 4,
  border: `8px solid white`,
  borderRadius: `20px`,
}));

const Modal = (props) => {
  const { messageState } = useContext(MessageContext);
  const open = messageState.modalOpen;
  const interactive = messageState.interactive;

  return <>{!interactive && <ModalComponent open={open}>{messageState.message}</ModalComponent>}</>;
};

export default Modal;
