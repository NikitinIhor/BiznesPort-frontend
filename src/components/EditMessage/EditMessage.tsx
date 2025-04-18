import { useState } from "react";
import { FcOk } from "react-icons/fc";
import { RiCloseLargeLine } from "react-icons/ri";
import { useUpdateMessageMutation } from "../../RTK/messagesApi";
import css from "../DeleteMessage/DeleteMessage.module.css";

interface EditMessageProps {
  message: string;
  messageID: string;
  setOpneModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditMessage: React.FC<EditMessageProps> = ({
  message,
  messageID,
  setOpneModal,
}) => {
  const [newMsg, setNewMsg] = useState<string>(message);

  const [updateMessage] = useUpdateMessageMutation();

  const handleUpdatingMessage = async () => {
    try {
      await updateMessage({
        id: messageID,
        updatedMessage: { message: newMsg },
      });

      setOpneModal(false);
    } catch (error: any) {
      error.message;
    }
  };

  return (
    <div className={css.wrapper}>
      <p className={css.text}>are you really want to change this message?</p>
      <p className={css.message}> {message}</p>

      <div className={css.btns}>
        <button onClick={handleUpdatingMessage}>
          <FcOk />
          Yes
        </button>
        <button onClick={() => setOpneModal(false)}>No</button>
      </div>

      <button className={css.close} onClick={() => setOpneModal(false)}>
        <RiCloseLargeLine color="black" size="24px" />
      </button>

      <textarea
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        className={css.textarea}
      />
    </div>
  );
};

export default EditMessage;
