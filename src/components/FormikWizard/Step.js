import PropTypes from "prop-types";
import { useTransition, animated } from "react-spring";

const getX = (direction, actionPara) => 300 * direction * actionPara;

const Step = ({ isActive, component, direction, ...props }) => {
  const y = direction === 0 ? 50 : -20;
  const transition = useTransition(isActive, {
    enter: { x: 0, y: 0, opacity: 1 },
    from: { x: getX(direction, 1), y, opacity: 0 },
    leave: { x: getX(direction, -1), y, opacity: 0 },
  });

  return transition((style, item) =>
    item ? (
      <animated.div style={{ position: "absolute", ...style }}>{component(props)}</animated.div>
    ) : (
      <></>
    )
  );
};

Step.propTypes = {
  isActive: PropTypes.bool,
  component: PropTypes.func,
  direction: PropTypes.number
};

Step.displayName = "Step";

export default Step;
