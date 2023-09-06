// Referenced from MUI documentation at https://codesandbox.io/s/74fq8m?file=/demo.tsx

import {
  useContext,
  useState,
  useEffect,
  forwardRef,
  cloneElement,
  Fragment,
} from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

import { MessageContext } from "../providers/MessageProvider";

import Dialog from "@mui/material/Dialog";
import { DialogTitle, List } from "@mui/material";

import RoundButton from "./RoundButton";
import RowComponent from "./RowComponent";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import {
  UPDATE_MODAL_OPEN,
  BULK_UPDATE,
} from "../reducer/Message/MessageAction";

const Fade = forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const SpringModal = (props) => {
  const { buttonText, text, message, modalOpen, toggleModal } = props;
  const { messageState, messageDispatch } = useContext(MessageContext);

  const handleOpen = () => {
    messageDispatch({
      type: UPDATE_MODAL_OPEN,
      modalOpen: true,
    });
  };
  const handleClose = () => {
    messageDispatch({
      type: UPDATE_MODAL_OPEN,
      modalOpen: false,
    });
  };

  const handleInteractiveClose = () => {
    const payloads = { modeOpen: true, interactive: false };
    messageDispatch({
      type: BULK_UPDATE,
      payloads: { ...payloads },
    });
  };

  return (
    <Dialog
      open={messageState.modalOpen}
      onClose={() => {
        handleClose();
        messageState.onModalClick();
      }}
    >
      <DialogTitle>{messageState.message}</DialogTitle>
      {messageState.interactive && (
        <List>
          <RowComponent
            theme={{ justifyContent: "space-evenly", alignItems: "center" }}
          >
            <RoundButton
              onClick={() => {
                handleInteractiveClose();
                messageState.onModalClick(true);
              }}
            >
              <CheckIcon />
            </RoundButton>
            <RoundButton
              onClick={() => {
                handleInteractiveClose();
                messageState.onModalClick(false);
              }}
            >
              <CloseIcon />
            </RoundButton>
          </RowComponent>
        </List>
      )}
    </Dialog>
  );
};

export default SpringModal;
