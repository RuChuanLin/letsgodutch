import { Typography } from "antd";
import styled from "styled-components";

const StyledText = styled(Typography.Text)`
  font-size: ${(props) => props?.size}px;
`;

const Text = ({ size = 16, children }) => {
  return <StyledText size={size}>{children}</StyledText>;
};

export default Text;
