import { FC } from 'react';
import { Typography, List, ListItem } from '@mui/material';

interface LastDayLoginsProps {
  data: {
    lastDayLogins: Array<{ name: string }>; 
  };
}

const LastDayLogins: FC<LastDayLoginsProps> = ({ data }) => {
  return (
    <div>
      <Typography variant="h2">Last Day Logins</Typography>
      <Typography variant="body1">Users who logged in during the last day:</Typography>
      <List>
        {data.lastDayLogins.map((user, index) => (
          <ListItem key={index}>{user.name}</ListItem> 
        ))}
      </List>
    </div>
  );
};

export default LastDayLogins;
