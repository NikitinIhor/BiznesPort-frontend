import css2 from "../ModalWrapper/ModalWrapper.module.css";
import css from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <>
      <div className={css2.overflow}></div>
      <div className={css.container}>
        <p>Loading ...</p>
      </div>
    </>
  );
};

export default Loader;
