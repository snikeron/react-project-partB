import React, {Fragment} from 'react';
import CandidateCard from './CandidateCard'
import candidateAPI from '../api/Candidate'
import TechStack from './widgets/TechStack'
import SalarySlider from './widgets/SalarySlider'
import './Encode-Admin.css'



export default class CandidateList extends React.Component {
    state = {
        candidates: [],
        searchedCandidates: [],
        displayedCandidates: [],
        keyword: '',
        techStack: [],
        location: 'All',
        minSalary: 200,
        sortBy: 'new-old'
    }

    componentWillMount() {
        candidateAPI.fetchCandidates()
        .then(candidates => {
            this.setState({ candidates })
            this.setState({ displayedCandidates: candidates})
        })
        .catch(err => console.error(err))          
    }

    showAllCandidates = () => {
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
                this.setState({ displayedCandidates: candidates})
                this.setState({ searchedCandidates: candidates})
            })
            .then( () => {
                if (this.state.keyword === "") {
                    this.setState({ displayedCandidates: this.state.candidates})
                }
            })
            .catch(err => console.error(err)) 
        }) 
    }

    handleTechChange = (e) => {
        let data = e.split(',')

        this.setState({
            techStack: data
        }, () => {
            candidateAPI.fetchSearchedCandidatesByTech(this.state)
            .then(candidates => {
                this.setState({ displayedCandidates: candidates})
                this.setState({ searchedCandidates: candidates})
            })
            .then( () => {
                if (this.state.techStack === []) {
                    this.setState({ displayedCandidates: this.state.candidates})
                }
            })
            .catch(err => console.error(err)) 
        })

    }

    


    handleLocationChange = (e) => {

        this.setState({
            location: e.target.value
        }, () => {
            candidateAPI.fetchSearchedCandidatesByLocation(this.state)
            .then(candidates => {
                this.setState({ displayedCandidates: candidates})
                this.setState({ searchedCandidates: candidates})
            })
            .then( () => {
                if (this.state.location === "All") {
                    this.setState({ displayedCandidates: this.state.candidates})
                }
            })
            .catch(err => console.error(err)) 
        }) 
      }

    handleSalaryChange = (data) => {

        let filteredResult = []

        if (this.state.keyword) {
            const {searchedCandidates} = this.state
            filteredResult = searchedCandidates.filter( candidate =>
                candidate.minSalary <= data
            )
        } else {
            const {candidates} = this.state
            filteredResult = candidates.filter( candidate =>
                candidate.minSalary <= data
            )
        }

        this.setState({
            displayedCandidates: filteredResult
        })

        this.setState({
            minSalary: data
        })
    }

    

    render() {
        return (
            <div className="large-container">
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
                                    <option value="All">Search: All Locations</option>
                                    <option value="Melbourne">Melbourne</option>
                                    <option value="Adelaide">Adelaide</option>
                                    <option value="Brisbane">Brisbane</option>
                                    <option value="Canberra">Canberra</option>
                                    <option value="Hobart">Hobart</option>                
                                    <option value="Sydney">Sydney</option>
                                    <option value="Perth">Perth</option>
                                </select>
                            </div>

                            <div className="input-field tech-height">
                                <TechStack 
                                    ref="techStack"
                                    name="techStack"
                                    required
                                    raiseData={this.handleTechChange}
                                    />
                            </div>

                            <div className="input-field">
                                <label><strong>Filter by:</strong> <br />
                                Minimum salary expectation:</label>
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

                            
                        </form>
                    </div>
                </div>


             <div className="flex-container">
                    <div className="flex-item-small">
                            <button onClick={this.showAllCandidates} className="menu">Show all candidates</button>
                    </div>
                </div>
   
                 <div className="cand-container">
                        {this.state.displayedCandidates.reverse().map(candidate => <CandidateCard key={candidate._id} {...candidate} />)}
                    
                 </div>      

        </div>
        )
    }
}