import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfilesDisplay.css";
import { Link } from "react-router-dom";

class UnconnectedProfilesDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
    };
  }
  componentDidMount = async () => {
    let response = await fetch("/allprofiles");
    let responseBody = await response.text();
    let parsedProfiles = JSON.parse(responseBody);
    this.setState({ profiles: parsedProfiles });
  };
  yesHandler = async (to, from) => {
    let data = new FormData();
    data.append("from", from);
    data.append("to", to);
    let response = await fetch("/matches", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("match body", body.status);
    if (body.status === "matched") {
      alert("You have a match!");
      let matchedProfileData = new FormData();
      console.log("this is the target profile", to);
      matchedProfileData.append("matchedProfile", to);
      let matchedProfileResponse = await fetch("/getMatchedProfile", {
        method: "POST",
        body: matchedProfileData,
        credentials: "include"
      });
      let matchedProfileResponseBody = await matchedProfileResponse.text();
      let parsedMatchedProfile = JSON.parse(matchedProfileResponseBody);
      console.log("parsed matched profile", parsedMatchedProfile);

      this.props.dispatch({
        type: "matched-profile",
        matchedProfile: parsedMatchedProfile
      });
      return;
    }
  };

  render() {
    return (
      <div>
        <Link to="/messengerlist">Messenger</Link>
        <div>
          {this.state.profiles.map(profile => {
            console.log("image", profile.image);
            if (profile.username === this.props.profile.username) {
              return;
            }
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
    profile: state.profile
  };
};
let ProfilesDisplay = connect(mapStateToProps)(UnconnectedProfilesDisplay);
export default ProfilesDisplay;
