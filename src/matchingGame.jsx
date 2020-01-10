import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedMatchingGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetProfile: [],
      profiles: []
    };
  }

  componentDidMount = async () => {
    console.log("componentDidMount Hit");
    let response = await fetch("/matchingGame");
    let responseBody = await response.text();
    let parsedProfiles = JSON.parse(responseBody);
    console.log("parsed profiles", parsedProfiles)
    this.setState({ profiles: parsedProfiles });
    let seenProfiles = await fetch("/seenProfiles");
    let seenProfilesBody = await seenProfiles.text();
    let parsedSeenProfiles = JSON.parse(seenProfilesBody)
  };

  render() {
    return (
      <div>
        <div>
          {this.state.targetProfile.map(profile => {
            if (profile.username === this.props.profile.username) {
              return;
          })}

        </div>
      </div>
    )
  }
}
