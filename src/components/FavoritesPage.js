import { List, ListItem, ListItemText, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchFavorites, setSelectedPlace } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { favoritePlaces } = useSelector((state) => state);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
    dispatch(fetchFavorites(page, pageSize));
  }, [dispatch, page, pageSize]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1); 
  };

  return (
    <div>
      <h2>Favorite Places</h2>
      <List>
        {favoritePlaces?.content?.map((place) => (
          <ListItem
            key={place.placeId}
            button
            onClick={() => dispatch(setSelectedPlace(place))}
          >
            <ListItemText primary={place.name} secondary={place.address} />
          </ListItem>
        ))}
      </List>
      
        <Pagination
          count={favoritePlaces.totalPages} 
          page={page + 1} 
          onChange={handlePageChange}
          color="primary"
        />
      
    </div>
  );
};

export default FavoritesPage;
