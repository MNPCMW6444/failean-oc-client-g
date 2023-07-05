import { MainserverProvider } from "@failean/mainserver-provider";
import MainserverStatus from "./servers/MainserverStatus";

const Servers = () => (
  <MainserverProvider env="dev">
    <MainserverStatus />
  </MainserverProvider>
);
export default Servers;
