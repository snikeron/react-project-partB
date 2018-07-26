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
  
      this.state = {
        companyTypes : [
          {id: 0, type: 'Enterprise Companies', isChecked: false},
          {id: 1, type: 'Start Ups', isChecked: false},
          {id: 2, type: 'Consultancies', isChecked: false},
          {id: 3, type: 'Small Businesses', isChecked: false},
          {id: 4, type: 'Technology Companies', isChecked: false},
          {id: 5, type: 'Not For Profits', isChecked: false},
          {id: 6, type: 'Government', isChecked: false},
          {id: 7, type: 'Education', isChecked: false},
          {id: 8, type: 'Utilities', isChecked: false},
          {id: 9, type: 'Telecommunications', isChecked: false}
        ],
        priority: [
          {
            id: "item-1",
            content: "Technologies"
          },
          {
            id: "item-2",
            content: "Salary"
          },
          {
            id: "item-3",
            content: "Location"
          },
          {
            id: "item-4",
            content: "Job Title"
          },
          {
            id: "item-5",
            content: "Role Responsibilities"
          },
          {
            id: "item-6",
            content: "Training and Professional Development"
          },
          {
            id: "item-7",
            content: "The Team"
          },
          {
            id: "item-8",
            content: "Office Environment"
          },
          {
            id: "item-9",
            content: "The Company’s Purpose and Products"
          },
          {
            id: "item-10",
            content: "Management"
          },
          {
            id: "item-11",
            content: "The Hours"
          },
          {
            id: "item-12",
            content: "Ability to work from home"
          },
          {
            id: "item-13",
            content: "Travel (work related as a consistent part of the role)"
          }
        ],
        minSalary: 65,
        expectedCompany: [],

        
        savedToCloud: false     
      }

    }
  
    getData() {
      return this.state;
    }
  
    updateData(update) {
      this.setState({
        ...this.state,
        ...update,
      })}
  
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
        <div className='flex-item flex-item-large'>
        <div className='candidateForm'>
          <div className='step-progress'>
            <StepZilla
              steps={steps}
              preventEnterSubmission={true}
              prevBtnOnLastStep={false}
              hocValidationAppliedTo={[1, 2, 3]}
              nextTextOnFinalActionStep={"Confirm & Submit"}
              nextButtonText={"Save & Next"}
              startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
              onStepChange={(step) => window.sessionStorage.setItem('step', step)}
             />
          </div>
        </div>
        </div>
        </div>
      )
    }
  }
  


