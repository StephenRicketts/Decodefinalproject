import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedTenantSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
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

  tenantSignupHandler = async evt => {
    evt.preventDefault();

    let data = new FormData();
    console.log("this is the front end data", this.state.email);
    data.append("username", this.state.username);
    data.append("email", this.state.email);
    data.append("password", this.state.password);

    let response = await fetch("/tenantsignup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    console.log("tenant signup response", response);
    let responseBody = await response.text();
    console.log("response body", responseBody);
    let body = JSON.parse(responseBody);
    console.log("tenant sign up body", body);
    if (!body.success) {
      alert("Sign up has failed, please choose another username");
      return;
    }
    alert("Sign up successful! Welcome to Tenant Rex");
    this.props.dispatch({
      type: "tenant-signup-success",
      username: this.state.username
    });
    console.log("after dispatch");
    this.setState({ username: "", password: "", email: "" });
  };
  render() {
    return (
      <div>
        Tenant sign up form
        <form onSubmit={this.tenantSignupHandler}>
          <div>
            Enter a username here!
            <input type="text" onChange={this.handleUsernameChange} />
          </div>
          <div>
            Enter your email here!
            <input type="text" onChange={this.handleEmailChange} />
          </div>
          <div>
            Please enter a password for your account
            <input type="text" onChange={this.handlePasswordChange} />
          </div>
          <div>
            <input type="submit" value="create your account" />
          </div>
        </form>
      </div>
    );
  }
}

let TenantSignup = connect()(UnconnectedTenantSignup);
export default TenantSignup;
