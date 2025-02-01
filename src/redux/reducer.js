import {
  ADD_PLACE,
  SET_FAVORITES,
  SET_PLACE_DETAILS,
  SET_SELECTED_PLACE,
} from "./actions";

const initialState = {
  history: [],
  selectedPlace: null,
  favoritePlaces: [],
  placeDetails: null,
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return { ...state, history: [...state.history, action.payload] };
    case SET_SELECTED_PLACE:
      return { ...state, selectedPlace: action.payload };
    case SET_FAVORITES:
      return { ...state, favoritePlaces: action.payload };
    case SET_PLACE_DETAILS:
      return { ...state, placeDetails: action.payload };
    default:
      return state;
  }
};

export default placesReducer;
