import { OcserverProvider } from "../context/OcserverContext";
import Signins from "./kpis/Signins";

const KPIS = () => {
  return (
    <OcserverProvider env="tst">
      <Signins />
    </OcserverProvider>
  );
};
export default KPIS;
