import { Component } from "react";
import { connect } from "react-redux";

class unconnectedPropertyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      bedrooms: "",
      price: "",
      details: "",
      img: null
    };
  }

  handleAddressChange = event => {
    this.setState({ addess: event.target.value });
  };

  handleBedroomsChange = event => {
    this.setState({ bedrooms: event.target.value });
  };

  handlePriceChange = event => {
    this.setState({ price: event.target.value });
  };

  handleDetailsChange = event => {
    this.setState({ details: event.target.value });
  };
  handleImgChange = event => {
    this.setState({ img: event.target.files[0] });
  };

  propertyFormHandler = async evt => {
    evt.preventDefault();

    let data = new FormData();
    console.log("this is the front end data", this.state.address);
    data.append("address", this.state.address);
    data.append("bedrooms", this.state.bedrooms);
    data.append("price", this.state.price);
    data.append("details", this.state.details);
    data.append("img", this.state.img);

    let response = await fetch("/propertyForm", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);

    if (!body.success) {
      alert("Your ad has been submitted");
      return;
    }
    alert("Sign up successful! Welcome to Tenant Rex");
    this.props.dispatch({
      type: "property-form-submitted"
    });
    console.log("after dispatch");
    this.setState({
      address: "",
      bedrooms: "",
      price: "",
      details: "",
      img: null
    });
  };
  render() {
    return (
      <div>
        <h2>Enter the information for your rental property here</h2>
        <form onSubmit={this.propertyFormHandler} />
        <div>
          What is the address of the property?
          <input type="text" onChange={this.handleAddressChange} />
          <div>
            How many bedrooms are in the apartment?
            <input type="number" onChange={this.handleBedroomsChange} />
          </div>
          <div>
            what is the cost of monthly rent in your property?
            <input type="number" onChange={this.handlePriceChange} />
          </div>
          <div>
            Please add some details you would like for your potential tenants to
            be aware of.
            <input type="text" onChange={this.handleDetailsChange} />
            <div>
              Please attach some pictures of the property
              <input type="file" onChange={this.handleImgChange} />
              <input type="submit" value="Submit your ad!" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let PropertyForm = connect()(unconnectedPropertyForm);
export default PropertyForm;
