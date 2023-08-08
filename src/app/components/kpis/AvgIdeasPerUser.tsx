import { useState, useEffect, useContext } from "react";
import { OcserverContext } from "../../context/OcserverContext";
import { Typography, Card, CardContent, List, ListItem, ListItemText } from "@mui/material";

const AvgIdeasPerUser = () => {
  const [avgIdeas, setAvgIdeas] = useState<number | null>(null);
  const [usersWithMostIdeas, setUsersWithMostIdeas] = useState([] as any[]);
  const [usersWithOneIdea, setUsersWithOneIdea] = useState([] as any[]);
  const [usersWithZeroIdeas, setUsersWithZeroIdeas] = useState([] as any[]);

  const ocserverContext = useContext(OcserverContext);
  const axiosInstance = ocserverContext?.axiosInstance;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (axiosInstance) {
          const [
            avgIdeasRes,
            usersWithMostIdeasRes,
            usersWithOneIdeaRes,
            usersWithZeroIdeasRes
          ] = await Promise.all([
            axiosInstance.get("/avgIdeasPerUser"),
            axiosInstance.get("/userWithMostIdeas"),
            axiosInstance.get("/usersWithOneIdeas"),
            axiosInstance.get("/usersWithZeroIdeas")
          ]);

          const { avg } = avgIdeasRes.data;
          setAvgIdeas(avg || null);
          setUsersWithMostIdeas(usersWithMostIdeasRes.data.user);
          setUsersWithOneIdea(usersWithOneIdeaRes.data.usersWithOne);
          setUsersWithZeroIdeas(usersWithZeroIdeasRes.data.usersWithZero);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [axiosInstance]);

  return (
    <div>
      <Typography variant="h6">Average Ideas per User: {avgIdeas || "N/A"}</Typography>
      
      <Card>
        <CardContent>
          <Typography variant="h6">Users with the Most Ideas:</Typography>
          <List>
            {usersWithMostIdeas.map((user: { id: string; name: string; ideaCount: number }) => (
              <ListItem key={user.id}>
                <ListItemText primary={user.name} secondary={`Number of Ideas: ${user.ideaCount}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Users with Only One Idea:</Typography>
          <List>
            {usersWithOneIdea.map((user: { id: string; name: string; ideaCount: number }) => (
              <ListItem key={user.id}>
                <ListItemText primary={user.name} secondary={`Number of Ideas: ${user.ideaCount}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Users with Zero Ideas:</Typography>
          <List>
            {usersWithZeroIdeas.map((user: { id: string; name: string }) => (
              <ListItem key={user.id}>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvgIdeasPerUser;
