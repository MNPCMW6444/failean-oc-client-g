import { useState, useEffect, useContext } from "react";
import { OcserverContext } from "../../context/OcserverContext";
import { Typography, Card, CardContent } from "@mui/material";

const AvgPriceForPrompt = () => {
  const [avgPrice, setAvgPrice] = useState<number | null>(null);

  const ocserverContext = useContext(OcserverContext);
  const axiosInstance = ocserverContext?.axiosInstance;

  useEffect(() => {
    const fetchAveragePrice = async () => {
      try {
        if (axiosInstance) {
          const promptNames = ["example_prompt"]; 
          const res = await axiosInstance.post("/avgPriceForPrompt", { promptName: promptNames });
          const { avg } = res.data;
          setAvgPrice(avg || null);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAveragePrice();
  }, [axiosInstance]);

  return (
    <div>
      <Typography variant="h6">Average Price for Prompt: {avgPrice || "N/A"}</Typography>
      <Card>
        <CardContent>
          {/* Should be added lately in the UI work */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AvgPriceForPrompt;