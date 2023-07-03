import { FC } from 'react';
import{ Typography, List, ListItem } from '@mui/material';

interface DailyAnalyticsProps {
  data: {
    recentUsers: Array<{ name: string }>; 
    totalPaidTokens: number;
    totalUsedTokens: number;
  };
}

const DailyAnalytics: FC<DailyAnalyticsProps> = ({ data }) => {
  return (
    <div>
      <Typography variant="h2">Daily Analytics</Typography>
      <Typography variant="body1">Recent Users:</Typography>
      <List>
        {data.recentUsers.map((user, index) => (
          <ListItem key={index}>{user.name}</ListItem> // Display user name, adjust according to your user type
        ))}
      </List>
      <Typography variant="body1">Total Tokens Paid to OpenAI: {data.totalPaidTokens}</Typography>
      <Typography variant="body1">Total Tokens Used: {data.totalUsedTokens}</Typography>
    </div>
  );
};

export default DailyAnalytics;
