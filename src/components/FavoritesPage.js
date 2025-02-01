import '../App.css';

import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFavorites } from "../redux/actions";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { favoritePlaces } = useSelector((state) => state);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchFavorites(page, pageSize)).finally(() => setLoading(false));
  }, [dispatch, page, pageSize]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  return (
    <div>
      <h2>Favorite Places</h2>
      {loading ? (
        <div className="loading">
          <CircularProgress color="secondary" /> Loading...
        </div>
      ) : (
        <List>
          {favoritePlaces?.content?.map((place) => (
            <ListItem key={place.placeId} button>
              <ListItemText primary={place.name} secondary={place.address} />
            </ListItem>
          ))}
        </List>
      )}

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
