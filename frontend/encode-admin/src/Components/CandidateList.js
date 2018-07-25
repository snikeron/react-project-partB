import React, {Fragment} from 'react';
import CandidateCard from './CandidateCard'
import candidateAPI from '../api/Candidate'
import './Encode-Admin.css'



export default class CandidateList extends React.Component {
    state = {
        candidates: [],
        query: '',
    }

    componentDidMount() {
        candidateAPI.fetchCandidates()
        .then(candidates => {
            this.setState({ candidates });
        })
        .catch(err => console.error(err))  
        
        
    }

    handleChange = () => {

        this.setState({
            query: this.search.value
        }, () => {
            candidateAPI.fetchSearchedCandidates(this.state)
            .then(candidates => {
                this.setState({ candidates });
            })
            .catch(err => console.error(err)) 
        }) 
    }
    

    render() {
        return (                        
            <Fragment>
                <div className="flex-container">
                    <div className="flex-item">
                        <form>
                            <div className="input-field">
                                <input 
                                ref={input => this.search = input}
                                name="searchKeyword"
                                placeholder="Search keyword..." 
                                onChange={this.handleChange}
                                type="text" /> 
                            </div>

                        </form>

                        <p><b>Search for:</b> {this.state.query}</p>
                    </div>
                </div>

                {this.state.candidates.map(candidate => <CandidateCard key={candidate._id} {...candidate} />)}
            </Fragment> 
        )
    }
}