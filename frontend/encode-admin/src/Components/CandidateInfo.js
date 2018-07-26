import React, {Component, Fragment} from 'react';
import { PacmanLoader} from 'react-spinners'
import candidateAPI from '../api/Candidate'
import './Encode-Admin.css'
import { CSVLink, CSVDownload } from 'react-csv';
import { Link } from 'react-router-dom'


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
            return <PacmanLoader/>
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
        
        const data = [
            {firstName, 
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
            resumeUrl } 

        ];

        return <Fragment>
            <div className="orange-box">
                <p>Firstname</p>
                <p><strong>{firstName}</strong></p>
                <p>Lastname</p>
                <p><strong>{lastName}</strong></p>
                <p>Mobile Number</p>
                <a href={"tel:" + phoneNumber}><strong>{phoneNumber}</strong></a> 
                <p>Email</p>
                <a href={"mailto:" + emailAddress}><strong>{emailAddress}</strong></a>
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
                
                <p>Resume (optional)</p>
                <a href={resumeUrl}>
                    <button> Download Resume </button>
                </a>  
            
            </div>
           
            <div className = "orange-box">
                <p> Notes for client: </p>
                <textarea> </textarea>            
                <p> Notes for Myself: </p>
                <textarea></textarea>
            </div> 

            <div>
                <CSVLink data={data} >Export as CSV file</CSVLink>
            </div>
            
            <Link to={`/candidates/`}>  
            <div>
                <button> Back </button>
            </div>
            </Link>

        </Fragment>
    }

}



