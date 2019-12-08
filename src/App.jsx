import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./login.jsx";
import RoommateSignup from "./signUp.jsx";
import ProfilesDisplay from "./ProfilesDisplay.jsx";

class App extends Component {
  componentDidMount = async () => {};
  renderHome = () => {
    return <Login />;
  };
  renderLogin = () => {
    return <RoommateSignup />;
  };
  renderProfilesToDisplay = () => {
    return <ProfilesDisplay />;
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
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
