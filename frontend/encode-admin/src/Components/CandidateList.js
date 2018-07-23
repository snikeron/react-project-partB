import React from 'react';
import CandidateCard from './CandidateCard'
import './CandidateList.css'

import axios from 'axios';

export default class CandidateList extends React.Component {
    state = {
        candidates: []
    }

    componentDidMount() {
        axios.get(`https://backend-izuntatfte.now.sh/candidates`)
            .then(res => {
                const candidates = res.data;
                this.setState({ candidates });
                console.log(res);
            })
    }

    render() {
        return (
            <div className="candidate-list-wrapper">
                {this.state.candidates.map(candidate => <CandidateCard {...candidate} />)}
            </div>
        )
    }
}