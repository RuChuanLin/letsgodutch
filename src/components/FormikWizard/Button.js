import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Tooltip } from "antd";

const WizardButton = ({ children, show, onClick, label, validator }) => {
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
        title={
          errorMsgs && (
            <ul>
              {errorMsgs.map((msg) => (
                <li key={msg}>{msg}</li>
              ))}
            </ul>
          )
        }
        color="#f50"
        visible={tooltipVisible}
        onVisibleChange={(visible) => setTooltipVisible(visible && disabledNext)}
      >
        <Button
          disabled={disabledNext}
          type="primary"
          onClick={!validator || validator.call(null) ? onClick : null}
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
  label: PropTypes.string,
  validator: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

WizardButton.displayName = "WizardButton";

export default WizardButton;
