import React, { Children, cloneElement, useEffect } from "react";
import PropTypes from "prop-types";

const StepsList = (props) => {
  useEffect(() => {
    const stepTabs = [];
    Children.forEach(props.children, (child) => {
      if (child.props.title) {
        stepTabs.push({ title: child.props.title });
      }
    });
    props.updateStepTabs(stepTabs);
  }, []);

  const getStepChildren = () => {
    const { activeStepIndex, children, ...formik } = props;
    const stepTabs = [];
    const newChildren = Children.map(children, (child, index) => {
      if (child.props.title) {
        stepTabs.push({ title: child.props.title });
      }
      return cloneElement(child, {
        isActive: index === activeStepIndex,
        formik,
      });
    });
    return newChildren;
  };

  return <div formik={props}>{getStepChildren()}</div>;
};

StepsList.propTypes = {
  activeStepIndex: PropTypes.number,
  updateStepTabs: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

StepsList.displayName = "StepsList";

export default StepsList;
