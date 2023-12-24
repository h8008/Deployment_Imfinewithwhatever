import { useContext, useState, useMemo, useEffect } from "react";
import MUIModal from "@mui/material/Modal";
import { Box, Button, List, styled } from "@mui/material";
import { MessageContext } from "../providers/MessageProvider";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import RowComponent from "../ui_components/RowComponent";
import Text from "../ui_components/Text";
import { UPDATE_MESSAGE, UPDATE_MODAL_OPEN } from "../reducer/Message/MessageAction";

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

const ButtonComponent = styled(Button)(({ theme }) => ({
  borderRadius: "50%",
  height: "50px",
  width: "50px",
}));

const InteractiveModal = (props) => {
  const { messageState, messageDispatch } = useContext(MessageContext);
  const interactive = messageState.interactive;
  const onModalClickCallback = messageState.onModalClick;
  // const global = useMemo(() => ({ open: messageState.modalOpen }), [messageState.modalOpen]);
  // const [local, setLocal] = useState({ ...global });
  const open = useMemo(() => messageState.modalOpen);

  // console.log("local", local);
  // console.log("global", global);

  // useEffect(() => {
  //   if (global.open !== local.open) {
  //     setLocal({ ...local, open: global.open });
  //   }
  // }, [global.open, local]);

  const onClose = () => {
    // setLocal({ ...local, open: false });
    messageDispatch({
      type: UPDATE_MODAL_OPEN,
      modalOpen: false,
    });
    onModalClickCallback();
  };

  return (
    <>
      {interactive && (
        <ModalComponent open={open}>
          <>
            <List>
              <RowComponent theme={{ justifyContent: "space-evenly", alignItems: "center" }}>
                <ButtonComponent onClick={onClose}>
                  <CheckIcon />
                </ButtonComponent>
                <ButtonComponent onClick={onClose}>
                  <CloseIcon />
                </ButtonComponent>
              </RowComponent>
            </List>
            <Text text={messageState.message} />
          </>
        </ModalComponent>
      )}
    </>
  );
};

export default InteractiveModal;
