import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "tenant-signup-success") {
    console.log("reducer hit");
    return {
      ...state,
      login: true,
      username: action.username
    };
  }
  if (action.type === "landlord-signup-success") {
    console.log("reducer hit");
    return {
      ...state,
      login: true,
      username: action.username
    };
  }
  return state;
};

let store = createStore(
  reducer,
  {
    username: "",
    login: false
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
