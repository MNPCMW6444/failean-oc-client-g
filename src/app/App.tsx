import Signins from "./components/kpis/Signins";
import Servers from "./components/status/Server";
import InvalidPromptEvents from "./components/kpis/InvalidPromptEvents";
const App = () => {
  return (
    <>
      <Servers />
      <Signins />
    <InvalidPromptEvents  />
    </>
  );
};

export default App;
