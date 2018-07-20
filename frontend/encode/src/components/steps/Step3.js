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
    };

    this.validatorTypes = {
      techStack: Joi.array().items(Joi.string().required(), Joi.string().required()),
      currentJobTitle: Joi.string().required().label('Current job title'),
      
    };

    this.getValidatorData = this.getValidatorData.bind(this);
    this.renderHelpText = this.renderHelpText.bind(this);
    this.isValidated = this.isValidated.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  getValidatorData(e) {
    return {
      techStack: this.state.techStack
    }
  };

  handleTechChange(e) {
    let data = e.split(',')

    this.setState({ 
      techStack: data
    }) 
  }

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
      <div className="step step3">
      <TechStack 
        ref="techStack"
        name="techStack"
        required
        raiseData={this.handleTechChange}
        onBlur={this.props.handleValidation('techStack')}
        { ...this.state } />
        {this.props.getValidationMessages('techStack').map(this.renderHelpText)}
      </div>
    )
  }
}

export default validation(strategy)(Step3);