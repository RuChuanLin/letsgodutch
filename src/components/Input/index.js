import styled from "styled-components";

import Field from "./Field";
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
      <Field {...props}></Field>
    </Wrapper>
  );
};

export default InputItem;
