import styled from "styled-components";
import Flex from "../Box/Flex";

const StyledTabMenu = styled(Flex)`
  display: inline-flex;
  border-bottom: 2px solid ${({ theme }) => theme.colors.textSubtle};
`;

export default StyledTabMenu;
