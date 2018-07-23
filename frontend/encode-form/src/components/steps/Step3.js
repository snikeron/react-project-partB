import React, { Component } from 'react'
import TechStack from './widgets/TechStack';
// import PropTypes from 'prop-types';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi-browser';

class Step3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      techStack: props.getData().techStack,
      currentJobTitle: props.getData().currentJobTitle,
      currentEmployer: props.getData().currentEmployer,
      roleType: props.getData().roleType,
      responsibilities: props.getData().responsibilities,
    };

    this.validatorTypes = {
      techStack: Joi.array().items(Joi.string().required(), Joi.string().required()),
      currentJobTitle: Joi.string().required().label('Current Job Title'),
      currentEmployer: Joi.string().required().label('Current Employer'),
      roleType: Joi.string().required().label('Role Type'),
      responsibilities: Joi.string().required().label('Current Responsibilities'),
      
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

        // only update store if something changed
        if (this.props.getData().techStack !== this.state.techStack) { 
          this.props.updateData({
            // ...this.state,
            ...this.getValidatorData(),
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
      roleType: this.refs.roleType.value,
      responsibilities: this.refs.responsibilities.value,

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
              <label>Role Type</label>     
              <select
                ref="roleType"
                name="roleType"
                defaultValue={this.state.roleType}
                autoComplete="off"
                required
                value={this.state.roleType}
                onChange={this.handleFormChange}
                onBlur={this.validationCheck}>
                >
                <option value="" disabled selected>Please select</option>
                <option value={"Permanent"}>Permanent</option>
                <option value={"Contract"}>Contract</option>
              </select>
              {this.props.getValidationMessages('roleType').map(this.renderHelpText)}
            </div>

            <div className="input-field">
              <label>What are your current responsibilities?</label>
              <textarea 
                ref="responsibilities"
                name="responsibilities"
                defaultValue={this.state.responsibilities}
                required
                placeholder="" 
                onChange={this.handleFormChange}
                onBlur={this.props.handleValidation('responsibilities')}
                type="text" />
                {this.props.getValidationMessages('responsibilities').map(this.renderHelpText)}
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