import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./login.css";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
      profile: []
    };
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();

    let data = new FormData();
    console.log("front end username", this.state.username);
    data.append("username", this.state.username);
    console.log("front end password", this.state.password);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();

    let body = JSON.parse(responseBody);

    if (!body.success) {
      alert("login failed");
      return;
    }
    let profileData = new FormData();
    profileData.append("username", this.state.username);
    let getProfileResponse = await fetch("/getProfile", {
      method: "POST",
      body: profileData,
      credentials: "include"
    });
    let getProfileResponseBody = await getProfileResponse.text();
    let parsedProfile = JSON.parse(getProfileResponseBody);
    console.log("get profile response", parsedProfile);
    this.props.dispatch({
      type: "login-success",
      username: this.state.username,
      profile: parsedProfile
    });

    alert("login-successful");
    this.setState({ redirect: true });
  };
  render = () => {
    if (this.state.redirect) return <Redirect to="/profilesdisplay" />;
    return (
      <div className="background">
        <div className="container-login">
          <form onSubmit={this.handleSubmit} className="login">
            <div className="login-child">
              <div>
                <img src="logo.png" className="logo" />
              </div>
              Username
              <input
                type="text"
                onChange={this.handleUsernameChange}
                className="login-field"
              />
            </div>
            <div className="login-child">
              Password
              <input
                type="password"
                onChange={this.handlePasswordChange}
                className="login-field"
              />
            </div>
            <input type="submit" className="login-button" />
            <Link className="link-sign-up" to="/signup">
              <div>Would you like to sign up? Click here</div>
            </Link>
          </form>
        </div>
      </div>
    );
  };
}

let Login = connect()(UnconnectedLogin);
export default Login;
