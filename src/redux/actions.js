import {
  getFavoritePlaces,
  getPlaceDetails,
  saveFavoritePlace,
} from "../hooks/useController";

export const ADD_PLACE = "ADD_PLACE";
export const SET_SELECTED_PLACE = "SET_SELECTED_PLACE";
export const SET_FAVORITES = "SET_FAVORITES";
export const SET_PLACE_DETAILS = "SET_PLACE_DETAILS";

export const addPlace = (place) => ({ type: ADD_PLACE, payload: place });
export const setSelectedPlace = (place) => ({
  type: SET_SELECTED_PLACE,
  payload: place,
});
export const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  payload: favorites,
});
export const setPlaceDetails = (details) => ({
  type: SET_PLACE_DETAILS,
  payload: details,
});

export const fetchFavorites =
  (page = 0, size = 10) =>
  async (dispatch) => {
    const data = await getFavoritePlaces(page, size);
    dispatch(setFavorites(data));
  };

export const saveFavorite = (place) => async (dispatch) => {
  await saveFavoritePlace(place);
  dispatch(fetchFavorites());
};

export const fetchPlaceDetails = (placeId) => async (dispatch) => {
  const data = await getPlaceDetails(placeId);
  dispatch(setPlaceDetails(data));
};
