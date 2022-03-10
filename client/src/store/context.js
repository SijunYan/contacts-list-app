import { createContext, useReducer } from "react";

export const Context = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT_DATA":
      return { allData: action.payload, showData: action.payload };
    case "SHOW_DATA":
      return { ...state, showData: action.payload };
    case "ADD_NEW_DATA":
      return {
        ...state,
        alldata: [...state.allData, action.payload],
        showdata: [...state.showData, action.payload],
      };
    case "DELETE_DATA":
      return { allData: action.payload, showData: action.payload };
    default:
      return state;
  }
};

const initialState = { allData: [], showData: [] };

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
