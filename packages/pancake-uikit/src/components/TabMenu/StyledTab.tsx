import styled from "styled-components";
import { TabMenuItemProps } from "./types";

const StyledTab = styled.div<TabMenuItemProps>`
  margin: 0 2px;
  padding: 8px 22px;
  border-radius: 16px 16px 0 0;
  background-color: ${(props) => (props.isActive ? "red" : "blue")};
`;

export default StyledTab;
