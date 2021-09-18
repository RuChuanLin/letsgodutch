import styled from "styled-components";
import { Button as _Button } from "antd";
import { colors } from "../../utils/colors";

const StyledButton = styled(_Button)`
`;

const Button = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
