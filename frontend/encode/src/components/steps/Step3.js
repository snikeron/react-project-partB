import React, { Component } from 'react'
import TechStack from './widgets/TechStack';
// import PropTypes from 'prop-types';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';

class Step3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      techStack: props.getData().techStack,
      currentJobTitle: props.getData().currentJobTitle,
      currentEmployer: props.getData().currentEmployer,
    };

    this.validatorTypes = {
      techStack: Joi.array().items(Joi.string().required(), Joi.string().required()),
      currentJobTitle: Joi.string().required().label('Current Job Title'),
      currentEmployer: Joi.string().required().label('Current Employer'),
      
    };

    this.getValidatorData = this.getValidatorData.bind(this);
    this.renderHelpText = this.renderHelpText.bind(this);
    this.isValidated = this.isValidated.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleTechChange = this.handleTechChange.bind(this);

  }

  

  isValidated() {
    return new Promise((resolve, reject) => {
      this.props.validate((error) => {
        if (error) {
          reject(); // form contains errors
          return;
        }

        if (this.props.getData().techStack !== this.state.techStack) { // only update store if something changed
          console.log(this.state)
          this.props.updateData({
            ...this.state,
            savedToCloud: false 
          });  
        }

        resolve(); // form is valid, fire action
      });
    });
  }

  getValidatorData() {
    return {
      techStack: this.state.techStack,
      currentJobTitle: this.refs.currentJobTitle.value,
      currentEmployer: this.refs.currentEmployer.value,
    }
  };

  handleTechChange(e) {
    let data = e.split(',')

    this.setState({ 
      techStack: data
    }) 
  }

  handleFormChange(e) {
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
                    <label>Current Job Title</label>
                    <input 
                      ref="currentJobTitle"
                      name="currentJobTitle"
                      defaultValue={this.state.currentJobTitle}
                      required
                      placeholder="" 
                      onChange={this.handleFormChange}
                      onBlur={this.props.handleValidation('currentJobTitle')}
                      type="text" />
                      {this.props.getValidationMessages('currentJobTitle').map(this.renderHelpText)}
                </div>       
                
                <div className="input-field">
                    <label>Current Employer</label>
                    <input 
                      ref="currentEmployer"
                      name="currentEmployer"
                      defaultValue={this.state.currentEmployer}
                      required
                      placeholder="" 
                      onChange={this.handleFormChange}
                      onBlur={this.props.handleValidation('currentEmployer')}
                      type="text" />
                      {this.props.getValidationMessages('currentEmployer').map(this.renderHelpText)}
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
                        onChange={this.handleForm}
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
                
                <div className="input-tech-field">
                  <TechStack 
                    ref="techStack"
                    name="techStack"
                    required
                    raiseData={this.handleTechChange}
                    onBlur={this.props.handleValidation('techStack')}
                    { ...this.state } />
                  {this.props.getValidationMessages('techStack').map(this.renderHelpText)}
                </div>
            
            </form>
          </div>
        </div>

      
    )
  }
}

export default validation(strategy)(Step3);