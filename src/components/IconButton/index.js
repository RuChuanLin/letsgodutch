import styled from "styled-components";

const StyledButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 0px;
  cursor: pointer;
  margin: 20px;
  border-radius: 4px;
  transition: 1.9s cubic-bezier(0.075, 0.82, 0.165, 1);
  margin: 4px;
  &:hover {
    box-shadow: rgba(20, 20, 20, 0.4) 0px 0px 13px 2px;
  }
  &:active {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 4px 0px;
    background-color: rgba(99, 99, 99, 0.2);
  }
`;

const IconButton = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default IconButton;
