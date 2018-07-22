import React, { Component} from 'react'

class Checkbox extends Component {

  state = {
    isChecked: this.props.isChecked
  }
  
  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ))

    handleCheckboxChange(label)
  }

  render() {
    const { label } = this.props
    const { isChecked } = this.state

    return (
      <div className="checkbox-container">
        <label className={isChecked ? "checkbox checked" : "checkbox" }>
          {label}
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />
          <span class="checkmark"></span>
        </label>
      </div>
    )
  }
}



export default Checkbox