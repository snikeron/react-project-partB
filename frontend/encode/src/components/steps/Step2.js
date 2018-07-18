import React, { Component } from 'react'


export default class Step2 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: props.getData().firstName,
      lastName: props.getData().lastName,
      email: props.getData().email,
      location: props.getData().location
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };


  componentDidMount() {}


  render() {

    
    return (

        <div className="flex-container">
          <div className="flex-item">
            <form>

                <div className="input-field">
                    <label>First Name</label>
                    <input placeholder="" type="text" />
                    
                </div>

                <div className="input-field">
                    <label>Last Name</label>
                    <input placeholder="" type="text" />
                    
                </div>

                <div className="input-field">
                    <label>Email</label>
                    <input className="left" placeholder="" type="text" />
                    
                </div>

                <div className="input-field"> 
                      <label>Location</label>     
                      <select
                        ref="location"
                        autoComplete="off"
                        required
                        value={this.state.location}
                        onChange={this.handleChange}
                        onBlur={this.validationCheck}>
                        >
                        <option value="" disabled selected>Please select</option>
                        <option value={"Melbourne"}>Melbourne</option>
                        <option value={"Adelaide"}>Adelaide</option>
                        <option value={"Sydney"}>Sydney</option>
                        <option value={"Brisbane"}>Brisbane</option>
                        <option value={"Canberra"}>Canberra</option>
                        <option value={"Perth"}>Perth</option>
                      </select>
                      
                </div>
            </form>
          </div>
        </div>

    )
  }
}

