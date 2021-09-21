import withFormik from "./withFormik";

import {
  FormikWizardProvider,
  Wizard,
  StepsList,
  Step,
  ButtonsList,
  PreviousButton,
  NextButton,
  // SubmitButton,
} from "../../components/FormikWizard";

import SelectParticipants, { SelectParticipantsValidator } from "./SelectParticipants";
import RecordCost, { RecordCostValidator } from "./RecordCost";
import SelectPayer from "./SelectPayer";
import RecordOtherStuff from "./RecordOtherStuff";

function App(props) {
  const components = [SelectParticipants, RecordCost, SelectPayer, RecordOtherStuff];

  // return (
  //   <div className="App">
  //     <FormikWizardProvider {...props}>
  //       {({ getValidators, ...formik }) => (
  //         <Wizard {...formik}>
  //           <StepsList
  //             validators={getValidators(components.map(({ validate }) => validate || (() => true)))}
  //           >
  //             {components.map((component) => {
  //               <Step component={component} key={component.displayName}></Step>;
  //             })}

  return (
    <div className="App">
      <FormikWizardProvider {...props}>
        {({ getValidators, ...formik }) => (
          <Wizard {...formik}>
            <StepsList
              validators={getValidators(components.map(({ validate }) => validate || (() => true)))}
            >
              {components.map((c) => (
                <Step key={c.title} component={c}></Step>
              ))}
            </StepsList>
            <ButtonsList {...formik}>
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
