import Signins from "./components/kpis/Signins";
import Servers from "./components/status/Server";
import InvalidPromptEvents from "./components/kpis/InvalidPromptEvents";
import AvgPriceForPrompt from "./components/kpis/AvgPriceForPrompt";
const App = () => {
  return (
    <>
      <Servers />
      <Signins />
    <InvalidPromptEvents  />
    <AvgPriceForPrompt />

    </>
  );
};

export default App;
