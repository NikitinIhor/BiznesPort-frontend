import CreateMessage from "./components/AddMessage/CreateMessage";
import Messages from "./components/Messages/Messages";

const App: React.FC = () => {
  return (
    <div className="container">
      <CreateMessage />
      <Messages />
    </div>
  );
};

export default App;
