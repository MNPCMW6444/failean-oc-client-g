import { useState, useEffect, useContext } from "react";
import { OcserverContext } from "../../context/OcserverContext";
import { Typography, Card, CardContent } from "@mui/material";

const AvgIdeasPerUser = () => {
  const [avgIdeas, setAvgIdeas] = useState<number | null>(null);

  const ocserverContext = useContext(OcserverContext);
  const axiosInstance = ocserverContext?.axiosInstance;

  useEffect(() => {
    const fetchAvgIdeas = async () => {
      try {
        if (axiosInstance) {
          const res = await axiosInstance.get("/avgIdeasPerUser");
          const { avg } = res.data;
          setAvgIdeas(avg || null);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAvgIdeas();
  }, [axiosInstance]);

  return (
    <div>
      <Typography variant="h6">Average Ideas per User: {avgIdeas || "N/A"}</Typography>
      <Card>
        <CardContent>
          {/* Should be added lately in the UI work */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AvgIdeasPerUser;
