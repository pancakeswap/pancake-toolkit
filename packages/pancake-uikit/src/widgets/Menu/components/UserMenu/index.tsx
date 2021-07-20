import React, { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import Flex from "../../../../components/Box/Flex";
import { ChevronDownIcon } from "../../../../components/Svg";
import isTouchDevice from "../../../../util/isTouchDevice";
import { UserMenuProps, variants } from "./types";
import MenuIcon from "./MenuIcon";

const StyledUserMenu = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 16px;
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  padding-left: 40px;
  padding-right: 8px;
  position: relative;
`;

const LabelText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: none;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 8px;
    margin-right: 4px;
  }
`;

const Menu = styled.div`
  background-color: ${({ theme }) => theme.card.background};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 16px;
  padding-bottom: 4px;
  padding-top: 4px;
  width: 280px;
  z-index: 101;
`;

const UserMenu: React.FC<UserMenuProps> = ({
  account,
  text,
  avatarSrc,
  variant = variants.DEFAULT,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const hideTimeout = useRef<number>();
  const isHoveringOverTooltip = useRef(false);
  const accountEllipsis = account ? `${account.substring(0, 2)}...${account.substring(account.length - 4)}` : null;
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    placement: "bottom-end",
    modifiers: [{ name: "offset", options: { offset: [0, 12] } }],
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
      if (hideTimeout.current) {
        window.clearTimeout(hideTimeout.current);
      }

      if (evt.target === tooltipRef) {
        isHoveringOverTooltip.current = false;
      }

      if (!isHoveringOverTooltip.current) {
        hideTimeout.current = window.setTimeout(() => {
          if (!isHoveringOverTooltip.current) {
            setIsOpen(false);
          }
        }, 100);
      }
    };

    if (targetRef) {
      if (isTouchDevice()) {
        targetRef.addEventListener("touchstart", showTooltip);
        targetRef.addEventListener("touchend", hideTooltip);
      } else {
        targetRef.addEventListener("mouseenter", showTooltip);
        targetRef.addEventListener("mouseleave", hideTooltip);
      }
    }

    if (tooltipRef) {
      tooltipRef.addEventListener("mouseenter", showTooltip);
      tooltipRef.addEventListener("mouseleave", hideTooltip);
    }

    return () => {
      if (targetRef) {
        targetRef.removeEventListener("touchstart", showTooltip);
        targetRef.removeEventListener("touchend", hideTooltip);
        targetRef.removeEventListener("mouseenter", showTooltip);
        targetRef.removeEventListener("mouseleave", hideTooltip);
      }

      if (tooltipRef) {
        tooltipRef.removeEventListener("mouseenter", showTooltip);
        tooltipRef.removeEventListener("mouseleave", hideTooltip);
      }
    };
  }, [targetRef, tooltipRef, hideTimeout, isHoveringOverTooltip, setIsOpen]);

  return (
    <>
      <StyledUserMenu ref={setTargetRef} {...props}>
        <MenuIcon avatarSrc={avatarSrc} variant={variant} />
        <LabelText title={text || account}>{text || accountEllipsis}</LabelText>
        <ChevronDownIcon color="text" width="24px" />
      </StyledUserMenu>
      {isOpen && children && (
        <Menu style={styles.popper} ref={setTooltipRef} {...attributes.popper}>
          {children}
        </Menu>
      )}
    </>
  );
};

export default UserMenu;
