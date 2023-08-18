import { MainserverProvider } from "@failean/mainserver-provider";
import ServerStatus from "./servers/ServerStatus";
import {OcserverProvider} from "../../context/OcserverContext";

const Servers = () => (
    <>
        <MainserverProvider >
            <ServerStatus server="main" />
        </MainserverProvider>
        <OcserverProvider>
            <ServerStatus server="oc" />
        </OcserverProvider>
    </>
);
export default Servers;
