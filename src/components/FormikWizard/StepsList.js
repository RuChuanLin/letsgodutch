import React, { Children, cloneElement, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  position: relative;
  height: 200px;
`;

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
    const { activeStepIndex, children, direction, ...formik } = props;
    const stepTabs = [];
    const newChildren = Children.map(children, (child, index) => {
      if (child.props.title) {
        stepTabs.push({ title: child.props.title });
      }
      return cloneElement(child, {
        isActive: index === activeStepIndex,
        formik,
        direction,
      });
    });
    return newChildren;
  };

  return <Wrapper>{getStepChildren()}</Wrapper>;
};

StepsList.propTypes = {
  activeStepIndex: PropTypes.number,
  updateStepTabs: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

StepsList.displayName = "StepsList";

export default StepsList;
