import React, { useState, useEffect, useContext } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { MainserverContext } from "@failean/mainserver-provider";
import axios from "axios";
import TokenAnalytics from "../TokenAnalytics";
import { TokenData } from "../TokenAnalytics";

function App() {
  const [status, setStatus] = useState("pending");
<<<<<<< HEAD
  const [tokenData, setTokenData] = useState<TokenData[]>([]); // New state for tokenData
  const mainServer = useContext(MainserverContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:6777/api/token-analytics" // Update the URL with your oc-server endpoint
        );
        setTokenData(data);
      } catch (error) {
        console.error("Error fetching token analytics data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkServerStatus = async () => {
      if (mainServer) {
        const { axiosInstance } = mainServer;
        try {
          const { data } = await axiosInstance.get("/areyoualive");
          setStatus(data.answer === "yes" ? "working" : "not working");
        } catch (e) {
          setStatus("not working");
        }
      }
    };
    checkServerStatus();
  }, [mainServer]);
=======

  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;

  useEffect(() => {
    const check = async () => {
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
>>>>>>> 7f87f5052a7d3cbfbf90713f629398e4c9cdb158

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography>Hello</Typography>
      </Grid>

      <Grid item>
        <Box
          bgcolor={
            status === "working"
              ? "green"
              : status === "pending"
              ? "yellow"
              : "red"
          }
          height="100px"
          width="500px"
        >
          Server status is {status}
        </Box>
      </Grid>

      <Grid item>
        <TokenAnalytics tokenData={tokenData} /> {/* Pass tokenData to TokenAnalytics */}
      </Grid>
    </Grid>
  );
}

export default App;
