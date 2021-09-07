/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { Link } from "react-router-dom";
import isTouchDevice from "../../util/isTouchDevice";
import { LinkStatus } from "../../widgets/Menu/components/MenuEntry";
import { Box } from "../Box";
import { DropdownMenuDivider, DropdownMenuItem, StyledDropdownMenu } from "./styles";
import { DropdownMenuItemType, DropdownMenuProps } from "./types";

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  isBottomNav = false,
  items = [],
  openMenuTimeout = 0,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const hideTimeout = useRef<number>();
  const isHoveringOverTooltip = useRef(false);
  const hasItems = items.length > 0;
  const clickTimeRef = useRef(0);
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    placement: isBottomNav ? "top" : "bottom-start",
    modifiers: [{ name: "offset", options: { offset: [0, isBottomNav ? 6 : 0] } }],
  });

  /**
   * See "useTooltip"
   */
  useEffect(() => {
    const showTooltip = (evt: MouseEvent | TouchEvent) => {
      setIsOpen(true);

      if (evt.target === targetRef) {
        clearTimeout(hideTimeout.current);
      }

      if (evt.target === tooltipRef) {
        isHoveringOverTooltip.current = true;
      }
    };

    const hideTooltip = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node;
      return target && !tooltipRef?.contains(target) && setIsOpen(false);
    };

    const toggleTouch = (evt: TouchEvent) => {
      const target = evt.target as Node;
      const isTouchingTargetRef = target && targetRef?.contains(target);
      const isTouchingTooltipRef = target && tooltipRef?.contains(target);

      if (isTouchingTargetRef) {
        if (isOpen || openMenuTimeout === 0) {
          setIsOpen((prevOpen) => !prevOpen);
        }
      } else if (isTouchingTooltipRef) {
        // Don't close the menu immediately so it catches the event
        setTimeout(() => {
          setIsOpen(false);
        }, 100);
      } else {
        setIsOpen(false);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      const isTouchingTargetRef = target && targetRef?.contains(target);

      if (isTouchingTargetRef) {
        clickTimeRef.current = e.timeStamp;

        setTimeout(() => {
          if (clickTimeRef.current > 0) setIsOpen(true);
        }, openMenuTimeout);
      }
    };

    const handlePointerUp = () => {
      clickTimeRef.current = 0;
    };

    if (isTouchDevice()) {
      document.addEventListener("touchstart", toggleTouch);
      if (openMenuTimeout > 0) {
        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("pointerup", handlePointerUp);
      }
    } else {
      targetRef?.addEventListener("mouseenter", showTooltip);
      targetRef?.addEventListener("mouseleave", hideTooltip);
      tooltipRef?.addEventListener("mouseenter", showTooltip);
      tooltipRef?.addEventListener("mouseleave", hideTooltip);
    }

    return () => {
      if (isTouchDevice()) {
        document.removeEventListener("touchstart", toggleTouch);
        if (openMenuTimeout > 0) {
          document.removeEventListener("pointerdown", handlePointerDown);
          document.removeEventListener("pointerup", handlePointerUp);
        }
      } else {
        targetRef?.removeEventListener("mouseenter", showTooltip);
        targetRef?.removeEventListener("mouseleave", hideTooltip);
        tooltipRef?.removeEventListener("mouseenter", showTooltip);
        tooltipRef?.removeEventListener("mouseleave", hideTooltip);
      }
    };
  }, [targetRef, tooltipRef, hideTimeout, isHoveringOverTooltip, setIsOpen, openMenuTimeout, isOpen]);

  return (
    <Box ref={setTargetRef} {...props}>
      <Box>{children}</Box>
      {hasItems && (
        <StyledDropdownMenu
          style={styles.popper}
          ref={setTooltipRef}
          {...attributes.popper}
          $isBottomNav={isBottomNav}
          $isOpen={isOpen}
        >
          {items.map(
            (
              { type = DropdownMenuItemType.INTERNAL_LINK, label, href = "/", status, isActive = false, ...itemProps },
              index
            ) => {
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
              return (
                <div key={index}>
                  {type === DropdownMenuItemType.BUTTON && (
                    <DropdownMenuItem $isActive={isActive} type="button" {...itemProps}>
                      {MenuItemContent}
                    </DropdownMenuItem>
                  )}
                  {type === DropdownMenuItemType.INTERNAL_LINK && (
                    <DropdownMenuItem $isActive={isActive} as={Link} to={href} {...itemProps}>
                      {MenuItemContent}
                    </DropdownMenuItem>
                  )}
                  {type === DropdownMenuItemType.EXTERNAL_LINK && (
                    <DropdownMenuItem $isActive={isActive} as="a" href={href} target="_blank" {...itemProps}>
                      {MenuItemContent}
                    </DropdownMenuItem>
                  )}
                  {type === DropdownMenuItemType.DIVIDER && <DropdownMenuDivider />}
                </div>
              );
            }
          )}
        </StyledDropdownMenu>
      )}
    </Box>
  );
};

export default DropdownMenu;
