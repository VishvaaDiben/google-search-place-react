import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import { Provider, useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { addPlace, saveFavorite, setSelectedPlace } from "./redux/actions";

import FavoriteDetails from "./components/FavoriteDetails";
import FavoritesPage from "./components/FavoritesPage";
import { GOOGLE_MAPS_API_URL } from "./apiRoutes";
import MapComponent from "./components/MapComponent";
import SearchHistory from "./components/SearchHistory";
import store from "./redux/store";
import { useGoogleAutocomplete } from "./hooks/useGoogleAutocomplete";

const App = () => {
  const dispatch = useDispatch();
  const { history, selectedPlace, favoritePlaces } = useSelector(
    (state) => state
  );
  const [query, setQuery] = useState("");
  const [alert, setAlert] = useState({ open: false, message: "" });

  const handleSaveFavorite = () => {
    const isDuplicate = favoritePlaces.content.some(
      (place) => place.placeId === selectedPlace.placeId
    );

    if (isDuplicate) {
      setAlert({
        open: true,
        message:
          "This place is already in favorites. Please select another place.",
      });
    } else {
      dispatch(saveFavorite(selectedPlace));
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = GOOGLE_MAPS_API_URL;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useGoogleAutocomplete("autocomplete-input", (place) => {
    dispatch(addPlace(place));
    dispatch(setSelectedPlace(place));
  });

  return (
    <Container>
      <Paper elevation={3} className="p-4">
        <Typography variant="h4" gutterBottom>
          Google Place Autocomplete
        </Typography>
        <TextField
          id="autocomplete-input"
          label="Search for a place"
          variant="outlined"
          fullWidth
          margin="normal"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Box display="flex" gap={4} mt={2}>
          <SearchHistory
            history={history}
            onSelectPlace={(place) => dispatch(setSelectedPlace(place))}
          />
          <Box flexGrow={1} height="400px">
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {selectedPlace && (
                <MapComponent
                  position={[selectedPlace.lat, selectedPlace.lng]}
                />
              )}
            </MapContainer>
          </Box>
        </Box>

        {selectedPlace && (
          <Box display="flex" alignItems="center" gap={2} mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveFavorite}
            >
              Save as Favorite
            </Button>
            <Snackbar
              open={alert.open}
              autoHideDuration={3000}
              onClose={() => setAlert({ open: false, message: "" })}
              anchorOrigin={{ vertical: "center", horizontal: "right" }}
            >
              <Alert severity="warning">{alert.message}</Alert>
            </Snackbar>
          </Box>
        )}
      </Paper>
      <FavoriteDetails />

      <FavoritesPage />
    </Container>
  );
};

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
