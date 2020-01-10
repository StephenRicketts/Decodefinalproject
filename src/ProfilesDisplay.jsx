import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfilesDisplay.css";
import { Link } from "react-router-dom";

class UnconnectedProfilesDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      seenProfiles: []
    };
  }

  componentDidMount = async () => {
    console.log("component did mount hit");
    let response = await fetch("/allprofiles");
    let responseBody = await response.text();
    let parsedProfiles = JSON.parse(responseBody);
    this.setState({ profiles: parsedProfiles });
    // this.setState({ profileToView: parsedProfiles.shift() });
    // console.log("this is the profileToView", this.state.profileToView);
    let matchesData = new FormData();
    matchesData.append("username", this.props.username);
    let matchesResponse = await fetch("/allmatches", {
      method: "POST",
      body: matchesData,
      credentials: "include"
    });
    let matchesResponseBody = await matchesResponse.text();
    let parsedAllMatches = JSON.parse(matchesResponseBody);
    let myMatchUserNames = parsedAllMatches.matches.map(match => {
      if (match.requested === this.props.username) {
        return match.requester;
      }
      if (match.requester === this.props.username) {
        return match.requested;
      }
    });
    let matchForm = new FormData();
    matchForm.append("matches", JSON.stringify(myMatchUserNames));
    let resp = await fetch("/displayMyMatches", {
      method: "POST",
      body: matchForm,
      credentials: "include"
    });
    let respText = await resp.text();
    let parsedMatchProfiles = JSON.parse(respText);
    this.props.dispatch({
      type: "all-matches",
      allMatches: parsedMatchProfiles.profiles
    });
  };

  yesHandler = async (to, from) => {
    this.setState({
      seenProfiles: this.state.seenProfiles.concat(to)
    });

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
  noHandler = async (candidate, user) => {
    console.log("no button");
    // let data = new FormData();
    // data.append("candidate", candidate);
    // console.log("candidate", candidate);
    // data.append("user", user);
    // console.log("user", user);
    // let response = await fetch("/seenProfiles", {
    //   method: "POST",
    //   body: data,
    //   credentials: "include"
    // });
    // console.log("after fetch call");
    // let responseBody = await response.text();
    // let body = JSON.parse(responseBody);
    // console.log("this is no handler body", body);
    // if (body.success) {
    //   console.log("profile listed in seen database");
    //   this.setState({ seenProfiles: candidate });
    //   return;
    // }
    // return;
    this.setState({
      seenProfiles: this.state.seenProfiles.concat(candidate)
    });
  };

  render() {
    return (
      <div>
        <div>
          {this.state.profiles.map(profile => {
            if (profile.username === this.props.profile.username) {
              return;
            }
            for (let x = 0; x < this.state.seenProfiles.length; x++) {
              if (profile.username === this.state.seenProfiles[x]) {
                return;
              }
            }
            return (
              <div className="background-profileDisplay">
                <div className="profile-container">
                  <div className="profile">
                    <img src={profile.image} padding="25px" />
                    <div className="personal-info-container">
                      {console.log(
                        "this should be danlel",
                        this.state.profileToView
                      )}
                      <h1>{profile.firstName}</h1>
                      <h2>Age, {profile.age}</h2>
                      <div>
                        <div>Profession: {profile.profession}</div>
                        <div>Identifies as: {profile.gender}</div>
                        <div>
                          My share of rent will be: {profile.priceRange}
                        </div>
                        <div>Do I have any pets? {profile.pets}</div>
                      </div>

                      <div>
                        {" "}
                        Preferences:
                        <div>{profile.preferences}</div>
                      </div>
                      <div className="button-container">
                        <button
                          onClick={() =>
                            this.yesHandler(
                              profile.username,
                              this.props.username
                            )
                          }
                          className="yes-button"
                        >
                          Yes!
                        </button>
                        <button
                          onClick={() =>
                            this.noHandler(
                              profile.username,
                              this.props.username
                            )
                          }
                          className="no-button"
                        >
                          No.
                        </button>
                      </div>
                    </div>
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
