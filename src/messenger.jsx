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
  messageSubmitHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("message", this.state.message);
    data.append("sender", this.props.profile.username);
    data.append("matchId", this.props.convo);
    let response = await fetch("/messages", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();

    let body = JSON.parse(responseBody);
    console.log("this is the boy", body);
  };
  render() {
    console.log("this should be convo id", this.props.convo);
    return (
      <div>
        <div>
          {this.props.convo}
          <form onSubmit={this.messageSubmitHandler}>
            <div>
              <input type="text" onChange={this.messageHandler} />
              <input type="submit" value="send" />
            </div>
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
