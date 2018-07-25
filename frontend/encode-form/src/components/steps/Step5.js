import React, { Component } from 'react';
import axios from 'axios';

export default class Step5 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: false
    };

    this.isValidated = this.isValidated.bind(this);
  }

  // This review screen had the 'Save' button, on clicking this is called
  isValidated() {
    // typically this method needs to return true or false (to indicate if the local forms are validated, so StepZilla can move to the next step),
    // but in this example we simulate an ajax request which is async. In the case of async validation or server saving etc. return a Promise and StepZilla will wait
    // ... for the resolve() to work out if we can move to the next step
    // So here are the rules:
    // ~~~~~~~~~~~~~~~~~~~~~~~~
    // SYNC action (e.g. local JS form validation).. if you return:
    // true/undefined: validation has passed. Move to next step.
    // false: validation failed. Stay on current step
    // ~~~~~~~~~~~~~~~~~~~~~~~~
    // ASYNC return (server side validation or saving data to server etc).. you need to return a Promise which can resolve like so:
    // resolve(): validation/save has passed. Move to next step.
    // reject(): validation/save failed. Stay on current step

    this.setState({
      saving: true,

    });

    const candidateData = {
      firstName: this.props.getData().firstName,
      lastName: this.props.getData().lastName,
      phoneNumber: this.props.getData().phoneNumber,
      emailAddress: this.props.getData().emailAddress,
      location: this.props.getData().location,
      currentJobTitle: this.props.getData().currentJobTitle,
      currentEmployer: this.props.getData().currentEmployer,
      roleType: this.props.getData().roleType,
      responsibilities: this.props.getData().responsibilities,
      minSalary: this.props.getData().minSalary, 
      expectedJobTitle: this.props.getData().expectedJobTitle, 
      expectedRoleType: this.props.getData().expectedRoleType, 
      techStack: this.props.getData().techStack,
      contactSource: "LinkedIn", // this.props.getData().contactSource, 
      clientNotes: "", 
      personalNotes: "", 
      priority: this.props.getData().priority,
      expectedCompany: this.props.getData().expectedCompany,
      resumeUrl: "https://resume.com/resume.pdf", // this.props.getData().resumeUrl,
      isActive: true,
    }
    // Utilising Promise to asynchronously post candidate data
    return new Promise((resolve, reject) => {
      axios.post('https://backend-izuntatfte.now.sh/candidates', candidateData)
        .then( (res) => {
          this.setState({
            saving: true
          });          
          this.props.updateData({
            savedToCloud: true
          });
          
          console.log(res);
          resolve();
        })
        .catch( (err) => {
          console.error(err);         
          reject();
        })
    });
  }

  // jumpToStep(toStep) {
  //   // We can explicitly move to a step (we -1 as its a zero based index)
  //   this.props.jumpToStep(toStep-1); // The StepZilla library injects this jumpToStep utility into each component
  // }

  render() {
    const savingCls = this.state.saving ? 'saving col-md-12 show' : 'saving col-md-12 hide';

    return (
      <div className="step step5 review">
        <div className="row">
          <form id="Form" className="form-horizontal">
            <div className="form-group">
              <label className="col-md-12 control-label">
                <h1>Step 4: Review your Details and Submit Form</h1>
              </label>
            </div>
            <div className="form-group">
              <div className="col-md-12 control-label">
                <div className="col-md-12 txt">
                  <div className="col-md-4">
                    Full Name
                  </div>
                  <div className="col-md-4">
                    {this.props.getData().firstName + this.props.getData().lastName}
                  </div>
                </div>
                <div className="col-md-12 txt">
                  <div className="col-md-4">
                    Email
                  </div>
                  <div className="col-md-4">
                    {this.props.getData().emailAddress}
                  </div>
                </div>
                <div className="col-md-12 txt">
                  <div className="col-md-4">
                    Location
                  </div>
                  <div className="col-md-4">
                    {this.props.getData().location}
                  </div>
                </div>
                <div className="col-md-12 txt">
                  <div className="col-md-4">
                    Tech Stack
                  </div>
                  <div className="col-md-4">
                    {this.props.getData().techStack}
                  </div>
                </div>
                <div className="col-md-12 txt">
                  <div className="col-md-4">
                    Minimum Salary
                  </div>
                  <div className="col-md-4">
                    {this.props.getData().minSalary}
                  </div>
                </div>
                {/* <div className="col-md-12 eg-jump-lnk">
                  <a href="#" onClick={() => this.jumpToStep(1)}>e.g. showing how we use the jumpToStep method helper method to jump back to step 1</a>
                </div> */}
                <h2 className={savingCls}>Saving to Cloud, please wait ...</h2>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}