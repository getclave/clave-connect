import "./App.css";
import { useClaveWallet } from "./context";

function App() {
  const claveConnector = useClaveWallet();

  return (
    <div>
      <button onClick={claveConnector.connect}>build</button>
    </div>
  );
}

export default App;
