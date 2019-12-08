import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedRoommateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      priceRange: "",
      gender: "",
      age: "",
      pets: "",
      preferences: "",
      img: null
    };
  }
  userImgHandler = evt => {
    this.setState({ img: event.target.files[0] });
  };
  usernameHandler = evt => {
    this.setState({ username: evt.target.value });
  };
  priceRangeHandler = evt => {
    this.setState({ priceRange: evt.target.value });
  };
  genderHandler = evt => {
    this.setState({ gender: evt.target.value });
  };
  ageHandler = evt => {
    this.setState({ age: evt.target.value });
  };
  petsHandler = evt => {
    this.setState({ pets: evt.target.value });
  };
  preferencesHandler = evt => {
    this.setState({ preferences: evt.target.value });
  };
  submitHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    console.log("this is the submit handler", this.state.priceRange);
    data.append("username", this.state.username);
    data.append("priceRange", this.state.priceRange);
    data.append("gender", this.state.gender);
    data.append("age", this.state.age);
    data.append("pets", this.state.pets);
    data.append("preferences", this.state.preferences);
    data.append("img", this.state.img);
    let response = await fetch("/roommate-profile", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert("profile creation failed, please try again");
      return;
    }
    alert("Your profile has been created!");
    this.setState({
      username: "",
      priceRange: "",
      gender: "",
      age: "",
      pets: "",
      preferences: ""
    });
    this.props.dispatch({ type: "roommate-profile-created" });
  };
  render() {
    return (
      <div>
        <h4>Roommate profile information</h4>
        <form onSubmit={this.submitHandler}>
          <div>
            Please enter a username. This will be presented in your profile,
            feel free to use your real name.
            <input type="text" onChange={this.usernameHandler} />
          </div>
          <div>
            Please add a photo of yourself!
            <input type="file" onChange={this.userImgHandler} />
          </div>
          <div>
            What is your age?
            <input type="number" onChange={this.ageHandler} />
          </div>
          <div>
            How do you identify in terms of gender?
            <input type="text" onChange={this.genderHandler} />
          </div>
          <div>
            How much are you looking to spend on your share of monthy rent?
            <input type="number" onChange={this.priceRangeHandler} />
          </div>
          <div>
            Do you have any pets?
            <input type="text" onChange={this.petsHandler} />
            <div>
              What are you looking for in a living space? Let your future
              roommates know what you like and don't like!
              <input type="text" onChange={this.preferencesHandler} />
            </div>
            <div>
              <input type="submit" value="create your profile" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
let mapStateToProps = state => {
  console.log("this is the state", state);
  return {
    roommateProfile: state.roommateProfile
  };
};
let RoommateForm = connect(mapStateToProps)(UnconnectedRoommateForm);
export default RoommateForm;
