import React, {Fragment} from 'react';
import CandidateCard from './CandidateCard'
import './CandidateList.css'
import candidateAPI from '../api/Candidate'
import { DotLoader } from 'react-spinners'



export default class CandidateList extends React.Component {
    state = {
        candidates: null
    }

    componentDidMount() {
        candidateAPI.fetchCandidates()
        .then(candidates => {
            
            this.setState({ candidates });
        })
        .catch(err => {
            console.log('error')
            console.log(err.message)
            console.error(err)
        })
    }

    render() {
        const {candidates} = this.state

        if(!candidates){
            return <DotLoader />
        } 
        
        return (                        
            <Fragment>
                        {this.state.candidates.map(candidate => <CandidateCard key={candidate._id} {...candidate} />)}
            </Fragment> 
        )
    }
}