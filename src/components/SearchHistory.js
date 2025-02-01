import { List, ListItem, ListItemText } from '@mui/material';

import React from 'react';

const SearchHistory = ({ history, onSelectPlace }) => (
  <div className="w-1/3">
    <h2 className="font-bold mb-2">Search History</h2>
    <List>
      {history.map((place, index) => (
        <ListItem button key={index} onClick={() => onSelectPlace(place)}>
          <ListItemText primary={place.name} />
        </ListItem>
      ))}
    </List>
  </div>
);

export default SearchHistory;