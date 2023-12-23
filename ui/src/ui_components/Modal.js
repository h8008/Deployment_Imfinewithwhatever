// Referenced from MUI documentation at https://codesandbox.io/s/74fq8m?file=/demo.tsx

import { useContext, useState, useEffect, cloneElement, Fragment, useMemo, useCallback } from "react";
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
import { useTheme, Grid } from "@mui/material";

// const Fade = (props, ref) => {
//   const { children, in: open, onClick, onEnter, onExited, ownerState, ...other } = props;
//   const style = useSpring({
//     from: { opacity: 0 },
//     to: { opacity: open ? 1 : 0 },
//     onStart: () => {
//       if (open && onEnter) {
//         onEnter(null, true);
//       }
//     },
//     onRest: () => {
//       if (!open && onExited) {
//         onExited(null, true);
//       }
//     },
//   });

//   return (
//     <animated.div ref={ref} style={style} {...other}>
//       {cloneElement(children, { onClick })}
//     </animated.div>
//   );
// };

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

const useInitializeModalOpen = (value) => {
  const globalValue = useMemo(() => value, [value]);
  const [open, setOpen] = useState(globalValue);
  const [closed, setClosed] = useState(false);
  const { messageState, messageDispatch } = useContext(MessageContext);

  const update = useCallback((value) => {
    setOpen(value);
  }, []);

  const autoCloseAfterTimeOut = useCallback(() => {
    if (open && !messageState.interactive) {
      setTimeout(() => {
        setOpen(false);
        setClosed(true);
      }, [1000]);
    }
  }, [messageState.interactive, open]);

  const clearMessageOnModalClose = useCallback(() => {
    if (closed && messageState.message !== "") {
      messageDispatch({
        type: UPDATE_MESSAGE,
        message: "",
      });
    }
  }, [closed, messageDispatch, messageState.message]);

  useEffect(() => {
    if (globalValue !== open) {
      setOpen(globalValue);
    }
  }, [globalValue, open]);

  autoCloseAfterTimeOut();
  clearMessageOnModalClose();

  console.log("local", open);
  console.log("global", globalValue);

  return [open, update];
};

const initializeState = (initialValue) => initialValue;

const SpringModal = (props) => {
  // const { messageState, messageDispatch } = useContext(MessageContext);
  // const [open, setOpen] = useInitializeModalOpen(messageState.modalOpen);
  // const open = useMemo(() => messageState.modalOpen, [messageState.modalOpen]);

  // const [open, setOpen] = useState(initializeState(messageState.modalOpen));

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    // messageDispatch({
    //   type: UPDATE_MESSAGE,
    //   message: "",
    // });
    // messageState.onModalClick();
  };

  const handleInteractiveClose = () => {
    const payloads = { modeOpen: false, interactive: false, message: "" };
    // messageDispatch({
    //   type: BULK_UPDATE,
    //   payloads: { ...payloads },
    // });
  };

  return (
    <Modal
      open={open}
      // onClick={() => {
      //   handleClose();
      //   // messageState.onModalClick();
      // }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      closeAfterTransition
      // slots={{ backdrop: Backdrop }}
      // slotProps={{
      //   backdrop: {
      //     timeout: 500,
      //   },
      // }}
    >
      <ModalContentComponent>
        {/* <Text text={messageState.message} /> */}
        {/* {messageState.interactive ? ( */}
        <>
          <List>
            <RowComponent theme={{ justifyContent: "space-evenly", alignItems: "center" }}>
              <RoundButton
                onClick={() => {
                  // handleInteractiveClose();
                  // messageState.onModalClick(true);
                  handleClose();
                }}
              >
                <CheckIcon />
              </RoundButton>
              <RoundButton
                onClick={() => {
                  // handleInteractiveClose();
                  // messageState.onModalClick(false);
                  handleClose();
                }}
              >
                <CloseIcon />
              </RoundButton>
            </RowComponent>
          </List>
          {/* <Text text={messageState.message} /> */}
        </>
        {/* ) : (
          <Grid onClick={handleClose}>
            <Text text={messageState.message} />
          </Grid>
        )} */}
      </ModalContentComponent>
    </Modal>
  );
};

export default SpringModal;
