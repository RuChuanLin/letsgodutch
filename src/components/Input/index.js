import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../utils/colors";
import Text from "../../components/Text";

const Wrapper = styled.div`
  width: ${(props) => props.width}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > * {
    display: flex;
  }
`;

const StyledInput = styled.input`
  outline: none;
  cursor: pointer;
  width: 155px;
  height: 36px;
  border-radius: 8px;
  border: 2px ${(props) => (props.value ? colors.white : colors.getGray(0.2))}
    solid;
  padding-left: 4px;
  font-size: ${(props) => props.fontSize}px;
  transition: 0.2s ease-in-out;
  &:hover {
    border: 2px ${colors.getGray(0.25)} solid;
    background-color: ${colors.getGray(0.15)};
  }
  &:focus {
    background-color: ${colors.white};
    border: 2px ${colors.primaryBackgroundLight} solid;
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const InputNumber = ({ textSetting = {}, width = 275 }) => {
  const [value, setValue] = useState(0);
  const { usingText = true, content = "River" } = textSetting;
  return (
    <Wrapper width={width}>
      {usingText ? <Text size={20}>{content}</Text> : <></>}
      <StyledInput
        type="number"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder="enter something"
        fontSize={20}
      ></StyledInput>
    </Wrapper>
  );
};

export default InputNumber;
