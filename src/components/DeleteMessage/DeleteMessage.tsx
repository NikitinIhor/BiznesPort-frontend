import { FcOk } from "react-icons/fc";
import { RiCloseLargeLine } from "react-icons/ri";
import css from "./DeleteMessage.module.css";

interface DeleteMessageProps {
  message: string;
  setOpneModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteMessage: React.FC<DeleteMessageProps> = ({
  message,
  setOpneModal,
}) => {
  return (
    <div className={css.wrapper}>
      <p className={css.text}>are you really want to delete this message?</p>
      <p className={css.message}> {message}</p>

      <div className={css.btns}>
        <button>
          <FcOk />
          Yes
        </button>
        <button onClick={() => setOpneModal(false)}>No</button>
      </div>

      <button className={css.close} onClick={() => setOpneModal(false)}>
        <RiCloseLargeLine color="black" size="24px" />
      </button>
    </div>
  );
};

export default DeleteMessage;
