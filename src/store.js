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
};

let store = createStore(
  reducer,
  {
    tenants: [],
    login: false
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
