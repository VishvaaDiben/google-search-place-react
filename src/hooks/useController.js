const API_BASE_URL = "http://localhost:8080/api/favorite-places";

export const saveFavoritePlace = async (place) => {
  const requestBody = {
    name: place.name,
    address: place.address,
    placeId: place.placeId,
  };
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });
  return response.json();
};

export const getFavoritePlaces = async (page = 0, size = 10) => {
  const response = await fetch(`${API_BASE_URL}?page=${page}&size=${size}`);
  return response.json();
};

export const getPlaceDetails = async (placeId) => {
  const response = await fetch(
    `${API_BASE_URL}/fetch-google-place?placeId=${placeId}`
  );
  return response.json();
};
