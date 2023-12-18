// Referenced from MUI documentation at https://codesandbox.io/s/74fq8m?file=/demo.tsx

import { useContext, useState, useEffect, forwardRef, cloneElement, Fragment, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { Backdrop, Box, DialogTitle, List, Dialog, Modal, useThemeProps } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { MessageContext } from "../providers/MessageProvider";

import RoundButton from "./RoundButton";
import RowComponent from "./RowComponent";
import Text from "./Text";

import { UPDATE_MODAL_OPEN, BULK_UPDATE, UPDATE_MESSAGE } from "../reducer/Message/MessageAction";
import BorderedBox from "./BorderedBox";
import { useTheme } from "@mui/material";

const Fade = (props, ref) => {
  const { children, in: open, onClick, onEnter, onExited, ownerState, ...other } = props;
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
};

const ModalContentComponent = (props) => {
  const theme = useTheme();
  const backgroundColor = theme.palette.error.dark.main;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: 300,
    backgroundColor: backgroundColor,
    boxShadow: 24,
    p: 4,
    border: `8px solid white`,
    borderRadius: `20px`,
  };

  return <BorderedBox style={style}>{props.children}</BorderedBox>;
};

const SpringModal = (props) => {
  const { messageState, messageDispatch } = useContext(MessageContext);
  const [open, setOpen] = useState(messageState.modalOpen);

  console.log("modal open", open);

  const handleClose = () => {
    messageDispatch({
      type: UPDATE_MESSAGE,
      message: "",
    });
  };

  const handleInteractiveClose = () => {
    const payloads = { modeOpen: false, interactive: false, message: "" };
    messageDispatch({
      type: BULK_UPDATE,
      payloads: { ...payloads },
    });
  };

  return (
    <Modal
      open={open}
      onClick={() => {
        handleClose();
        messageState.onModalClick();
      }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <ModalContentComponent>
        <Text text={messageState.message} />
        {messageState.interactive && (
          <List>
            <RowComponent theme={{ justifyContent: "space-evenly", alignItems: "center" }}>
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
      </ModalContentComponent>
    </Modal>
  );
};

export default SpringModal;
