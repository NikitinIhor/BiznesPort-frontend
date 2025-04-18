import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useGetAllMessagesQuery } from "../../RTK/messagesApi";
import DeleteMessage from "../DeleteMessage/DeleteMessage";
import EditMessage from "../EditMessage/EditMessage";
import Loader from "../Loader/Loader";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import css from "./Messages.module.css";

const Messages: React.FC = () => {
  const { data, error, isLoading } = useGetAllMessagesQuery();

  const [opneModal, setOpneModal] = useState(false);
  const [btnType, setBtnType] = useState<"Edit" | "Delete" | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleOpenModal = (action: "Edit" | "Delete", message: string) => {
    setBtnType(action);
    setMessage(message);
    setOpneModal((prev) => !prev);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div className={css.wrapper}>
      <h1>Messages</h1>

      <div className={css.header}>
        <p>ID</p> <p>Message</p> <p>Actions</p>
      </div>

      {data && data?.length > 0 ? (
        <ul className={css.list}>
          {data.map((item, index) => (
            <li className={css.item} key={item.id}>
              <p>{index}</p>
              <p>{item.message}</p>
              <div className={css.btns}>
                <button
                  onClick={() => handleOpenModal("Edit", item.message)}
                  className={css.edit}
                >
                  <CiEdit /> Edit
                </button>
                <button
                  onClick={() => handleOpenModal("Delete", item.message)}
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
        <p>no messages</p>
      )}
      {opneModal && (
        <ModalWrapper>
          {btnType === "Edit" && message && (
            <EditMessage message={message} setOpneModal={setOpneModal} />
          )}
          {btnType === "Delete" && message && (
            <DeleteMessage message={message} setOpneModal={setOpneModal} />
          )}
        </ModalWrapper>
      )}
    </div>
  );
};

export default Messages;
