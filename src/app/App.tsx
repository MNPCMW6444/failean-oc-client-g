import WhiteRouter from "./components/WhiteRouter";
import { UserContextProvider } from "./context/UserContext";
import { MainserverContextProvider } from "@failean/mainserver-provider";
import WhiteThemeProvider from "./providers/style/WhiteThemeProvider";

const App = () => (
  <WhiteThemeProvider>
    <MainserverContextProvider>
      <UserContextProvider>
        <WhiteRouter />
      </UserContextProvider>
    </MainserverContextProvider>
  </WhiteThemeProvider>
);

export default App;
