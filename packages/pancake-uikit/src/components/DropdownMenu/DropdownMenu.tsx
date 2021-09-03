/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { Link } from "react-router-dom";
import isTouchDevice from "../../util/isTouchDevice";
import { LinkStatus } from "../../widgets/Menu/components/MenuEntry";
import { Box } from "../Box";
import { DropdownMenuDivider, DropdownMenuItem, StyledDropdownMenu } from "./styles";
import { DropdownMenuItemType, DropdownMenuProps } from "./types";

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, items = [], ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const hideTimeout = useRef<number>();
  const isHoveringOverTooltip = useRef(false);
  const hasItems = items.length > 0;
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    placement: "bottom-start",
    modifiers: [{ name: "offset", options: { offset: [0, 0] } }],
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
        setIsOpen((prevOpen) => !prevOpen);
      } else if (isTouchingTooltipRef) {
        // Don't close the menu immediately so it catches the event
        setTimeout(() => {
          setIsOpen(false);
        }, 100);
      } else {
        setIsOpen(false);
      }
    };

    if (isTouchDevice()) {
      document.addEventListener("touchstart", toggleTouch);
    } else {
      targetRef?.addEventListener("mouseenter", showTooltip);
      targetRef?.addEventListener("mouseleave", hideTooltip);
      tooltipRef?.addEventListener("mouseenter", showTooltip);
      tooltipRef?.addEventListener("mouseleave", hideTooltip);
    }

    return () => {
      if (isTouchDevice()) {
        document.removeEventListener("touchstart", toggleTouch);
      } else {
        targetRef?.removeEventListener("mouseenter", showTooltip);
        targetRef?.removeEventListener("mouseleave", hideTooltip);
        tooltipRef?.removeEventListener("mouseenter", showTooltip);
        tooltipRef?.removeEventListener("mouseleave", hideTooltip);
      }
    };
  }, [targetRef, tooltipRef, hideTimeout, isHoveringOverTooltip, setIsOpen]);

  return (
    <Box ref={setTargetRef} {...props}>
      <Box>{children}</Box>
      {hasItems && (
        <StyledDropdownMenu style={styles.popper} ref={setTooltipRef} {...attributes.popper} isOpen={isOpen}>
          {items.map(
            ({ type = DropdownMenuItemType.INTERNAL_LINK, label, href = "/", status, ...itemProps }, index) => {
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
                <>
                  {type === DropdownMenuItemType.BUTTON && (
                    <DropdownMenuItem type="button" {...itemProps} key={index}>
                      {MenuItemContent}
                    </DropdownMenuItem>
                  )}
                  {type === DropdownMenuItemType.INTERNAL_LINK && (
                    <DropdownMenuItem as={Link} to={href} {...itemProps} key={index}>
                      {MenuItemContent}
                    </DropdownMenuItem>
                  )}
                  {type === DropdownMenuItemType.EXTERNAL_LINK && (
                    <DropdownMenuItem as="a" href={href} target="_blank" {...itemProps} key={index}>
                      {MenuItemContent}
                    </DropdownMenuItem>
                  )}
                  {type === DropdownMenuItemType.DIVIDER && <DropdownMenuDivider key={index} />}
                </>
              );
            }
          )}
        </StyledDropdownMenu>
      )}
    </Box>
  );
};

export default DropdownMenu;
