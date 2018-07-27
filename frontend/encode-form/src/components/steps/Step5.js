import React, { Component } from 'react'
import axios from 'axios'

export default class Step5 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.getData(),
      saving: false,
    }
    
    this.isValidated = this.isValidated.bind(this)

  }

  componentWillMount = () => {
    window.scrollTo(0,0)
  }

  // This review screen has the 'Confirm and Submit' button, on clicking, isValidated() is called
  isValidated() {
    // typically this method needs to return true or false (to indicate if the local forms are validated, so StepZilla can move to the next step),
    // In the case of async validation or server saving etc. return a Promise and StepZilla will wait
    // ... for the resolve() to work out if we can move to the next step

    // ASYNC return (server side validation or saving data to server etc).. you need to return a Promise which can resolve like so:
    // resolve(): validation/save has passed. Move to next step.
    // reject(): validation/save failed. Stay on current step

    this.setState({
      saving: true
    })

    const candidateData = {
      ...this.props.getData(),
      clientNotes: "", 
      personalNotes: "", 
      resumeUrl: null,
      isActive: true
    }



    if (this.state.fileCV) {
      // returns this Promise if candidate inputs a file
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', this.state.fileCV[0]);
        
        // File gets posted first, and the resulting AWS link is stored in candidateData as resumeUrl
        axios.post(`https://encode-backend.now.sh/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',

          }
        }).then(response => {
          candidateData.resumeUrl =  "https://encode-resumes.s3.amazonaws.com/" + response.data.key
          
          console.log('Successful Upload:\n' + candidateData.resumeUrl)     
          console.log(candidateData)
          
          // Once candidateData has been updated with resumeUrl, post entire data to backend
          return axios.post(`https://encode-backend.now.sh/candidates`, candidateData)
        }).then( (response) => {
          this.setState({
            saving: true
          })          

          this.props.updateData({
            savedToCloud: true
          })

          console.log('Candidate Data Saved')
          console.log(response)

          resolve()
        }).catch( (error) => {
        console.log('Saving Candidate Data Failed')
        console.error(error)      

        reject()
      })
      })} else {
        // No file input by candidate -- post candidateData to backend
        return new Promise((resolve, reject) => {
          console.log(candidateData)
          axios.post(`https://encode-backend.now.sh/candidates`, candidateData)
            .then( (response) => {
              this.setState({
                saving: true
              })          

              this.props.updateData({
                savedToCloud: true
              })

              console.log('Candidate Data Saved')
              console.log(response)

              resolve()
            })
            .catch( (error) => {
              console.error('Saving Candidate Data Failed')
              console.error(error)

              reject()
            })
        }) 
      }
  };
  
      

  render() {

    const savingCls = this.state.saving ? 'saving' : 'hide'
    let fileStat;

    const { 
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      location,
      techStack,
      currentJobTitle,
      currentEmployer,
      roleType,
      responsibilities,
      priority,
      expectedJobTitle,
      expectedCompany,
      minSalary,
      expectedRoleType,
      contactSource,
      fileCV
    } = this.state

    if (techStack) {
      var myTechStack = techStack.map((tech, i) => 
        <li className="list" key={i}>{tech}</li>
    )
    }
    
    const myPriority = priority.map((priorityItem, i) => 
        <li className="list" key={i}>{priorityItem.content}</li>
    )

    if (expectedCompany) {
      var myExpectedCompany = expectedCompany.map((company, i) => 
        <li className="list" key={i}>{company}</li>
    )
    }
    
    if (fileCV) {
      fileStat = <strong>Yes</strong>
    } else {
      fileStat = <strong>No</strong>
    }
    

    return (

      <div className="step step5">

        <h2>Review</h2>
        <div className="flex-container">

          <div className="flex-item displayBlock">
                <div className="displayField">
                  <p className="labelField">First Name</p>
                  <p className="resultField">{firstName}</p>
                </div>

                <div className="displayField">
                  <p className="labelField">Last Name</p>
                  <p className="resultField">{lastName}</p>
                </div>

                <div className="displayField">
                  <p className="labelField">Mobile Number</p>
                  <p className="resultField">{phoneNumber}</p>
                </div>

                <div className="displayField">
                  <p className="labelField">Email</p>
                  <p className="resultField">{emailAddress}</p>
                </div>

                <div className="displayField">
                  <p className="labelField">Location</p>
                  <p className="resultField">{location}</p>
                </div>
          </div>
          <div className="flex-item displayBlock">
                <div className="displayField">
                  <p className="labelField">Current Job Title</p>
                  <p className="resultField">{currentJobTitle}</p>
                </div>

                <div className="displayField">
                  <p className="labelField">Current Employer</p>
                  <p className="resultField">{currentEmployer}</p>
                </div>

                <div className="displayField">
                  <p className="labelField">Current Role</p>
                  <p className="resultField">{roleType}</p>
                </div>

                <div className="displayField">
                  <p className="labelField">Day-to-Day Responsibilities</p>
                  <p className="resultField">{responsibilities}</p>
                </div>

                <div className="displayField">
                  <p className="labelField">Technologies</p>
                  <p className="resultField"><ul>{techStack ? myTechStack : null }</ul></p>
                </div>

                <div className="displayField">
                  <p className="labelField">Resume Uploaded?</p>
                  <p className="resultField">{fileStat}</p>
                </div>
          </div>

          <div className="flex-item displayBlock">
                <div className="displayField">
                  <p className="labelField">Order of Importance</p>
                  <p className="resultField"><ol>{myPriority}</ol></p>
                </div>

                <div className="displayField">
                  <p className="labelField">Type of roles like to be contacted about</p>
                  <p className="resultField">{expectedJobTitle}</p>
                </div>

                <div className="displayField">
                  <p className="labelField">Type of company like to work in next</p>
                  <p className="resultField"><ul>{expectedCompany ? myExpectedCompany : null }</ul></p>
                </div>

                <div className="displayField">
                  <p className="labelField">Minimum salary expectation</p>
                  <p className="resultField">${minSalary}K</p>
                </div>

                <div className="displayField">
                  <p className="labelField">You are looking for:</p>
                  <p className="resultField">{expectedRoleType} Role</p>
                </div>

                <div className="displayField">
                  <p className="labelField">How did you hear about Encode Talent Management?</p>
                  <p className="resultField">{contactSource}</p>
                </div>
          </div>

          <p className={savingCls}>Sending in progress, please wait ...</p>
        
        </div>       
      </div>
    )


  }
}
