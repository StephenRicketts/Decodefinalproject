import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedMessengerList extends Component {
  render() {
    console.log("matches", this.props.profile);
    return (
      <div>
        <ul>
          {console.log("profile matches", this.props.profile.matches)}
          {this.props.profile.matches.map(match => {
            console.log("matches", match);
            return (
              <li>
                <Link to={"/messengerlist/:" + match.matchId}>
                  {match.candidate}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
let mapStateToProps = state => {
  console.log("state", state);
  return {
    profile: state.profile
  };
};
let MessengerList = connect(mapStateToProps)(UnconnectedMessengerList);
export default MessengerList;
