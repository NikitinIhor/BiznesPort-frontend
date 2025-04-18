import { ReactNode } from "react";
import css from "./ModalWrapper.module.css";

interface ModalWrapperProps {
  children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  return (
    <>
      <div className={css.overflow}></div>
      <div className={css.wrapper}>
        <div className={css.body}>{children}</div>
      </div>
    </>
  );
};

export default ModalWrapper;
