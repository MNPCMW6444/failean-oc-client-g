import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { Typography } from "@mui/material";
import axios, { AxiosInstance } from "axios";

interface OcserverProviderProps {
  children: ReactNode;
  tryInterval?: number;
  env?: "tst" | "dev";
}

interface OcserverContextProps {
  axiosInstance: AxiosInstance;
  version: string;
}

const DEFAULT_TRY_INTERVAL = 3000;

export const OcserverContext = createContext<OcserverContextProps | null>(null);

export const OcserverProvider = ({
  children,
  tryInterval,
  env,
}: OcserverProviderProps) => {
  const interval = tryInterval || DEFAULT_TRY_INTERVAL;
  const IDLE = "IDLE";
  const CHECKING_MESSAGE = "Checking oc server availability...";
  const GOOD_STATUS = "good";
  const BAD_MESSAGE = `OC Server is not available. Please try again later by refreshing or wait ${
    interval / 1000
  } seconds.`;

  const checkServerAvailability = useCallback(
    async (axiosInstance: AxiosInstance) => {
      try {
        return (await axiosInstance.get("areyoualive")).data.answer === "yes"
          ? GOOD_STATUS
          : BAD_MESSAGE;
      } catch (err) {
        return BAD_MESSAGE;
      }
    },
    [BAD_MESSAGE]
  );

  const [status, setStatus] = useState<string>(IDLE);
  const [version, setVersion] = useState<string>();

  const statusRef = useRef(status);

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:6777/"
      : `https://${env || ""}ocserver.failean.com/`;

  const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    const setStatusAsyncly = async () => {
      try {
        setStatus(CHECKING_MESSAGE);
        console.log("Checking oc server availability..."); // Log for starting server check

        const newStatus = await checkServerAvailability(axiosInstance);
        if (newStatus === "good") {
          const { data } = await axiosInstance.get("areyoualive");
          setVersion(data.version);
        }
        setStatus(newStatus);

        console.log(`OC Server check complete. Status: ${newStatus}`); // Log for completion of server check

        if (newStatus !== GOOD_STATUS) {
          console.log("Setting up the next check..."); // Log for setting up next server check
          setTimeout(setStatusAsyncly, interval);
        }
      } catch (error) {
        console.error(
          "An error occurred while checking the oc server: ",
          error
        ); // Log for any error during server check
        // After an error, we can setup the next server check too
        setTimeout(setStatusAsyncly, interval);
      }
    };
    if (statusRef.current === IDLE) {
      setStatusAsyncly();
    }
  }, [axiosInstance, interval, checkServerAvailability]);

  if (status === GOOD_STATUS) {
    return (
      <OcserverContext.Provider
        value={{ version: version || "", axiosInstance }}
      >
        {children}
      </OcserverContext.Provider>
    );
  } else {
    return <Typography>{status}</Typography>;
  }
};
