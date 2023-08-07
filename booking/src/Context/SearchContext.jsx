import { createContext, useReducer } from "react";

const init = {
  city: undefined,
  dates: [],
  options: {
    adults: undefined,
    children: undefined,
    rooms: undefined,
  },
};

export const SearchContext = createContext(init);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return init;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, init);
  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
