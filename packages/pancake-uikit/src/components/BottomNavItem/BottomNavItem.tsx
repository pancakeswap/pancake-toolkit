import React, { PointerEvent, useRef } from "react";
import { useHistory } from "react-router-dom";
import MAX_TIME_PRESSED from "../BottomNav/constants";
import { Flex } from "../Box";
import AnimatedIconComponent from "../Svg/AnimatedIconComponent";
import { StyledBottomNavItem, StyledBottomNavText } from "./styles";
import { BottomNavItemProps } from "./types";

const BottomNavItem: React.FC<BottomNavItemProps> = ({ label, iconName, href, isActive = false, ...props }) => {
  const history = useHistory();
  const clickTimeRef = useRef(0);

  const handlePointerDown = (e: PointerEvent) => {
    clickTimeRef.current = e.timeStamp;
  };

  const handlePointerUp = (e: PointerEvent) => {
    const timePressed = e.timeStamp - clickTimeRef.current;
    if (timePressed < MAX_TIME_PRESSED) history.push(href);
  };

  return (
    <StyledBottomNavItem
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      type="button"
      key={label}
      isActive={isActive}
      {...props}
    >
      <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%">
        {iconName && (
          <AnimatedIconComponent
            iconName={iconName}
            height="19px"
            width="20px"
            color={isActive ? "secondary" : "textSubtle"}
            isActive={isActive}
            activeBackgroundColor="backgroundAlt"
          />
        )}
        <StyledBottomNavText
          color={isActive ? "text" : "textSubtle"}
          fontWeight={isActive ? "600" : "400"}
          fontSize="10px"
        >
          {label}
        </StyledBottomNavText>
      </Flex>
    </StyledBottomNavItem>
  );
};

export default BottomNavItem;
