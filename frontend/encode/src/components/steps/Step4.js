import React, { Component } from 'react'
import validation from 'react-validation-mixin'
import strategy from 'joi-validation-strategy'
import Joi from 'joi'
import Preference from './widgets/Preference'

class Step4 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      priority: props.getData().priority,
      expectedJobTitle: props.getData().expectedJobTitle,
      expectedCompany: props.getData().expectedCompany,
      minSalary: props.getData().minSalary,
      expectedRoleType: props.getData().expectedRoleType,
      contactSource: props.getData().contactSource,
    }

    this.validatorTypes = {
      expectedJobTitle: Joi.string().required().label('Types of Roles'),
      expectedCompany: Joi.string().required().label('Types of Companies'),
      minSalary: Joi.string().email().required().label('Minimum Salary Expectation'),
      expectedRoleType: Joi.string().required().label('Contract Role Types'),
      contactSource: Joi.string().required().label('Source')
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

        if (this.props.getData().priority !== this.getValidatorData().priority ||
            this.props.getData().expectedJobTitle !== this.getValidatorData().expectedJobTitle ||
            this.props.getData().expectedCompany!== this.getValidatorData().expectedCompany ||
            this.props.getData().minSalary !== this.getValidatorData().minSalary ||
            this.props.getData().expectedRoleType !== this.getValidatorData().expectedRoleType ||
            this.props.getData().contactSource !== this.getValidatorData().contactSource ) { // only update data if something changed
            
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
      priority: this.refs.priority.value,
      expectedJobTitle: this.refs.expectedJobTitle.value,
      expectedCompany: this.refs.expectedCompany.value,
      minSalary: this.refs.minSalary.value,
      expectedRoleType: this.refs.expectedRoleType.value,
      contactSource: this.refs.contactSource.value
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
                    <label>Please rank in order of importance for
                      yourself the following criteria: </label>
                    <div className="flex-container">
                      <Preference 
                      refs/>
                    </div>
                </div>

                <div className="input-field">
                    <label>What type of roles would you like to be
                          contacted about?</label>
                    <input 
                      ref="expectedJobTitle"
                      name="expectedJobTitle"
                      defaultValue={this.state.expectedJobTitle}
                      required
                      placeholder="" 
                      onChange={this.handleChange}
                      onBlur={this.props.handleValidation('expectedJobTitle')}
                      type="text" />
                      {this.props.getValidationMessages('expectedJobTitle').map(this.renderHelpText)}
                </div>

                <div className="input-field">
                    <label>What type of company would you like to
                            work in next? </label>
                    
                </div>

                <div className="input-field">
                    <label>What is your minimum salary expectation?</label>
                    
                </div>

                <div className="input-field">
                    <label>Are you looking for:</label>
                    <select
                        ref="expectedRoleType"
                        name="expectedRoleType"
                        defaultValue={this.state.expectedRoleType}
                        autoComplete="off"
                        required
                        value={this.state.expectedRoleType}
                        onChange={this.handleChange}
                        onBlur={this.validationCheck}>
                        >
                        <option value="" disabled selected>Please select role type</option>
                        <option value={"Contract"}>Contract</option>
                        <option value={"Permanent"}>Permanent</option>
                        <option value={"Either"}>Either</option>
                      </select>
                      {this.props.getValidationMessages('expectedRoleType').map(this.renderHelpText)}
                </div>

                <div className="input-field">
                    <label>How did you hear about Encode Talent Management?</label>
                    
                </div>
                
            
            </form>
          </div>
        </div>

    )
  }
}



export default validation(strategy)(Step4)