import { Hourglass } from "react-loader-spinner";
import css2 from "../ModalWrapper/ModalWrapper.module.css";
import css from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <>
      <div className={css2.overflow}></div>
      <div className={css.container}>
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["white", "white"]}
        />
      </div>
    </>
  );
};

export default Loader;
