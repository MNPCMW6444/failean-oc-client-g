import { useState, useEffect, useContext } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { MainserverContext } from "@failean/mainserver-provider";

const MainserverStatus = () => {
  const [status, setStatus] = useState("pending");

  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;

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
        >
          Server status is {status}
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainserverStatus;