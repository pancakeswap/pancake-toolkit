import React, { useState } from "react";
import { Placement, Padding } from "@popperjs/core";
import { usePopper } from "react-popper";
import { StyledTooltip, Arrow } from "./StyledTooltip";
import { TooltipRefs, TriggerType } from "./types";

// TODO try non-string content
// TODO check how good auto works
// TODO: FineTune
const useTooltip = (
  content: string | React.ReactNode,
  placement: Placement = "auto",
  trigger: TriggerType = "hover",
  arrowPadding?: Padding,
  tooltipOffset?: [number | null | undefined, number | null | undefined]
): TooltipRefs => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipElement, setTooltipElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);

  const [visible, setVisible] = useState(false);

  // React guarantess that setState won't change on re-renders
  // https://reactjs.org/docs/hooks-reference.html#usestate
  // So it's not necessary to wrap setTooltipVisible in useCallaback
  // However, I found that plugging () => setTooltipVisible(false) into event listeners
  // produces decent amount of lag, especially if you click the button rapidly
  const hideTooltip = React.useCallback(() => {
    setVisible(false);
  }, []);

  const showTooltip = React.useCallback(() => {
    setVisible(true);
  }, []);

  // TODO perf test if use getLatest()?
  const toggleTooltip = React.useCallback(() => {
    if (visible) {
      hideTooltip();
    } else {
      showTooltip();
    }
  }, [visible, hideTooltip, showTooltip]);

  // Trigger = hover
  React.useEffect(() => {
    if (targetElement === null || trigger !== "hover") return undefined;

    targetElement.addEventListener("mouseenter", showTooltip);
    targetElement.addEventListener("mouseleave", hideTooltip);
    return () => {
      targetElement.removeEventListener("mouseenter", showTooltip);
      targetElement.removeEventListener("mouseleave", hideTooltip);
    };
  }, [trigger, targetElement, hideTooltip, showTooltip]);

  // Keep tooltip open when cursor moves from the targetElement to the tooltip
  React.useEffect(() => {
    if (tooltipElement === null || trigger !== "hover") return undefined;

    tooltipElement.addEventListener("mouseenter", showTooltip);
    tooltipElement.addEventListener("mouseleave", hideTooltip);
    return () => {
      tooltipElement.removeEventListener("mouseenter", showTooltip);
      tooltipElement.removeEventListener("mouseleave", hideTooltip);
    };
  }, [trigger, tooltipElement, hideTooltip, showTooltip]);

  // Trigger = click
  React.useEffect(() => {
    if (targetElement === null || trigger !== "click") return undefined;

    targetElement.addEventListener("click", toggleTooltip);

    return () => targetElement.removeEventListener("click", toggleTooltip);
  }, [trigger, targetElement, visible, toggleTooltip]);

  // Handle click outside
  // TODO: lags? lags seems to go away after useCallback
  React.useEffect(() => {
    if (trigger !== "click") return undefined;

    const handleClickOutside = ({ target }: Event) => {
      if (target instanceof Node) {
        if (
          tooltipElement != null &&
          targetElement != null &&
          !tooltipElement.contains(target) &&
          !targetElement.contains(target)
        ) {
          setVisible(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [trigger, targetElement, tooltipElement]);

  // Trigger = focus
  React.useEffect(() => {
    if (targetElement === null || trigger !== "focus") return undefined;

    targetElement.addEventListener("focus", showTooltip);
    targetElement.addEventListener("blur", hideTooltip);
    return () => {
      targetElement.removeEventListener("focus", showTooltip);
      targetElement.removeEventListener("blur", hideTooltip);
    };
  }, [trigger, targetElement, showTooltip, hideTooltip]);

  const { styles, attributes } = usePopper(targetElement, tooltipElement, {
    placement,
    modifiers: [
      {
        name: "arrow",
        options: { element: arrowElement, padding: arrowPadding || 16 },
      },
      { name: "offset", options: { offset: tooltipOffset || [0, 8] } },
    ],
  });

  const tooltip = (
    <StyledTooltip ref={setTooltipElement} style={styles.popper} {...attributes.popper}>
      {content}
      <Arrow ref={setArrowElement} style={styles.arrow} />
    </StyledTooltip>
  );
  return {
    targetRef: setTargetElement,
    tooltip,
    tooltipVisible: visible,
  };
};

export default useTooltip;
