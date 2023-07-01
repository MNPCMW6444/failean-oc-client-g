import React from 'react';

export interface TokenData {
  userId: string;
  consumedTokens: number;
}


interface TokenAnalyticsProps {
  tokenData: TokenData[];
}



const TokenAnalytics: React.FC<TokenAnalyticsProps> = ({ tokenData }) => {
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
      <h2>Token Consumption Analytics</h2>
      <p>Total Tokens Consumed: {totalTokensConsumed}</p>
      <p>Average Tokens per User: {averageTokensPerUser}</p>
      <p>Highest Token Consumption: {maxTokenConsumption}</p>
      <p>Lowest Token Consumption: {minTokenConsumption}</p>
      {/* Render additional charts or visualizations here */}
    </div>
  );
}

export default TokenAnalytics;
