import { useContext } from "react";
import { MessageContext } from "../../providers/MessageProvider";
import SimpleModal from "../../components/SimpleModal";
import InteractiveModal from "../../components/InteractiveModal";

const Modal = ({ open, interactive, onClickCallback, message }) => {
  // const { messageState } = useContext(MessageContext);
  // const { interactive, modalOpen } = messageState;

  // const { open, interactive, onClickCallback, message } = props;

  return (
    <>
      {interactive ? (
        <InteractiveModal open={open} onClickCallback={onClickCallback} message={message} />
      ) : (
        <SimpleModal open={open} onClickCallback={onClickCallback} message={message} />
      )}
    </>
  );
};

export default Modal;
