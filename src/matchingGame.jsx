import React, { Component } from "react";
import { connect } from "react-redux";

class UnConnectedMatchingGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: []
    };
  }
  componentDidMount = async () => {
    console.log("CdM Hit");
    let candidates = new FormData();
    this.props.dispatch({
      type: "get-profile"
    });
  };
}
