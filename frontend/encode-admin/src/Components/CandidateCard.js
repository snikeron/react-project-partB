import React from 'react'
import './CandidateCard.css'

export default function CandidateCard({
    _id,
    firstName,
    lastName,
    currentJobTitle,
    location,
    phoneNumber
}) {
    return <div className="candidate">
       
       <div className="candidate-details">
            <h3>{firstName} {lastName}</h3>
            <h4>{currentJobTitle}</h4>
            <p>{location}</p>
        </div>
        <a className="call-icon" href={"tel:" + phoneNumber}><span>&#x2706;</span></a>
    </div>
}