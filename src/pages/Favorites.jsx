import React, { createContext, useReducer, useEffect } from "react";

const StarWarsContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, [action.payload.type]: action.payload.data };
    case "TOGGLE_FAVORITE":
      const { id, type } = action.payload;
      const isFavorite = state.favorites.some((fav) => fav.id === id);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter((fav) => fav.id !== id)
          : [...state.favorites, { id, type }],
      };
    default:
      return state;
  }
};

export const StarWarsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { people: [], planets: [], vehicles: [], favorites: [] });

  useEffect(() => {
    const fetchData = async (type) => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/${type}`);
        const data = await response.json();
        dispatch({ type: "SET_DATA", payload: { type, data: data.results } });
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
      }
    };

    fetchData("people");
    fetchData("planets");
    fetchData("vehicles");
  }, []);

  return <StarWarsContext.Provider value={{ state, dispatch }}>{children}</StarWarsContext.Provider>;
};

export const useStarWarsContext = () => {
  return React.useContext(StarWarsContext);
};
