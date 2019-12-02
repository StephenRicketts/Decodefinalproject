import React, { Component } from "react";
import TenantSignup from "./tenantSignup.jsx";
import LandlordSignup from "./landlordSignup.jsx";
import RoomateForm from "./roomateForm.jsx";

class App extends Component {
  render = () => {
    return (
      <div>
        <div>
          <TenantSignup />
        </div>
        <div>
          <LandlordSignup />
        </div>
        <div>
          <RoomateForm />
        </div>
      </div>
    );
  };
}

export default App;
