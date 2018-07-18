import React, { Component } from 'react'
import StepZilla from 'react-stepzilla'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'
import Step6 from './steps/Step6'
import './Form.css'

export default class CandidateForm extends Component {
    constructor(props) {
      super(props)
      this.state = {}
  
      this.candidateData = {
        savedToCloud: false
      };
    }
  
    componentDidMount() {}
  
    getData() {
      return this.candidateData;
    }
  
    updateData(update) {
      this.candidateData = {
        ...this.candidateData,
        ...update,
      }
    }
  
    render() {
      const steps =
      [
        {name: 'Welcome', component: <Step1 getData={() => (this.getData())} updateData={(u) => {this.updateData(u)}} />},
        {name: 'Contact Details', component: <Step2 getData={() => (this.getData())} updateData={(u) => {this.updateData(u)}} />},
        {name: 'Current Status', component: <Step3 getData={() => (this.getData())} updateData={(u) => {this.updateData(u)}} />},
        {name: 'Aspirations', component: <Step4 getData={() => (this.getData())} updateData={(u) => {this.updateData(u)}} />},
        {name: 'Review', component: <Step5 getData={() => (this.getData())} updateData={(u) => {this.updateData(u)}} />},
        {name: 'Thank You', component: <Step6 getData={() => (this.getData())} updateData={(u) => {this.updateData(u)}} />}
      ]
  
      return (
        <div className='flex-container'>
        <div className='candidateForm'>
          <div className='step-progress'>
            <StepZilla
              steps={steps}
              preventEnterSubmission={true}
              nextTextOnFinalActionStep={"Save"}
            //   hocValidationAppliedTo={[3]}
              startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
              onStepChange={(step) => window.sessionStorage.setItem('step', step)}
             />
          </div>
        </div>
        </div>
      )
    }
  }
  