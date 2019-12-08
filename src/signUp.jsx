import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class UnconnectedRoomateSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      age: "",
      priceRange: "",
      pets: "",
      profession: "",
      gender: "",
      password: "",
      email: "",
      img: null,
      astroSign: "",
      numbRoommates: "",
      preferences: "",
      redirect: false,
      matchCode: "",
      location: ""
    };
  }
  locationHandler = event => {
    this.setState({ location: event.target.value });
  };

  preferencesHandler = event => {
    this.setState({ preferences: event.target.value });
  };
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
  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };
  handleAgeChange = event => {
    this.setState({ age: event.target.value });
  };
  handlePriceRangeChange = event => {
    this.setState({ priceRange: event.target.value });
  };
  handlePetsChange = event => {
    this.setState({ pets: event.target.value });
  };
  handleProfessionChange = event => {
    this.setState({ profession: event.target.value });
  };
  handleGenderChange = event => {
    this.setState({ gender: event.target.value });
  };
  handleAstroSignChange = event => {
    this.setState({ astroSign: event.target.value });
  };

  RoomateSignupHandler = async evt => {
    evt.preventDefault();
    let generateId = () => {
      return "" + Math.floor(Math.random() * 10000);
    };
    this.setState({ matchCode: generateId() });

    let data = new FormData();
    console.log("this is the front end data", this.state.username);
    data.append("name", this.state.name);
    data.append("age", this.state.age);
    data.append("gender", this.state.gender);
    data.append("priceRange", this.state.priceRange);
    data.append("pets", this.state.pets);
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("email", this.state.email);
    data.append("img", this.state.img);
    data.append("profession", this.state.profession);
    data.append("astroSign", this.state.astroSign);
    data.append("numbRoommates", this.state.numbRoommates);
    data.append("preferences", this.state.preferences);
    data.append("location", this.state.location);
    let response = await fetch("/roommateSignup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    console.log("front end pref", this.state.preferences);
    console.log("signup response", response);
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("signup body", body);
    if (!body.success) {
      alert("Sign up has failed, please choose another username");
      return;
    }
    alert("Sign up successful! Welcome to Roommate finder!");
    this.props.dispatch({
      type: "signup-success",
      username: this.state.username
    });

    this.setState({ redirect: true });
    console.log("after dispatch");
    this.setState({
      name: "",
      username: "",
      age: "",
      priceRange: "",
      pets: "",
      profession: "",
      gender: "",
      password: "",
      email: "",
      img: null,
      astroSign: "",
      numbRoommates: "",
      matchCode: "",
      location: ""
    });
  };
  render() {
    if (this.state.redirect) return <Redirect to="/profilesdisplay" />;
    return (
      <div className="signup-form-container">
        Roommate sign up form
        <form onSubmit={this.RoomateSignupHandler}>
          <div className="personal-form-container">
            Personal info here!
            <div>
              Please create a username, this will be used to sign in.
              <input type="text" onChange={this.handleUsernameChange} />
            </div>
            <div>
              Please provide a password for your account.
              <input type="text" onChange={this.handlePasswordChange} />
            </div>
            <div>
              What is your first name? This will be presented on your profile.
              <input type="text" onChange={this.handleNameChange} />
            </div>
            <div>
              What city or town are you looking for find an apartment in?
              <input type="text" onChange={this.locationHandler} />
            </div>
            <div>
              Please provide a valid email address.
              <input type="text" onChange={this.handleEmailChange} />
              <div>
                Please provide your age, this will be presented on your profile.
                <input type="number" onChange={this.handleAgeChange} />
              </div>
              <div>
                Please provide roughly the ammount you are looking to spend on
                your share of rent per month.
                <input type="text" onChange={this.handlePriceRangeChange} />
              </div>
              <div>
                What is your current profession?
                <input type="text" onChange={this.handleProfessionChange} />
              </div>
              <div>
                How do you identify in terms of gender?
                <input type="text" onChange={this.handleGenderChange} />
              </div>
              <div>
                Please provide a photograph of yourself to be presented on your
                profile page.
                <input type="file" onChange={this.userImgHandler} />
              </div>
            </div>
          </div>
          <div className="preferences-form-container">
            <div>
              Do you have pets? if not, are you okay with living with other
              people's pets?
              <input type="text" onChange={this.handlePetsChange} />
            </div>
            <div>
              What is your astrological sign? Maybe also let potential roommates
              know if you think this question is irrelevant.
              <input type="text" onChange={this.handleAstroSignChange} />
            </div>
            <div>
              Finally, please provide your potential Roommates with any
              additional info you think may be relevant.
              <input type="text" onChange={this.preferencesHandler} />
            </div>
          </div>
          <div className="sign-up-button-container">
            <input type="submit" value="Creat your profile" />
          </div>
        </form>
      </div>
    );
  }
}

let RoommateSignup = connect()(UnconnectedRoomateSignup);
export default RoommateSignup;