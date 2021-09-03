import styled from "styled-components";
import { Flex } from "../Box";

const StyledBottomNavItem = styled(Flex)`
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 5px 8px;
  background: ${({ theme }) => theme.bottomNav.backgroundColor};
`;

export default StyledBottomNavItem;
