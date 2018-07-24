import React, {Component, Fragment} from 'react';
import { DotLoader } from 'react-spinners'
import candidateAPI from '../api/Candidate'

import './CandidateInfo.css'

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
            techStack
        } = candidate

        return <Fragment>
            <div className="orange-box">
                <p>Firstname</p>
                <p><strong>{firstName}</strong></p>
                <p>Lastname</p>
                <p><strong>{lastName}</strong></p>
            </div>

            <div className="orange-box">
                <p>Current Job Title</p>
                <p><strong>{currentJobTitle}</strong></p>
                <p>Current Employer</p>
                <p><strong>{CurrentEmployer}</strong></p>
            </div>

            <div className="orange-box">
                <p>Tech Stack</p>
                <ul>
                {techStack.map((tech, index) => {
                    return <li key={index}>{tech.toUpperCase()}</li>
                })}
                </ul>
            </div>
        </Fragment>
    }

}



