/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { Link } from "react-router-dom";
import { useOnClickOutside } from "../../hooks";
import { Box, Flex } from "../Box";
import IconComponent from "../Svg/IconComponent";
import {
  DropdownMenuDivider,
  DropdownMenuItem,
  StyledDropdownMenu,
  LinkStatus,
  StyledDropdownMenuItemContainer,
} from "./styles";
import { DropdownMenuItemType, DropdownMenuProps } from "./types";

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  isBottomNav = false,
  showItemsOnMobile = false,
  activeItem = "",
  items = [],
  index,
  setMenuOpenByIndex,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const hasItems = items.length > 0;
  const { styles, attributes } = usePopper(targetRef?.current, tooltipRef.current, {
    strategy: "fixed",
    placement: isBottomNav ? "top" : "bottom-start",
    modifiers: [{ name: "offset", options: { offset: [0, isBottomNav ? 6 : 0] } }],
  });

  const isMenuShow = isOpen && ((isBottomNav && showItemsOnMobile) || !isBottomNav);

  useEffect(() => {
    const targetElement = targetRef.current;

    const showDropdownMenu = () => {
      setIsOpen(true);
    };

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node;
      return target && !tooltipRef?.current?.contains(target) && setIsOpen(false);
    };

    targetElement?.addEventListener("mouseenter", showDropdownMenu);
    targetElement?.addEventListener("mouseleave", hideDropdownMenu);

    return () => {
      targetElement?.removeEventListener("mouseenter", showDropdownMenu);
      targetElement?.removeEventListener("mouseleave", hideDropdownMenu);
    };
  }, [targetRef, tooltipRef, setIsOpen, isBottomNav]);

  useEffect(() => {
    if (setMenuOpenByIndex && index !== undefined) {
      setMenuOpenByIndex((prevValue) => ({ ...prevValue, [index]: isMenuShow }));
    }
  }, [isMenuShow, setMenuOpenByIndex, index]);

  useOnClickOutside(targetRef, () => {
    setIsOpen(false);
  });

  return (
    <Box ref={targetRef} {...props}>
      <Box
        onPointerDown={() => {
          setIsOpen((s) => !s);
        }}
      >
        {children}
      </Box>
      {hasItems && (
        <StyledDropdownMenu
          style={styles.popper}
          ref={tooltipRef}
          {...attributes.popper}
          $isBottomNav={isBottomNav}
          $isOpen={isMenuShow}
        >
          {items
            .filter((item) => !item.isMobileOnly)
            .map(({ type = DropdownMenuItemType.INTERNAL_LINK, label, href = "/", status, ...itemProps }, itemItem) => {
              const MenuItemContent = (
                <>
                  {label}
                  {status && (
                    <LinkStatus color={status.color} fontSize="14px">
                      {status.text}
                    </LinkStatus>
                  )}
                </>
              );
              const isActive = href === activeItem;
              return (
                <StyledDropdownMenuItemContainer key={itemItem}>
                  {type === DropdownMenuItemType.BUTTON && (
                    <DropdownMenuItem $isActive={isActive} type="button" {...itemProps}>
                      {MenuItemContent}
                    </DropdownMenuItem>
                  )}
                  {type === DropdownMenuItemType.INTERNAL_LINK && (
                    <DropdownMenuItem
                      $isActive={isActive}
                      as={Link}
                      to={href}
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      {...itemProps}
                    >
                      {MenuItemContent}
                    </DropdownMenuItem>
                  )}
                  {type === DropdownMenuItemType.EXTERNAL_LINK && (
                    <DropdownMenuItem
                      $isActive={isActive}
                      as="a"
                      href={href}
                      target="_blank"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      {...itemProps}
                    >
                      <Flex alignItems="center" justifyContent="space-between" width="100%">
                        {label}
                        <IconComponent iconName="Logout" />
                      </Flex>
                    </DropdownMenuItem>
                  )}
                  {type === DropdownMenuItemType.DIVIDER && <DropdownMenuDivider />}
                </StyledDropdownMenuItemContainer>
              );
            })}
        </StyledDropdownMenu>
      )}
    </Box>
  );
};

export default DropdownMenu;
