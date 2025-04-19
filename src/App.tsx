import CreateMessageBtn from "./components/CreateMessageBtn/CreateMessageBtn";
import Messages from "./components/Messages/Messages";

const App: React.FC = () => {
  return (
    <div className="container">
      <CreateMessageBtn />
      <Messages />
    </div>
  );
};

export default App;
