import { useState } from "react";
import toast from "react-hot-toast";
import { FcOk } from "react-icons/fc";
import { RiCloseLargeLine } from "react-icons/ri";
import { useCreateMessageMutation } from "../../RTK/messagesApi";
import css from "../DeleteMessage/DeleteMessage.module.css";
import css2 from "../EditMessage/EditMessage.module.css";
import Loader from "../Loader/Loader";

interface CreateMessageProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateMessage: React.FC<CreateMessageProps> = ({ setOpenModal }) => {
  const [loading, setLoading] = useState(false);
  const [newMsg, setNewMsg] = useState<string>("");

  const [createMessage] = useCreateMessageMutation();

  const handleCreatingMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await createMessage({
        message: newMsg,
      });

      setOpenModal(false);

      toast.success("Message was successfully created", {
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
      <p className={css.text}>Do you want to create message?</p>

      <textarea
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        className={css2.textarea}
        required
      />

      <div className={css.btns}>
        <button onClick={handleCreatingMessage} disabled={newMsg.trim() === ""}>
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

export default CreateMessage;
