import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedMessenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }
  messageHandler = evt => {
    this.setState({ message: evt.target.value });
  };
  messageSubmitHandler = evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("message", this.state.message);
    data.append("sender", this.props.profile.username);
    data.append("matchId", this.props.profile.matches.matchId)
    let response = await fetch("/messages", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();

    let body = JSON.parse(responseBody);
  };
  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.messageSubmitHandler}>
            <input type="text" onChange={this.messageHandler} />
          </form>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

let Messenger = connect(mapStateToProps)(UnconnectedMessenger);

export default Messenger;
