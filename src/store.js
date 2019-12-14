import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "all-matches") {
    console.log("all matches reducer hit");
    return { ...state, matchedProfiles: action.allMatches };
  }
  if (action.type === "matched-profile") {
    console.log("reducer hit");
    console.log("matched profiles action", action.matchedProfile);
    return {
      ...state,
      matchedProfiles: state.matchedProfiles.concat(action.matchedProfile)
    };
  }
  if (action.type === "login-success") {
    console.log("reducer hit");
    return {
      ...state,
      login: true,
      username: action.username,
      profile: action.profile
    };
  }
  if (action.type === "signup-success") {
    console.log("reducer hit");
    return {
      ...state,
      login: true,
      username: action.username,
      profile: action.profile
    };
  }

  return state;
};

let store = createStore(
  reducer,
  {
    username: "",
    login: false,
    profile: [],
    matchedProfiles: []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
