import { useState, useEffect, useContext } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { MainserverContext } from "@failean/mainserver-provider";
import TokenAnalytics from "../TokenAnalytics";
import DailyAnalytics from "../DailyAnalytics"; // This is a new component we've created
import { TokenData } from "../TokenAnalytics";

function App() {
  const [status, setStatus] = useState("pending");
  const [tokenData, setTokenData] = useState<TokenData[]>([]);
  const mainServer = useContext(MainserverContext);

  // Add a new state for daily analytics
  const [dailyAnalytics, setDailyAnalytics] = useState({
    recentUsers: [],
    totalPaidTokens: 0,
    totalUsedTokens: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if(mainServer) {
        const { axiosInstance } = mainServer;
      try {
        const { data } = await axiosInstance.get(
          "http://localhost:6777/api/token-analytics" // Update the URL with your oc-server endpoint
        );
        setTokenData(data);
      } catch (error) {
        console.error("Error fetching token analytics data:", error);
      }
    }
    };

    fetchData();
  }, []);

  // Add a new effect to fetch daily analytics
  useEffect(() => {
    const fetchDailyAnalytics = async () => {
      if(mainServer){
        const { axiosInstance } = mainServer;
      try {
        const { data } = await axiosInstance.get(
          "http://localhost:6777/api/daily-analytics" // Update the URL with your oc-server endpoint
        );
        setDailyAnalytics(data);
      } catch (error) {
        console.error("Error fetching daily analytics data:", error);
      }
    }
    };

    fetchDailyAnalytics();
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
          height="10%"
          width="50%"
        >
          Server status is {status}
        </Box>
      </Grid>

      <Grid item>
        <TokenAnalytics tokenData={tokenData} />
      </Grid>

      
      <Grid item>
        <DailyAnalytics data={dailyAnalytics} />
      </Grid>
    </Grid>
  );
}

export default App;
