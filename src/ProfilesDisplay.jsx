import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfilesDisplay.css";

class UnconnectedProfilesDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      matches: []
    };
  }
  componentDidMount = async () => {
    let response = await fetch("/allprofiles");
    let responseBody = await response.text();
    let parsedProfiles = JSON.parse(responseBody);
    this.setState({ profiles: parsedProfiles });
  };
  yesHandler = (to, from) => {
    preventDefault();
    let data = new FormData();
    data.append("from", from);
    data.append("to", to);
    let response = await fetch("/matches", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    console.log("signup response", response);
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("signup body", body);
  };

  render() {
    return (
      <div>
        <div>
          {this.state.profiles.map(profile => {
            console.log("image", profile.image);
            return (
              <div className="profile-container">
                <img src={profile.image} />
                <div className="personal-info-container">
                  <h1>{profile.firstName}</h1>
                  <h2>Age, {profile.age}</h2>
                  <div>
                    <div>Profession: {profile.profession}</div>
                    <div>Identifies as: {profile.gender}</div>
                    <div>My share of rent will be: {profile.priceRange}</div>
                    <div>Do I have any pets? {profile.pets}</div>
                    <button
                      onClick={() =>
                        this.yesHandler(profile.username, this.props.username)
                      }
                    >
                      Yes!
                    </button>
                    <button
                      onClick={() =>
                        this.noHandler(profile.username, this.props.username)
                      }
                    >
                      No.
                    </button>
                  </div>

                  <div>
                    {" "}
                    Preferences:
                    <div>{profile.preferences}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
let mapStateToProps = state => {
  return {
    username: state.username,
    profiles: state.profiles
  };
};
let ProfilesDisplay = connect(mapStateToProps)(UnconnectedProfilesDisplay);
export default ProfilesDisplay;
