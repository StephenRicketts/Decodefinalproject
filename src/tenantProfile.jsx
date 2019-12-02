import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import RoommateForm from "/roomateFrom.jsx";

class UnconnectedTennantProfile extends Component {
  render() {
    return (
      <div>
        <div>
          Looking for roommates? Fill out this form to let potential candidates
          know what you are looking for!
          <RoommateForm />
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  console.log("tenant profile", state);
  return {
    tenants: state.tenants
  };
};

let TenantProfile = connect(mapStateToProps)(UnconnectedTennantProfile);
export default TenantProfile;
