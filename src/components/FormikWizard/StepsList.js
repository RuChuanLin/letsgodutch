import React, { Children, cloneElement, useEffect } from "react";
import PropTypes from "prop-types";
import { produce } from "immer";

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
    //   debugger
    const { activeStepIndex, children, ...otherProps } = props;
    const stepTabs = [];
    const newChildren = Children.map(children, (child, index) => {
      if (child.props.title) {
        stepTabs.push({ title: child.props.title });
      }
      return cloneElement(child, {
        isActive: index === activeStepIndex,
        ...otherProps,
      });
    });
    return newChildren;
  };

  return <div className="react-formik-wizard__step-page">a{getStepChildren()}b</div>;
};

StepsList.propTypes = {
  activeStepIndex: PropTypes.number,
  updateStepTabs: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

StepsList.displayName = "StepsList";

export default StepsList;
