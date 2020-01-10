import React, { Component } from "react";
import "./topBar.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedTopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  logoutHandler = evt => {
    this.props.dispatch({ type: "logout" });
    alert("You have been logged out.");
    this.setState({ redirect: true });
  };
  render = () => {
    if (this.state.redirect) return <Redirect to="/profilesdisplay" />;
    return (
      <div className="container-topbar">
        <div>
          <Link className="messengerList-link" to="/messengerlist">
            <img
              src="http://pixsector.com/cache/efd67674/av08d1dfa8a1028fdea9f.png"
              align="right"
              height="100px"
              className="topbar-image"
            />
          </Link>
        </div>
        <div>
          <Link classname="profileDisplay-Link" to="/profilesdisplay">
            <img
              src="http://pixsector.com/cache/4234b520/ava667ddb27600948759a.png"
              align="center"
              height="100px"
              className="topbar-image2"
            />
          </Link>
        </div>
        <div>
          <button onClick={this.logoutHandler} className="logoutButton">
            <img
              src="http://pixsector.com/cache/d740a866/av2ea632ff425acf36dbb.png"
              align="right"
              height="100px"
              className="logout-button"
            />
          </button>
        </div>
      </div>
    );
  };
}

let TopBar = connect()(UnconnectedTopBar);
export default TopBar;
