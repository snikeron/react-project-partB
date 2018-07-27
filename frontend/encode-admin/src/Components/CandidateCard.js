import React from 'react'
import './Encode-Admin.css'
import { Link } from 'react-router-dom'

export default function CandidateCard({
    _id,
    firstName,
    lastName,
    currentJobTitle,
    location,
    phoneNumber
}) {
    return <div className="flex-container">
                <div className="candidate flex-item">
                    <Link to={`/candidates/${_id}`} style={{ textDecoration: 'none', color:'white' }}>  
                        <div className="candidate-details">
                            <h3 className="cand-name">{firstName} {lastName}</h3>
                            <h4>{currentJobTitle}</h4>
                            <p>{location}</p> 
                        </div>
                    </Link>
                    <a className="call-icon" href={"tel:" + phoneNumber}><span>&#x2706;</span></a> 
                </div>
            </div>
}

