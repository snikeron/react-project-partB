import React, {Fragment} from 'react';
import CandidateCard from './CandidateCard'
import candidateAPI from '../api/Candidate'
import './Encode-Admin.css'



export default class CandidateList extends React.Component {
    state = {
        candidates: []
    }

    componentDidMount() {
        candidateAPI.fetchCandidates()
        .then(candidates => {
            this.setState({ candidates });
        })
        .catch(err => console.error(err))
    }

    render() {
        return (                        
            <Fragment>
                        {this.state.candidates.map(candidate => <CandidateCard key={candidate._id} {...candidate} />)}
            </Fragment> 
        )
    }
}