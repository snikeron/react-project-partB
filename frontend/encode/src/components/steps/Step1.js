import React, { Component } from 'react'

export default class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}


  render() {
    return (
      <div className="step step1">
      <div className="row">
          <form id="Form" className="form-horizontal">
            <div className="form-group">
                <h4>Encode Talent</h4>
                <h5>Candidate Profile Form</h5>
                <div className="col s8 offset-s2">
                  <p>
                    Hi there, your information is protected by our privacy policy.
                    If you consent to Encode Talent collecting your information for the sole purposes of our recruitment process, click "Next".
                  </p>
                </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
