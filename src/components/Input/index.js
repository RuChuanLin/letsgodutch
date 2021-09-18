import styled from "styled-components";

import StyledInput from "./StyledInput";
import Text from "../../components/Text";

const Wrapper = styled.div`
  width: ${(props) => props.width}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  & > * {
    display: flex;
  }
`;

const InputItem = (props) => {
  const { text = "", width = 275 } = props;
  return (
    <Wrapper width={width}>
      {text === "" ? <></> : <Text>{text}</Text>}
      <StyledInput {...props}></StyledInput>
    </Wrapper>
  );
};

export default InputItem;
