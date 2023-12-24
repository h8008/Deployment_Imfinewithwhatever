import { useContext, useState, useMemo, useEffect } from "react";

import { Box, Modal, Button, List, styled, Grid, Typography } from "@mui/material";
import { MessageContext } from "../providers/MessageProvider";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import RowComponent from "../ui_components/RowComponent";
import Text from "../ui_components/Text";
import { UPDATE_MESSAGE, UPDATE_MODAL_OPEN } from "../reducer/Message/MessageAction";
import { useTheme } from "@emotion/react";

const ModalComponent = styled(Modal)(({ theme }) => ({
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

const ButtonComponent = styled(Button)(({ theme }) => ({
  borderRadius: "50%",
  height: "50px",
  width: "50px",
}));

const InteractiveModal = ({ open, message, onClickCallback }) => {
  const theme = useTheme();
  // onst { messageState, messageDispatch } = useContext(MessageContext);
  // const interactive = messageState.interactive;
  // const onModalClickCallback = messageState.onModalClick;
  // const open = useMemo(() => messageState.modalOpen, [messageState.modalOpen]);

  // const { open, message, onClickCallback } = props;

  // console.log("local", local);
  // console.log("global", global);

  // useEffect(() => {
  //   if (global.open !== local.open) {
  //     setLocal({ ...local, open: global.open });
  //   }
  // }, [global.open, local]);

  // const onClose = () => {
  //   // setLocal({ ...local, open: false });
  //   // messageDispatch({
  //   //   type: UPDATE_MODAL_OPEN,
  //   //   modalOpen: false,
  //   // });

  //   onClickCallback();
  // };

  return (
    <Modal
      open={open}
      onClose={() => onClickCallback()}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 300,
        height: 300,
        // backgroundColor: theme.palette.primary.light.main,
        boxShadow: 24,
        p: 4,
        border: `8px solid white`,
        borderRadius: `20px`,
      }}
    >
      {/* <List> */}
      {/* <div> */}
      {/* <Grid sx={{ justifyContent: "space-evenly", alignItems: "center" }}>
        <ButtonComponent onClick={() => onClickCallback()}>
          <CheckIcon />
        </ButtonComponent>
      </Grid>
      <Grid sx={{ justifyContent: "space-evenly", alignItems: "center" }}>
        <ButtonComponent onClick={() => onClickCallback()}>
          <CloseIcon />
        </ButtonComponent>
      </Grid> */}
      {/* </div> */}
      {/* </List> */}
      {/* <Grid onClick={() => onClickCallback()}> */}
      <Typography>{message}</Typography>
      {/* </Grid> */}
    </Modal>
  );
};

export default InteractiveModal;
