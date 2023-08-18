import { useState, useEffect, useContext } from "react";
import { Grid, Box } from "@mui/material";
import { MainserverContext } from "@failean/mainserver-provider";
import {OcserverContext} from "../../../context/OcserverContext";


interface ServerStatusProps {
  server:string
}
const ServerStatus = ({server}:ServerStatusProps) => {
  const [status, setStatus] = useState("pending");

  const serverContext = useContext(server==="main" ?MainserverContext:OcserverContext);
  const axiosInstance = serverContext?.axiosInstance;

  useEffect(() => {
    const check = async () => {
      console.log(axiosInstance);
      if (axiosInstance)
        try {
          const { data } = await axiosInstance.get("/areyoualive");
          setStatus(data.answer === "yes" ? "working" : "not working");
        } catch (e) {
          setStatus("not working");
        }
    };

    check();
  }, [axiosInstance]);
  return (
    <Grid container direction="column">
      <Grid item>
        <Box
          bgcolor={
            status === "working"
              ? "green"
              : status === "pending"
              ? "yellow"
              : "red"
          }
          height="500px"
          width="500px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
          color="black"
        >
          {server} Server status is {status}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ServerStatus;
