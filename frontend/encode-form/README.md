# Proto-README

Deployment: [https://build-hdesqggarf.now.sh/](https://build-hdesqggarf.now.sh/)

## Introduction

## Challenges

### Working Across States

Within the app are 3 levels of states:

1. CandidateForm
   - state holds final candidate data to be submitted
2. StepZilla
   - library that handles multi-step form and verification
3. There are 6 steps in the form. Steps 2 - 4 are where users will input data which gets saved within the state in the Step component. 
    1. **Step1** - Welcome Message
    2. **Step2** - Personal Contact Info
    3. **Step3** - Current Job Situation
    4. **Step4** - Aspirations
    5. **Step5** - Review & Submit
    6. **Step6** - Confirmation Message
  
  When the user clicks "Next" in each step, the data gets validated and if successful, the data is elevated and appended to CandidateForm's state, and the next Step is rendered
  
  We encountered issues with passing data from the Step states up to CandidateForm at the end of each step which were mainly attributed to our lack of knowledge of the *react-stepzilla* library and how it handled validations. However once these were overcome, we were quickly able to build the rest of the form.

### Build Issue

joi-validation-strategy used to validate forms had a dependency "hoek" that could not be minified during build

#### Solution

1. Replaced CRA's default react-scripts with the below:
  [https://www.npmjs.com/package/@jdcrensh/react-scripts](https://www.npmjs.com/package/@jdcrensh/react-scripts)
2. Installed [https://www.npmjs.com/package/react-scripts-plugin-no-minify](https://www.npmjs.com/package/react-scripts-plugin-no-minify)
3. Added a file "cra.config.js" to project root with the following code:

  ```js
  module.exports = {
    plugins: ['no-minify'],
  };
  ```
4. Run **yarn build dev**
