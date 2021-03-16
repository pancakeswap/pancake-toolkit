import styled from "styled-components";
import { TabMenuItemProps } from "./types";

const StyledTab = styled.div<TabMenuItemProps>`
  margin: 0 2px;
  padding: 8px 22px;
  border-radius: 16px 16px 0 0;
  color: ${({ theme, color }) => theme.colors[color]};
  background-color: ${({ theme, bgColor }) => theme.colors[bgColor]};
`;

export default StyledTab;
