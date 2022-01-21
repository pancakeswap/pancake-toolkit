import styled from "styled-components";
import { flexbox } from "styled-system";
import Box from "./Box";
import { FlexProps } from "./types";

const Flex = styled(Box)<FlexProps>`
  ${flexbox}
`;

Flex.defaultProps = {
  display: "flex",
};

export default Flex;
