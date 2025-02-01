import "./App.css";

import {
  Alert,
  Box,
  Container,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import { Provider, useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { addPlace, saveFavorite, setSelectedPlace } from "./redux/actions";

import FavoriteDetails from "./components/FavoriteDetails";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
  const [animated, setAnimated] = useState(false);

  const handleSaveFavorite = () => {
    const isDuplicate = favoritePlaces?.content?.some(
      (place) => place.placeId === selectedPlace.placeId
    );

    if (isDuplicate) {
      setAlert({ open: true, message: "This place is already in favorites." });
    } else {
      dispatch(saveFavorite(selectedPlace));
      setAlert({ open: true, message: "Place saved successfully!" });
    }
    setAnimated(true);
    setTimeout(() => setAnimated(false), 300);
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
        <Typography variant="h4" gutterBottom className="title">
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
          className="search-field"
        />

        <Box display="flex" gap={4} mt={2}>
          <SearchHistory
            history={history}
            onSelectPlace={(place) => dispatch(setSelectedPlace(place))}
            className="history-list"
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
            <IconButton
              className={`favorite-btn ${animated ? "animated" : ""}`}
              onClick={handleSaveFavorite}
              color="default"
            >
              <FavoriteIcon />
            </IconButton>
            <Typography className="details-label">Click to save as favourite </Typography>
            <Snackbar
              open={alert.open}
              autoHideDuration={3000}
              onClose={() => setAlert({ open: false, message: "" })}
              anchorOrigin={{ vertical: "center", horizontal: "right" }}
            >
              <Alert
                severity={
                  alert.message.includes("already") ? "warning" : "success"
                }
              >
                {alert.message}
              </Alert>
            </Snackbar>
          </Box>
        )}
      </Paper>
      <FavoriteDetails />
      <div className="favorites-list">
        <FavoritesPage />
      </div>
    </Container>
  );
};

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
