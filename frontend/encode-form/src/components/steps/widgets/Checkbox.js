import React, { Component} from 'react'

class Checkbox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isChecked: this.props.isChecked,
    }

  }
  
  toggleCheckboxChange = () => {
    const { handleCheckboxChange, id, type } = this.props

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ))

    handleCheckboxChange(id, type, this.state.isChecked)
  }

  render() {
    const { type } = this.props
    const { isChecked } = this.state

    return (
      <div>
        <label className={isChecked ? "checkbox checked" : "checkbox" }>
          {type}
          <input
            type="checkbox"
            value={type}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    )
  }
}



export default Checkbox