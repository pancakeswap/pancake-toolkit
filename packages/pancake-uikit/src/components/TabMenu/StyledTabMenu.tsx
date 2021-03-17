import styled from "styled-components";
import Flex from "../Box/Flex";

const StyledTabMenu = styled(Flex)`
  justify-content: space-between;
  overflow-y: scroll;
  flex-grow: 1;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  & > button + button {
    margin-left: 4px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-grow: 0;
  }
`;

export default StyledTabMenu;
