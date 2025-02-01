import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPlaceDetails } from "../redux/actions";

const FavoriteDetails = () => {
  const dispatch = useDispatch();
  const { selectedPlace, placeDetails } = useSelector((state) => state);
  const { editorial_summary, formatted_address, icon, rating } =
    placeDetails?.result || {};

  useEffect(() => {
    if (selectedPlace) {
      dispatch(fetchPlaceDetails(selectedPlace.placeId));
    }
  }, [dispatch, selectedPlace]);

  if (!selectedPlace)
    return <Typography>Select a favorite place to see details.</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{selectedPlace.name}</Typography>
        <Typography variant="body1">{selectedPlace.address}</Typography>
        {placeDetails && (
          <>
            <Typography variant="body2">Extra Info:</Typography>
            <Typography variant="body2">
              Description : {editorial_summary?.overview || "No Info"}
            </Typography>
            <Typography variant="body2">Rating : {rating || "No Info"}</Typography>
            <Typography variant="body2">Icon : {icon || "No Info"}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FavoriteDetails;
