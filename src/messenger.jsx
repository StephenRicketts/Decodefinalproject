import React, { Component } from "react";
import { connect } from "react-redux";
import "./messenger.css";

class UnconnectedMessenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messagesToDisplay: []
    };
  }
  componentDidMount = async () => {
    console.log("componentDidMount hit");
    let getMessages = async () => {
      let data = new FormData();
      data.append("matchId", this.props.convo);
      let response = await fetch("/getRelevantMessages", {
        method: "POST",
        body: data,
        credentials: "include"
      });
      let responseBody = await response.text();
      let parsedMessages = JSON.parse(responseBody);
      console.log("this should be the messages", parsedMessages.messages);
      this.setState({
        messagesToDisplay: parsedMessages.messages
      });
    };
    setInterval(getMessages, 2000);
  };
  messageHandler = evt => {
    this.setState({ message: evt.target.value });
  };
  messageSubmitHandler = async evt => {
    console.log("button test");
    evt.preventDefault();
    let nameWithMessage =
      this.props.profile.firstName + ": " + this.state.message;
    let data = new FormData();
    data.append("message", nameWithMessage);
    data.append("sender", this.props.profile.username);
    data.append("matchId", this.props.convo);
    fetch("/messages", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    this.setState({ message: "" });
  };
  render() {
    return (
      <div>
        <div className="messenger-container">
          <div className="messenger-display">
            <div>
              <ul className="messenger-list">
                {this.state.messagesToDisplay.map(messageObject => {
                  return (
                    <li>
                      <div>{messageObject.message}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="chat-box">
          <form onSubmit={this.messageSubmitHandler}>
            <div className="inputs-messenger">
              <input
                type="text"
                onChange={this.messageHandler}
                value={this.state.message}
              />
              <input type="submit" value="send" className="send-button" />
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
