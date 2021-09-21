import FormikWizardProvider from "./index";
import withFormik from "./withFormik";
import Wizard from "./Wizard";
import StepsList from "./StepsList";
import Step from "./Step";
import ButtonsList from "./ButtonsList";
import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";

import AddressDetails from "./_AddressDetails";
import BasicDetails from "./_BasicDetails";
import ContactDetails from "./_ContactDetails";
// import React from "react";
// import {
//   FormikWizardProvider,
//   Wizard,
//   StepsList,
//   Step,
//   ButtonsList,
//   PreviousButton,
//   NextButton,
//   SubmitButton,
// } from "../../src";
// import { DisplayFormikState } from "./helper";
// import BasicDetails from "./BasicDetails";
// import ContactDetails from "./ContactDetails";
// import AddressDetails from "./AddressDetails";

function basicValidations({ errors }) {
  return !errors.firstName;
}

function contactValidations({ errors }) {
  return !errors.email;
}

function addressValidations({ errors }) {
  return !errors.addressLine1;
}

function App(props) {
  return (
    <div className="App">
      <FormikWizardProvider {...props}>
        {({ getValidators, ...otherProps }) => (
          <Wizard {...otherProps}>
            <StepsList
              validators={getValidators([basicValidations, contactValidations, addressValidations])}
            >
              <Step component={BasicDetails} title="Basic Details" />
              <Step component={ContactDetails} title="Contact Details" />
              <Step component={AddressDetails} title="Address Details" />
            </StepsList>
            <ButtonsList>
              <PreviousButton />
              <NextButton />
              {/* <SubmitButton /> */}
            </ButtonsList>
          </Wizard>
        )}
      </FormikWizardProvider>
      {/* <DisplayFormikState {...props} /> */}
    </div>
  );
}

const WithFormikApp = withFormik(App);

export default WithFormikApp;
