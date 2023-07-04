import { useState, useEffect, useContext } from "react";
import { Grid, Typography, Box, Button, TextField, Card, CardContent, List, ListItem } from "@mui/material";
import { MainserverContext } from "@failean/mainserver-provider";
import InvalidPromptEvents from "../InvalidPromptEvents";


type Login = {
  name: string;
};

const App = () => {
  // Add states for the new functionalities
  const [lastDayLogins, setLastDayLogins] = useState<Login[]>([]);
  const [invalidPromptEvents, setInvalidPromptEvents] = useState([]);
  const [avgPrice, setAvgPrice] = useState(0);
  const [promptName, setPromptName] = useState('examplePrompt');

  const mainServer = useContext(MainserverContext); // Define mainServer here
  const [status, setStatus] = useState("pending"); // Define status and setStatus here

  // Add effects to fetch the data from the backend
  useEffect (() => {
    const fetchLastDayLogins = async () => {
      if(mainServer){
        const { axiosInstance } = mainServer;
        try{
          const { data } = await axiosInstance.get("/LastDayLogins");
          setLastDayLogins(data);
        } catch (error) {
          console.error("Error fetching last day logins data:", error);
        }
      }
    };

    fetchLastDayLogins();
  }, [mainServer]);

useEffect(() => {
  const fetchInvalidPromptEvents = async () => {
    if(mainServer) {
      const { axiosInstance } = mainServer;
      try{
        const { data } = await axiosInstance.get("/InvalidPromptEvents");
        setInvalidPromptEvents(data.events);
      } catch (error) {
        console.error("Error fetching invalid prompt events data:", error);
      }
    }
  };

  fetchInvalidPromptEvents();
}, [mainServer]);




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

  const fetchAvgPriceForPrompt = async () => {
    if(mainServer){
      const { axiosInstance } = mainServer;
      try{
        const { data } = await axiosInstance.post("/AvgPriceForPrompt", { promptName });
        setAvgPrice(data.avg);
      } catch (error) {
        console.error("Error fetching average price data:", error);
      }
    }
  };
  

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Typography variant="h4">Welcome to OC Client Dashboard!</Typography>
      </Grid>

      <Grid item>
        <Card>
          <CardContent>
            <Typography variant="h6">Server Status Is:</Typography>
            <Box
              bgcolor={
                status === "working"
                  ? "green"
                  : status === "pending"
                  ? "yellow"
                  : "red"
              }
              height="8rem"
              width="30%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="20px"
              color="black"
            >
              {status.toUpperCase()}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <InvalidPromptEvents events={invalidPromptEvents} />
      </Grid>

      <Grid item>
        <Card>
          <CardContent>
            <Typography variant="h6">Users who Logged in Last Day</Typography>
            <List>
              {lastDayLogins.map((user, index) => (
                <ListItem key={index}>{user.name}</ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <Card>
          <CardContent>
            <Typography variant="h6">Fetch Average Price</Typography>
            <TextField 
              label="Prompt Name" 
              variant="outlined" 
              value={promptName} 
              onChange={(e) => setPromptName(e.target.value)} 
            />
            <Button variant="contained" color="primary" onClick={() => {
              if (promptName) {
                fetchAvgPriceForPrompt();
              } else {
                alert("Please enter a prompt name!");
              }
            }}>
              Get Average Price
            </Button>
            <Typography variant="subtitle1">Average Price: {avgPrice}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default App;