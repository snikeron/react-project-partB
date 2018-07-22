import React, { Component } from 'react'
import validation from 'react-validation-mixin'
import strategy from 'joi-validation-strategy'
import Joi from 'joi'
import Preference from './widgets/Preference'
import Checkbox from './widgets/Checkbox'

const companyTypes = [
  'Enterprise Companies',
  'Start Ups',
  'Consultancies',
  'Small Businesses',
  'Technology Companies',
  'Not For Profits',
  'Government',
  'Education',
  'Utilities',
  'Telecommunications'
]

const sources = [
  'LinkedIn',
  'Word of Mouth',
  'Direct contact from us',
  'Google',
  'Other'
]

class Step4 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      priority: props.getData().priority,
      expectedJobTitle: props.getData().expectedJobTitle,
      expectedCompany: props.getData().expectedCompany,
      // minSalary: props.getData().minSalary,
      expectedRoleType: props.getData().expectedRoleType,
      contactSource: props.getData().contactSource,
    }

    this.validatorTypes = {
      priority: Joi.array(),
      expectedJobTitle: Joi.string().required().label('Types of Roles'),
      expectedCompany: Joi.array().items(Joi.string().required()).label('Types of Companies'),
      // minSalary: Joi.string().email().required().label('Minimum Salary Expectation'),
      expectedRoleType: Joi.string().required().label('Contract Role Types'),
      contactSource: Joi.array().items(Joi.string().required()).label('Source')
    }

    this.getValidatorData = this.getValidatorData.bind(this)
    this.renderHelpText = this.renderHelpText.bind(this)
    this.isValidated = this.isValidated.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePreferenceChange = this.handlePreferenceChange.bind(this)
    this.toggleCompanyTypesCheckbox = this.toggleCompanyTypesCheckbox.bind(this)
    this.toggleSourcesCheckbox = this.toggleSourcesCheckbox.bind(this)
  }

  componentWillMount = () => {
    this.selectedCompanies = new Set()
    this.selectedSources = new Set()
  }

  isValidated() {
    return new Promise((resolve, reject) => {
      this.props.validate((error) => {
        if (error) {
          reject() // form contains errors
          return
        }

        // Run validation over any data that gets updated 
        // Only update central stored state if something changed
        if (this.props.getData().priority !== this.state.priority ||
          this.props.getData().expectedJobTitle !== this.state.expectedJobTitle ||
          this.props.getData().expectedCompany!== this.state.expectedCompany ||
          // this.props.getData().minSalary !== this.getValidatorData().minSalary ||
          this.props.getData().expectedRoleType !== this.state.expectedRoleType ||
          this.props.getData().contactSource !== this.state.contactSource ) { 
          // only update data if something changed
            
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
      priority: this.state.priority,
      expectedJobTitle: this.refs.expectedJobTitle.value,
      expectedCompany: this.state.expectedCompany,
      // minSalary: this.refs.minSalary.value,
      expectedRoleType: this.refs.expectedRoleType.value,
      contactSource: this.state.contactSource
    }
  }

  toggleCompanyTypesCheckbox = label => {

    if (this.selectedCompanies.has(label)) {
      this.selectedCompanies.delete(label);
    } else {
      this.selectedCompanies.add(label);
    }

    const companies = []

    for (const checkbox of this.selectedCompanies) {
      companies.push(checkbox)
    }
  
    this.setState({
      expectedCompany: companies
    })
    
  }

  createCompanyTypesCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCompanyTypesCheckbox}
      key={label}
    />
  )

  createCompanyTypesCheckboxes = () => (
    companyTypes.map(this.createCompanyTypesCheckbox)
  )


  toggleSourcesCheckbox = label => {

    if (this.selectedSources.has(label)) {
      this.selectedSources.delete(label);
    } else {
      this.selectedSources.add(label);
    }

    const sources = []

    for (const checkbox of this.selectedSources) {
      sources.push(checkbox)
    }
  
    this.setState({
      contactSource: sources
    })
    
  }

  createSourcesCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleSourcesCheckbox}
      key={label}
    />
  )

  createSourcesCheckboxes = () => (
    sources.map(this.createSourcesCheckbox)
  )

  handleChange(e) {
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  handlePreferenceChange(data) {
    this.setState({
      priority: data
    })
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

              {/* Drap & Drop for preferences */}
              <div className="input-field">
                <label>Please rank in order of importance for
                  yourself the following criteria: </label>
                <div className="flex-container">
                  <Preference 
                    ref="priority"
                    name="priority"
                    raiseData={this.handlePreferenceChange} 
                    {...this.state}/>
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
                  <div className="checkbox-container">
                    {this.createCompanyTypesCheckboxes()}
                    {this.props.getValidationMessages('expectedCompany').map(this.renderHelpText)}
                  </div>
              </div>

              {/* 
              <div className="input-field">
                  <label>What is your minimum salary expectation?</label>
                  
              </div>
              */}

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
                  <div className="checkbox-container">
                    {this.createSourcesCheckboxes()}
                    {this.props.getValidationMessages('contactSource').map(this.renderHelpText)}
                  </div>
              </div> 

                  
          </form>
        </div>
      </div>

  )
    
    
  }
}



export default validation(strategy)(Step4)