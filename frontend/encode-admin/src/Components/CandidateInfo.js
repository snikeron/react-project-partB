import React, {Component, Fragment} from 'react';
import { DotLoader } from 'react-spinners'
import candidateAPI from '../api/Candidate'
import './Encode-Admin.css'


export default class CandidateInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            candidate: null
        }
    }


    componentDidMount() {
        candidateAPI.fetchOneCandidate(this.props._id)
        .then(candidate => {
            this.setState({
                candidate
            })
        })
        .catch((err) => {
            console.error(err)
        })   
    }

    render() {
        const {candidate} = this.state
        if(!candidate) {
            return <DotLoader />
        }

        const {
            firstName,
            lastName,
            currentJobTitle,
            CurrentEmployer,
            phoneNumber,
            techStack,
            location,
            emailAddress,
            roleType,
            responsibilities,
            priority,
            expectedCompany,
            minSalary,
            expectedJobTitle,
            expectedRoleType,
            contactSource,
            clientNotes,
            personalNotes,
            resumeUrl
        } = candidate

        return <Fragment>
            <div className="orange-box">
                <p>Firstname</p>
                <p><strong>{firstName}</strong></p>
                <p>Lastname</p>
                <p><strong>{lastName}</strong></p>
                <p>Mobile Number</p>
                <a href={"tel:" + phoneNumber}><strong>{phoneNumber}</strong></a> 
                <p>Email</p>
                <p><strong>{emailAddress}</strong></p>
                <p>Location</p>
                <p><strong>{location}</strong></p>
            </div>

            <div className="orange-box">
                <p>Current Job Title</p>
                <p><strong>{currentJobTitle}</strong></p>
                <p>Current Employer</p>
                <p><strong>{CurrentEmployer}</strong></p>
                <p>Are you in a contract or permanet role?</p>
                <p><strong>{roleType}</strong></p>
                <p>What are your day-to-day responsibilities?</p>
                <p><strong>{responsibilities}</strong></p>
                <p>Tech Stack</p>
                <ul>
                    <strong>
                        {techStack.map((tech, index) => {
                            return <li key={index}>{tech.toUpperCase()}</li>
                        })}
                    </strong>    
                </ul>
            </div>

            <div className="orange-box">
                <p>Please rank in order of importance for yourself the following criteria: </p>
                <ol>
                    <strong>
                        {priority.map((priority, index) => {
                            return <li key={index}>{priority}</li>
                        })}
                    </strong>
                </ol>

                <p>What type of company would you like to work in next? </p>
                <ul>
                    <strong>
                        {expectedCompany.map((expectedCompany, index) => {
                            return <li key={index}>{expectedCompany}</li>
                        })}
                    </strong>
                </ul>

                <p>What is your minimum salary expectation?</p>
                <p><strong>{'$' +  minSalary + ",000" }</strong></p>
                
                <p>Expected Job Title</p>
                <p><strong>{expectedJobTitle}</strong></p>

                <p>What role are you looking for:</p>
                <p><strong>{expectedRoleType}</strong></p>
                <p>How did you hear about Encode Talent Management?</p>
                <p><strong>{contactSource}</strong></p>
                
                {/* THE DOWNLOAD RESUME BUTTON goes here */}
                {/* <p>Download resume:</p>
                <button className = "resume-button" {resumeUrl} > </button>  */}
                
            </div>
           
            {/* THIS SECTION IS FOR SIMON TO ADD NOTES FOR THE CANDIDATE AND FOR HIMSELF */}
            <div className = "orange-box">
                <p> Notes for client: </p>
                <textarea> </textarea>  
                <p> Notes for Myself: </p>
                <textarea></textarea>
            </div> 

            <div>
                {/* EXPORT AS CSV GOES HERE */}
                {/* THE BACK BUTTON GOES HERE */}
            </div>

        </Fragment>
    }

}



