import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedTenantSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      img: null
    };
  }
  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };
  userImgHandler = event => {
    this.setState({ img: event.target.files[0] });
  };

  landlordSignupHandler = async evt => {
    evt.preventDefault();

    let data = new FormData();
    console.log("this is the front end data", this.state.username);
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("email", this.state.email);
    data.append("img", this.state.img);
    let response = await fetch("/landlordsignup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    console.log("landlord signup response", response);
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("landlord sign up body", body);
    if (!body.success) {
      alert("Sign up has failed, please choose another username");
      return;
    }
    alert("Sign up successful! Welcome to Tenant Rex");
    this.props.dispatch({
      type: "landlord-signup-success",
      username: this.state.username
    });
    console.log("after dispatch");
    this.setState({ username: "", password: "", email: "", img: null });
  };
  render() {
    return (
      <div>
        Landlord sign up form
        <form onSubmit={this.landlordSignupHandler}>
          <div>
            Enter your email here!
            <input type="text" onChange={this.handleEmailChange} />
          </div>
          <div>
            Please enter a username. This will be presented in your profile,
            feel free to use your real name.
            <input type="text" onChange={this.handleUsernameChange} />
          </div>
          <div>
            Please enter a password for your account
            <input type="text" onChange={this.handlePasswordChange} />
          </div>
          <div>
            Please add a photo of yourself!
            <input type="file" onChange={this.userImgHandler} />
            <div>
              <input type="submit" value="create your account" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

let LandlordSignup = connect()(UnconnectedTenantSignup);
export default LandlordSignup;
