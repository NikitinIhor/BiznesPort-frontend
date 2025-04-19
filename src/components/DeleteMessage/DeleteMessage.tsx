import { useState } from "react";
import toast from "react-hot-toast";
import { FcOk } from "react-icons/fc";
import { RiCloseLargeLine } from "react-icons/ri";
import { useDeleteMessageMutation } from "../../RTK/messagesApi";
import Loader from "../Loader/Loader";
import css from "./DeleteMessage.module.css";

interface DeleteMessageProps {
  message: string;
  id: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteMessage: React.FC<DeleteMessageProps> = ({
  message,
  id,
  setOpenModal,
}) => {
  const [loading, setLoading] = useState(false);

  const [deleteMessage] = useDeleteMessageMutation();

  const handleDeleteMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await deleteMessage(id);

      setOpenModal(false);

      toast.success("Message was successfully deleted", {
        duration: 4000,
        position: "top-right",
      });
    } catch (error: any) {
      toast.error(`${error.message}`, {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={css.wrapper}>
      <p className={css.text}>Do you want to delete message?</p>
      <p className={css.message}> {message}</p>

      <div className={css.btns}>
        <button onClick={handleDeleteMessage}>
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

export default DeleteMessage;
