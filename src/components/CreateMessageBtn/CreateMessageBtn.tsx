import { useState } from "react";
import { MdOutlineCreate } from "react-icons/md";
import CreateMessage from "../CreateMessage/CreateMessage";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import css from "./CreateMessageBtn.module.css";

const CreateMessageBtn: React.FC = () => {
  const [opneModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <button onClick={handleOpenModal} className={css.create}>
        <MdOutlineCreate /> Create new message
      </button>

      {opneModal && (
        <ModalWrapper>
          <CreateMessage setOpenModal={setOpenModal} />
        </ModalWrapper>
      )}
    </>
  );
};

export default CreateMessageBtn;
