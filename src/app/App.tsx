import Signins from "./components/kpis/Signins";
import Servers from "./components/status/Server";
import InvalidPromptEvents from "./components/kpis/InvalidPromptEvents";
import AvgPriceForPrompt from "./components/kpis/AvgPriceForPrompt";
import OpenAITokensWeUsed from "./components/kpis/OpenAITokensWeUsed";
import AvgIdeasPerUser from "./components/kpis/AvgIdeasPerUser";
import { OcserverProvider } from "./context/OcserverContext";

const App = () => {
  return (
    <>
      <Servers />
      <OcserverProvider>
        <Signins />
      </OcserverProvider>
      <InvalidPromptEvents />
      <AvgPriceForPrompt />
      <OpenAITokensWeUsed />
      <AvgIdeasPerUser />
    </>
  );
};

export default App;
