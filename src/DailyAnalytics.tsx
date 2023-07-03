import React from 'react';

interface DailyAnalyticsProps {
  data: {
    recentUsers: Array<{ name: string }>; // Replace with your user type
    totalPaidTokens: number;
    totalUsedTokens: number;
  };
}

const DailyAnalytics: React.FC<DailyAnalyticsProps> = ({ data }) => {
  return (
    <div>
      <h2>Daily Analytics</h2>
      <p>Recent Users:</p>
      <ul>
        {data.recentUsers.map((user, index) => (
          <li key={index}>{user.name}</li> // Display user name, adjust according to your user type
        ))}
      </ul>
      <p>Total Tokens Paid to OpenAI: {data.totalPaidTokens}</p>
      <p>Total Tokens Used: {data.totalUsedTokens}</p>
    </div>
  );
};

export default DailyAnalytics;
