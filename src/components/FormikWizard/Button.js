import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Tooltip } from "antd";
import colors from "../../utils/colors";

const WizardButton = ({ children, type, show, onClick, label, validator, ...props }) => {
  const errorMsgs = (validator && validator.call(null)?.errorMsgs) || [];
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const disabledNext = typeof validator === "function" && errorMsgs.length > 0;
  return show ? (
    children ? (
      React.cloneElement(children, {
        onClick: !validator || validator.call(null) ? onClick : null,
        disabled: typeof validator === "function" && !validator.call(null),
      })
    ) : (
      <Tooltip
        title={errorMsgs && <span>{errorMsgs?.[0]}</span>}
        color={colors.error}
        visible={tooltipVisible}
        onVisibleChange={(visible) => setTooltipVisible(visible && disabledNext)}
      >
        <Button
          disabled={disabledNext}
          type={type}
          onClick={!validator || validator.call(null) ? onClick : null}
          {...props}
        >
          {label || "Next"}
        </Button>
      </Tooltip>
    )
  ) : null;
};

WizardButton.defaultProps = {
  type: "button",
};

WizardButton.propTypes = {
  show: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  validator: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

WizardButton.displayName = "WizardButton";

export default WizardButton;
