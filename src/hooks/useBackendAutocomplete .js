// import { useEffect, useState } from "react";

// const API_BASE_URL = "http://localhost:8080/api/favorite-places";

// export const useBackendAutocomplete = (query) => {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!query || query.length < 3) return;

//     const sessionToken =
//       sessionStorage.getItem("places_token") || crypto.randomUUID();

//     sessionStorage.setItem("places_token", sessionToken);


//     const timeout = setTimeout(async () => {
//       setLoading(true);

//       const params = new URLSearchParams({
//         query: query,
//         sessionToken: sessionToken,
//       });
//       const url = `${API_BASE_URL}/autocomplete?${params.toString()}`;

//       try {
//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();

//         setResults(data);
//       } catch (error) {
        
//         console.error("Error fetching autocomplete data:", error);
      
//       } finally {
      
//         setLoading(false);
//       }

//     }, 400); // debounce

//     return () => clearTimeout(timeout);
//   }, [query]);

//   return { results, loading };
// };
