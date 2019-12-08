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
  if (action.type === "login-success") {
    console.log("reducer hit");
    return {
      ...state,
      login: true,
      username: action.username
    };
  }
  if (action.type === "set-profiles") {
    console.log("reducer hit");
    return {
      ...state,
      profiles: action.profiles
    };
  }
  if (action.type === "signup-matchCode") {
    console.log("reducer 2 hit");
    return { ...state };
  }
  return state;
};

let store = createStore(
  reducer,
  {
    username: "",
    login: false,
    profiles: []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
