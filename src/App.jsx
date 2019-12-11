import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./login.jsx";
import RoommateSignup from "./signUp.jsx";
import ProfilesDisplay from "./ProfilesDisplay.jsx";
import MessengerList from "./messengerList.jsx";

class App extends Component {
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
    let convo = this.props.profile.matches.matchId.find(match => {
      return convoId === convo;
    });
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
            path="/messengerlist:_id"
            render={this.renderMessengerPage}
          />
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
