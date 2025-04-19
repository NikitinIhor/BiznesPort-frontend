import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegMessage } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useGetAllMessagesQuery } from "../../RTK/messagesApi";
import DeleteMessage from "../DeleteMessage/DeleteMessage";
import EditMessage from "../EditMessage/EditMessage";
import Loader from "../Loader/Loader";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import css from "./Messages.module.css";

const Messages: React.FC = () => {
  const { data, error, isLoading } = useGetAllMessagesQuery();

  const [opneModal, setOpenModal] = useState(false);
  const [btnType, setBtnType] = useState<"Edit" | "Delete" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  const handleOpenModal = (
    action: "Edit" | "Delete",
    message: string,
    id: string
  ) => {
    setBtnType(action);
    setMessage(message);
    setId(id);
    setOpenModal(true);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div className={css.wrapper}>
      <h1>
        List of messages <FaRegMessage size="42px" />
      </h1>

      <div className={css.header}>
        <p>ID</p>
        <p>Message</p> <p>Actions</p>
      </div>

      {data && data?.length > 0 ? (
        <ul className={css.list}>
          {data.map((item, index) => (
            <li className={css.item} key={item.id || index}>
              <p>{index}</p>
              <p>{item.message}</p>
              <div className={css.btns}>
                <button
                  onClick={() => handleOpenModal("Edit", item.message, item.id)}
                  className={css.edit}
                >
                  <CiEdit /> Edit
                </button>
                <button
                  onClick={() =>
                    handleOpenModal("Delete", item.message, item.id)
                  }
                  className={css.delete}
                >
                  <RiDeleteBin5Line />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.empty}>- - No messages - -</p>
      )}
      {opneModal && (
        <ModalWrapper>
          {btnType === "Edit" && message && id && (
            <EditMessage
              message={message}
              id={id}
              setOpenModal={setOpenModal}
            />
          )}
          {btnType === "Delete" && message && id && (
            <DeleteMessage
              message={message}
              id={id}
              setOpenModal={setOpenModal}
            />
          )}
        </ModalWrapper>
      )}
    </div>
  );
};

export default Messages;
