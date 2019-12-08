import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedMainPage extends Components {
  render() {
    return this.props.propertys.map(property => {
      return (
        <div className="mainpage-property-grid" key={propertys._id}>
          <Link to={"/propertyDescription/" + propertys._id}>
            <img src={propertys.image} className="mainpage-property-photo" />
            <br />
            {propertyAds.city}
            {propertyAds.country}
          </Link>
        </div>
      );
    });
  }
}

let mapStateToProps = state => {
  return {
    propertys: state.propertys
  };
};
let MainPage = connect(mapStateToProps)(UnconnectedMainPage);
export default MainPage;
