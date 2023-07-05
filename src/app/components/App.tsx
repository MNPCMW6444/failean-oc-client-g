import Signins from "./kpis/Signins";
import Servers from "./status/Server";

const App = () => {
  return (
    <>
      <Servers />
      <Signins />
    </>
  );
};

export default App;
