import PropTypes from "prop-types";
import { useTransition, animated } from "react-spring";

const Step = ({ isActive, component, direction, ...props }) => {
  console.log(direction);
  const transition = useTransition(isActive, {
    enter: { x: 0, y: 0, opacity: 1 },
    from: { x: direction === 1 ? 500 : -500, y: -20, opacity: 0 },
    leave: { x: direction === 1 ? -500 : 500, y: -20, opacity: 0 },
  });

  return transition((style, item) =>
    item ? <animated.div style={{ position : 'absolute', ...style}}>{component(props)}</animated.div> : <></>
  );
};

Step.propTypes = {
  isActive: PropTypes.bool,
  component: PropTypes.func,
};

Step.displayName = "Step";

export default Step;
