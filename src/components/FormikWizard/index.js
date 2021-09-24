import { Formik } from "formik";
import Wizard from "./Wizard";
import StepsList from "./StepsList";
import Step from "./Step";
import ButtonsList from "./ButtonsList";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";

function App({ components, initialValues }) {
  return (
    <Formik initialValues={initialValues}>
      {(formik) => {
        const getValidators = (validatorFuncs) =>
          validatorFuncs.map((func) => () => func({ ...formik }));
        return (
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
        );
      }}
      {/* <DisplayFormikState {...props} /> */}
    </Formik>
  );
}

// const WithFormikApp = withFormik(App);

export default App;
