import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./messengerlist.css";

class UnconnectedMessengerList extends Component {
  render() {
    console.log("matches", this.props.profile);
    return (
      <div className="box-container">
        <div>
          <h1 className="header">
            Here is a list of your matches, Click to send them a message!
          </h1>
        </div>
        <div className="profile-list-container">
          <ul className="list-container">
            {console.log("profile matches", this.props.profile.matches)}
            {this.props.profile.matches.map(match => {
              console.log("matches", match);
              return (
                <li className="list-items">
                  <Link
                    to={"/messengerlist/:" + match.matchId}
                    className="link"
                  >
                    {match.candidate}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
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
