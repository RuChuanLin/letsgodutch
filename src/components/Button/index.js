import styled from "styled-components";
import { colors } from "../../utils/colors";

const StyledButton = styled.button`
  outline: none;
  height: 36px;
  min-width: 120px;
  border: 2px ${colors.primaryBackgroundDark} solid;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${colors.primaryBackground};
  color: ${colors.getGray(0.03)};

  &:hover {
    border: 2px ${colors.primaryBackground} solid;
    background-color: ${colors.primaryBackgroundLight};
    color: ${colors.getGray(0.08)};
    
  }
  transition: 0.5s cubic-bezier(0.23, 1, 0.320, 1);
`;

const Button = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};

export default Button;
