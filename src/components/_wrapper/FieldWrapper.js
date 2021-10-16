import styled from "styled-components";
import { Typography } from "antd";

const { Text } = Typography;

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

const FieldWrapper = ({ text = "", width = 275, children }) => (
  <Wrapper width={width}>
    {text === "" ? <></> : <Text>{text}</Text>}
    {children}
  </Wrapper>
);

export default FieldWrapper;
