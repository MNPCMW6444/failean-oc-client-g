import { FC } from 'react';
import { Typography, List, ListItem } from '@mui/material';

interface InvalidPromptEventsProps {
  events: Array<{ eventName: string }>; // change this line to reflect the actual data structure
}

const InvalidPromptEvents: FC<InvalidPromptEventsProps> = ({ events }) => {
  return (
    <div>
      <Typography variant="h2">Invalid Prompt Events</Typography>
      <Typography variant="body1">Events related to invalid prompts:</Typography>
      <List>
        {events.map((event, index) => (
          <ListItem key={index}>{event.eventName}</ListItem> // change this line to reflect the actual data structure
        ))}
      </List>
    </div>
  );
};

export default InvalidPromptEvents;
