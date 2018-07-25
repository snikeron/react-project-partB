import React, {Fragment} from 'react';
import CandidateCard from './CandidateCard'
import candidateAPI from '../api/Candidate'
import TechStack from './widgets/TechStack'
import SalarySlider from './widgets/SalarySlider'
import './Encode-Admin.css'



export default class CandidateList extends React.Component {
    state = {
        candidates: [],
        displayedCandidates: [],
        keyword: '',
        techStack: [],
        location: '',
        minSalary: 0,
        query: {}
    }

    componentWillMount() {
        candidateAPI.fetchCandidates()
        .then(candidates => {
            this.setState({ candidates })
            this.setState({ displayedCandidates: candidates})
        })
        .catch(err => console.error(err))          
    }

    handleKeywordChange = () => {

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

    handleSalaryChange = (data) => {

        const {candidates} = this.state
        const filteredResult = candidates.filter( candidate =>
            candidate.minSalary >= data
        )

        this.setState({
            displayedCandidates: filteredResult
        })

        // this.setState({
        //   minSalary: data
        // })
    }

    handleLocationChange = (e) => {
        let newState = {}
        newState[e.target.name] = e.target.value
        this.setState(newState)
      }

    handleQuery = (e) => {

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
                                onChange={this.handleKeywordChange}
                                type="text" /> 
                            </div>

                            <div className="input-field min-input-height">    
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

                            <div className="input-field">
                                <label>Minimum salary expectation:</label>
                                <div className="slider-container">
                                    <SalarySlider 
                                    min={0} 
                                    max={200} 
                                    defaultValue={this.state.minSalary} 
                                    value={this.state.minSalary}
                                    raiseData={this.handleSalaryChange}
                                    />
                                </div>
                            </div>
                            
                            <div className="input-field tech-height">
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

                {this.state.displayedCandidates.reverse().map(candidate => <CandidateCard key={candidate._id} {...candidate} />)}
            </Fragment> 
        )
    }
}