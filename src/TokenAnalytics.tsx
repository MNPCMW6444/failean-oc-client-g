import { FC } from 'react';
import{ Typography } from '@mui/material';

export interface TokenData {
  userId: string;
  consumedTokens: number;
}


interface TokenAnalyticsProps {
  tokenData: TokenData[];
}



const TokenAnalytics: FC<TokenAnalyticsProps> = ({ tokenData }) => {
  // Calculate total consumed tokens
  const totalTokensConsumed = tokenData.reduce((total, data) => total + data.consumedTokens, 0);

  // Calculate average tokens consumed per user
  const averageTokensPerUser = totalTokensConsumed / tokenData.length;

  // Calculate highest token consumption
  const maxTokenConsumption = Math.max(...tokenData.map((data) => data.consumedTokens));

  // Calculate lowest token consumption
  const minTokenConsumption = Math.min(...tokenData.map((data) => data.consumedTokens));

  return (
    <div>
      <Typography variant="h2">Token Consumption Analytics</Typography>
      <Typography variant="body1">Total Tokens Consumed: {totalTokensConsumed}</Typography>
      <Typography variant="body1">Average Tokens per User: {averageTokensPerUser}</Typography>
      <Typography variant="body1">Highest Token Consumption: {maxTokenConsumption}</Typography>
      <Typography variant="body1">Lowest Token Consumption: {minTokenConsumption}</Typography>
      {/* Render additional charts or visualizations here */}
    </div>
  );
}

export default TokenAnalytics;
