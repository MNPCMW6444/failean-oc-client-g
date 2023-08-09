import { OcserverProvider } from "../context/OcserverContext";
import Signins from "./kpis/Signins";

const KPIS = () => {
  return (
    <OcserverProvider>
      <Signins />
    </OcserverProvider>
  );
};
export default KPIS;
