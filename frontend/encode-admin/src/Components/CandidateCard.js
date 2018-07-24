import React from 'react'
import './CandidateCard.css'
import { Link } from 'react-router-dom'

export default function CandidateCard({
    _id,
    firstName,
    lastName,
    currentJobTitle,
    location,
    phoneNumber
}) {
    return <div className="candidate">
            <Link to={`/candidates/${_id}`}>  
                <div className="candidate-details">
                    <h3>{firstName} {lastName}</h3>
                    <h4>{currentJobTitle}</h4>
                    <p>{location}</p> 
                </div>
            </Link>
        <a className="call-icon" href={"tel:" + phoneNumber}><span>&#x2706;</span></a> 
        </div>
}

