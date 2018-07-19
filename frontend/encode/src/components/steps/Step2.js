import React, { Component } from 'react'
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';


class Step2 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: props.getData().firstName,
      lastName: props.getData().lastName,
      phoneNumber: props.getData().phoneNumber,
      emailAddress: props.getData().emailAddress,
      location: props.getData().location
    }

    this.validatorTypes = {
      firstName: Joi.string().required().label('First name'),
      lastName: Joi.string().required().label('Last name'),
      phoneNumber: Joi.string().required().label('Mobile number'),
      emailAddress: Joi.string().email().required().label('Email'),
      location: Joi.string().required().label('Location')
    };

    this.handleChange = this.handleChange.bind(this)
    this.getValidatorData = this.getValidatorData.bind(this)
    this.renderHelpText = this.renderHelpText.bind(this)
    this.isValidated = this.isValidated.bind(this)
  }

  isValidated() {
    return new Promise((resolve, reject) => {
      this.props.validate((error) => {
        if (error) {
          reject(); // form contains errors
          return;
        }

        if (this.props.getData().firstName !== this.getValidatorData().firstName ||
            this.props.getData().lastName !== this.getValidatorData().lastName ||
            this.props.getData().phoneNumber!== this.getValidatorData().phoneNumber ||
            this.props.getData().emailAddress !== this.getValidatorData().emailAddress ||
            this.props.getData().location !== this.getValidatorData().location) { // only update data if something changed
            
              this.props.updateData({
            ...this.getValidatorData(),
            savedToCloud: false // use this to notify step2 that some changes took place and prompt the user to save again
          });  // Update data here
        }

        resolve() // form is valid, fire action
      })
    })
  }


  getValidatorData() {
    return {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      phoneNumber: this.refs.phoneNumber.value,
      emailAddress: this.refs.emailAddress.value,
      location: this.refs.location.value
    }
  };

  handleChange(e) {
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  renderHelpText(message) {
    return (
     <span className='help-block'>{message}</span>
    );
  }


  render() {

    
    return (

        <div className="flex-container">
          <div className="flex-item">
            <form>

                <div className="input-field">
                    <label>First Name</label>
                    <input 
                      ref="firstName"
                      name="firstName"
                      defaultValue={this.state.firstName}
                      required
                      placeholder="" 
                      onChange={this.handleChange}
                      onBlur={this.props.handleValidation('firstName')}
                      type="text" />
                      {this.props.getValidationMessages('firstName').map(this.renderHelpText)}
                </div>

                <div className="input-field">
                    <label>Last Name</label>
                    <input 
                      ref="lastName"
                      name="lastName"
                      defaultValue={this.state.lastName}
                      required
                      placeholder="" 
                      onChange={this.handleChange}
                      onBlur={this.props.handleValidation('lastName')}
                      type="text" />
                      {this.props.getValidationMessages('lastName').map(this.renderHelpText)}
                    
                </div>

                <div className="input-field">
                    <label>Mobile Number</label>
                    <input 
                      ref="phoneNumber"
                      name="phoneNumber"
                      defaultValue={this.state.phoneNumber}
                      required
                      placeholder="" 
                      onChange={this.handleChange}
                      onBlur={this.props.handleValidation('phoneNumber')}
                      type="text" />
                      {this.props.getValidationMessages('phoneNumber').map(this.renderHelpText)}
                    
                </div>

                <div className="input-field">
                    <label>Email</label>
                    <input 
                      ref="emailAddress"
                      name="emailAddress"
                      defaultValue={this.state.emailAddress}
                      required
                      placeholder="" 
                      onChange={this.handleChange}
                      onBlur={this.props.handleValidation('emailAddress')}
                      type="emailAddress" />
                      {this.props.getValidationMessages('emailAddress').map(this.renderHelpText)}
                    
                </div>

                <div className="input-field"> 
                      <label>Location</label>     
                      <select
                        ref="location"
                        name="location"
                        defaultValue={this.state.location}
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
                      {this.props.getValidationMessages('location').map(this.renderHelpText)}
                </div>
                
            
            </form>
          </div>
        </div>

    )
  }
}



export default validation(strategy)(Step2)