import { useContext } from "react";
import { MessageContext } from "../../providers/MessageProvider";
import SimpleModal from "../../components/SimpleModal";
import InteractiveModal from "../../components/InteractiveModal";

const Modal = (props) => {
  const { messageState } = useContext(MessageContext);
  const { interactive, modalOpen } = messageState;

  return <> {modalOpen && (interactive ? <InteractiveModal /> : <SimpleModal />)} </>;
};

export default Modal;
