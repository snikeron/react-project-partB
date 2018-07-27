import React, {Component, Fragment} from 'react';
import { PacmanLoader } from 'react-spinners'
import candidateAPI from '../api/Candidate'
import './Encode-Admin.css'
import { CSVLink, CSVDownload } from 'react-csv';
import { Link } from 'react-router-dom'


export default class CandidateInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            candidate: null,
            personalNotes: null,
            clientNotes: null,
            updateConf: 'hide',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        candidateAPI.fetchOneCandidate(this.props._id)
        .then(candidate => {
            this.setState({
                candidate,
                personalNotes: candidate.personalNotes,
                clientNotes: candidate.clientNotes

            })
        })
        .catch((err) => {
            console.error(err)
        })   
    }

    handleSubmit(e) {
        e.preventDefault()
        candidateAPI.updateOneCandidate(this.props._id, this.state)
            .then(candidate => {
                this.setState({
                    candidate,
                    updateConf: 'success'
                })
                setTimeout(() => this.setState({updateConf: 'hide'}), 2000)
            })
            .catch((err) => {
                console.error(err)
                this.setState({
                    updateConf: 'fail'
                })
                setTimeout(() => this.setState({updateConf: 'hide'}), 2000)
            })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {candidate} = this.state
        let resumeButton;
        if(!candidate) {
            return <PacmanLoader/>
        }

        const updateConf = this.state.updateConf

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

        if (resumeUrl) {
            resumeButton = <a href={resumeUrl}><button className="info-button"> Download Resume </button> </a>  
        } else {
            resumeButton = <strong>None Provided</strong>
        }

        return <Fragment>
            <div className="info-container">
                <div className="orange-box">
                    <div>
                        <CSVLink data={data} style={{ textDecoration: 'none', color:'white' }}>
                            <button className="menu-back"> Download as CSV </button>
                        </CSVLink>
                    </div>
                    <p>Firstname</p>
                    <p><strong>{firstName}</strong></p>
                    <p>Lastname</p>
                    <p><strong>{lastName}</strong></p>
                    <p>Mobile Number</p>
                    <a href={"tel:" + phoneNumber}><strong>{phoneNumber}</strong></a> 
                    <p>Email</p>
                    <p><a href={"mailto:" + emailAddress}><strong>{emailAddress}</strong></a></p>
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
                                    
                    <p>Resume:</p>
                    {resumeButton}
                    
                </div>
               
                {/* THIS SECTION IS FOR SIMON TO ADD NOTES FOR THE CANDIDATE AND FOR HIMSELF */}
                <form className="orange-box" onSubmit={this.handleSubmit}>
                    <p> Notes for Client: </p>
                    <textarea name="clientNotes" onChange={this.handleChange} defaultValue={clientNotes}>
                    </textarea>  
    
                    <p> Notes for Myself: </p>
                    <textarea name="personalNotes" onChange={this.handleChange} defaultValue={personalNotes}>
                    </textarea>
    
                    <button type="submit" className="info-button"> Update Notes </button>
                    <p className={updateConf}> Notes Updated ! </p>
                    
                </form> 
            </div>
            
            <Link to={`/candidates/`} style={{ textDecoration: 'none', color:'white' }}>      
                <button className="menu-back"> Back </button>                   
            </Link>

        </Fragment>
    }

}



