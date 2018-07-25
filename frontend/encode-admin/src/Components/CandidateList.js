import React, {Fragment} from 'react';
import CandidateCard from './CandidateCard'
import candidateAPI from '../api/Candidate'
import TechStack from './widgets/TechStack'
import './Encode-Admin.css'



export default class CandidateList extends React.Component {
    state = {
        candidates: [],
        keyword: '',
        location: '',
        minSalary: 0,
        techStack: [],
        query: {}
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
            keyword: this.search.value
        }, () => {
            candidateAPI.fetchSearchedCandidates(this.state)
            .then(candidates => {
                this.setState({ candidates });
            })
            .catch(err => console.error(err)) 
        }) 
    }

    handleTechChange = (e) => {
        let data = e.split(',')
    
        this.setState({ 
          techStack: data
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
                            <div className="input-tech-field">
                                <TechStack 
                                    ref="techStack"
                                    name="techStack"
                                    required
                                    raiseData={this.handleTechChange}
                                    />
                            </div>



                        </form>

                        <p><b>Search for:</b> {this.state.keyword}</p>
                    </div>

                </div>

                {this.state.candidates.map(candidate => <CandidateCard key={candidate._id} {...candidate} />)}
            </Fragment> 
        )
    }
}