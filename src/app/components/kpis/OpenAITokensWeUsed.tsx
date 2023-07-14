import { useState, useEffect, useContext } from "react";
import { OcserverContext } from "../../context/OcserverContext";
import { Typography, Card, CardContent } from "@mui/material";


const OpenAITokensWeUsed = () => {
  const [tokensUsed, setTokensUsed] = useState<number | null>(null);

  const ocserverContext = useContext(OcserverContext);
  const axiosInstance = ocserverContext?.axiosInstance;

  useEffect(() => {
    const fetchTokensUsed = async () => {
      try {
        if (axiosInstance) {
          const res = await axiosInstance.get("/numberOfOpenAITokensWeUsed");
          const { sum } = res.data;
          setTokensUsed(sum || null);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTokensUsed();
  }, [axiosInstance]);

  return (
    <div>
      <Typography variant="h6">Number of OpenAI Tokens Used: {tokensUsed || "N/A"}</Typography>
      <Card>
        <CardContent>
          {/* Additional content for the card */}
        </CardContent>
      </Card>
    </div>
  );
};

export default OpenAITokensWeUsed;