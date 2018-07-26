import React, { Component } from 'react'

export default class Step6 extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}


  render() {
    return (
      <div className="step step6">
         <h2>Thank You</h2>
          <div className="flex-container">
              <div className="flex-item displayBlock">
                <p>Thank you for completing the form. We shall be in touch shortly.</p>
                <p>You may now close the window.</p>
            </div>
          </div>
      </div>
    )
  }
}
