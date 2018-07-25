import React, {Fragment} from 'react';
import CandidateCard from './CandidateCard'
import candidateAPI from '../api/Candidate'
import TechStack from './widgets/TechStack'
import './Encode-Admin.css'



export default class CandidateList extends React.Component {
    state = {
        candidates: [],
        keyword: '',
        techStack: [],
        location: '',
        minSalary: 0,
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

    handleLocationChange =(e) => {
        let newState = {}
        newState[e.target.name] = e.target.value
        this.setState(newState)
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
                            
                            <div className="input-field">
                                <TechStack 
                                    ref="techStack"
                                    name="techStack"
                                    required
                                    raiseData={this.handleTechChange}
                                    />
                            </div>
                            
                            <div className="input-field">    
                                <select
                                    ref="location"
                                    name="location"
                                    defaultValue={this.state.location}
                                    autoComplete="off"
                                    required
                                    value={this.state.location}
                                    onChange={this.handleLocationChange}
                                    >
                                    <option value="" disabled selected>Location</option>
                                    <option value={"Melbourne"}>Melbourne</option>
                                    <option value={"Adelaide"}>Adelaide</option>
                                    <option value={"Brisbane"}>Brisbane</option>
                                    <option value={"Canberra"}>Canberra</option>
                                    <option value={"Hobart"}>Hobart</option>                
                                    <option value={"Sydney"}>Sydney</option>
                                    <option value={"Perth"}>Perth</option>
                                </select>
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