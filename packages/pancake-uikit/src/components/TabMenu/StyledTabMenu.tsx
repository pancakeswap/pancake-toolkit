import styled from "styled-components";
import Flex from "../Box/Flex";

const StyledTabMenu = styled(Flex)`
  /* display: inline-flex; */
  border-bottom: 2px solid ${({ theme }) => theme.colors.textSubtle};
  padding: 0 16px;

  & > button + button {
    margin-left: 4px;
  }
`;

export default StyledTabMenu;
