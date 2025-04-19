import { useState } from "react";
import toast from "react-hot-toast";
import { FcOk } from "react-icons/fc";
import { RiCloseLargeLine } from "react-icons/ri";
import { useUpdateMessageMutation } from "../../RTK/messagesApi";
import css from "../DeleteMessage/DeleteMessage.module.css";
import Loader from "../Loader/Loader";
import css2 from "./EditMessage.module.css";

interface EditMessageProps {
  message: string;
  id: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditMessage: React.FC<EditMessageProps> = ({
  message,
  id,
  setOpenModal,
}) => {
  const [newMsg, setNewMsg] = useState<string>(message);
  const [loading, setLoading] = useState(false);

  const [updateMessage] = useUpdateMessageMutation();

  const handleUpdatingMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await updateMessage({
        id,
        message: newMsg,
      });

      setOpenModal(false);

      toast.success("Message was successfully changed", {
        duration: 4000,
        position: "top-right",
      });
    } catch (error: any) {
      toast.error(`${error.message}`, {
        duration: 4000,
        position: "top-right",
      });
      setOpenModal(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={css.wrapper}>
      <p className={css.text}>Do you want to change message?</p>

      <textarea
        placeholder={message}
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        className={css2.textarea}
      />

      <div className={css.btns}>
        <button
          onClick={handleUpdatingMessage}
          disabled={newMsg.trim() === message.trim()}
        >
          <FcOk />
          Yes
        </button>
        <button type="button" onClick={() => setOpenModal(false)}>
          No
        </button>
      </div>

      <button
        type="button"
        className={css.close}
        onClick={() => setOpenModal(false)}
      >
        <RiCloseLargeLine color="black" size="24px" />
      </button>
    </div>
  );
};

export default EditMessage;
