import { useEffect, useState } from 'react';

export const useGoogleAutocomplete = (inputId, onPlaceChanged) => {
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    const loadAutocomplete = () => {
      const input = document.getElementById(inputId);
      const googleAutocomplete = new window.google.maps.places.Autocomplete(input);
      googleAutocomplete.addListener('place_changed', () => {
        const place = googleAutocomplete.getPlace();
        if (place.geometry) {
          onPlaceChanged({
            name: place.name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address,
            placeId: place.place_id
          });
        }
      });
      setAutocomplete(googleAutocomplete);
    };

    if (!autocomplete && window.google) {
      loadAutocomplete();
    }
  }, [autocomplete, inputId, onPlaceChanged]);

  return autocomplete;
};