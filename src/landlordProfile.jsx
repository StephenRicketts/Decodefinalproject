import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class UnconnectedLandlordProfile extends Component {
  render() {
    return (
      <div>
        <div>
          <img src={this.props.landlords.image} />
          <div>
            <h4>Name: {this.props.landlords.username}</h4>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  console.log("landlord profile", state);
  return {
    landlord: state.landlords
  };
};

let TenantProfile = connect(mapStateToProps)(UnconnectedTennantProfile);
export default TenantProfile;
