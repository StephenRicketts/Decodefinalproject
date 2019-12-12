import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./login.jsx";
import RoommateSignup from "./signUp.jsx";
import ProfilesDisplay from "./ProfilesDisplay.jsx";
import MessengerList from "./messengerList.jsx";
import Messenger from "./messenger.jsx";

class UnconnectedApp extends Component {
  renderHome = () => {
    return <Login />;
  };
  renderLogin = () => {
    return <RoommateSignup />;
  };
  renderProfilesToDisplay = () => {
    return <ProfilesDisplay />;
  };
  renderMessengerList = () => {
    return <MessengerList />;
  };
  renderMessengerPage = routerData => {
    let convoId = routerData.match.params._id;
    console.log("convoId", convoId);
    console.log(
      "this should be props of matches from profile",
      this.props.profile.matches
    );
    let convo = this.props.profile.matches.find(match => {
      return convoId === match.matchId;
    });
    return <Messenger convo={convoId} />;
  };
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={this.renderHome} />
          <Route exact={true} path="/signup" render={this.renderLogin} />
          <Route
            exact={true}
            path="/profilesdisplay"
            render={this.renderProfilesToDisplay}
          />
          <Route
            exact={true}
            path="/messengerlist"
            render={this.renderMessengerList}
          />
          <Route
            exact={true}
            path="/messengerlist/:_id"
            render={this.renderMessengerPage}
          />
        </div>
      </BrowserRouter>
    );
  };
}

let mapStateToProps = state => {
  return {
    profile: state.profile
  };
};
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
