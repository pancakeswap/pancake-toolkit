import React from "react";
import styled from "styled-components";
import Input from "../../components/Input/Input";
import Text from "../../components/Text/Text";
import useTooltip from "./useTooltip";

const GridCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReferenceElement = styled.div`
  background-color: #1fc7d4;
  width: 160px;
  height: 160px;
  border-radius: 8px;
`;

const Container = styled.div`
  padding: 64px 120px;
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(4, 200px);
`;

export default {
  title: "Hooks/useTooltip",
};

export const Placement: React.FC = () => {
  // TOP
  const { targetRef: targetRefTopStart, tooltip: tooltipTopStart } = useTooltip("top-start", "top-start", "click");
  const { targetRef: targetRefTop, tooltip: tooltipTop } = useTooltip("top", "top", "click");
  const { targetRef: targetRefTopEnd, tooltip: tooltipTopEnd } = useTooltip("top-end", "top-end", "click");
  // LEFT
  const { targetRef: targetRefLeftStart, tooltip: tooltipLeftStart } = useTooltip("left-start", "left-start", "click");
  const { targetRef: targetRefLeft, tooltip: tooltipLeft } = useTooltip("left", "left", "click");
  const { targetRef: targetRefLeftEnd, tooltip: tooltipLeftEnd } = useTooltip("left-end", "left-end", "click");
  // RIGHT
  const { targetRef: targetRefRightStart, tooltip: tooltipRightStart } = useTooltip(
    "right-start",
    "right-start",
    "click"
  );
  const { targetRef: targetRefRight, tooltip: tooltipRight } = useTooltip("right", "right", "click");
  const { targetRef: targetRefRightEnd, tooltip: tooltipRightEnd } = useTooltip("right-end", "right-end", "click");
  // BOTTOM
  const { targetRef: targetRefBottomStart, tooltip: tooltipBottomStart } = useTooltip(
    "bottom-start",
    "bottom-start",
    "click"
  );
  const { targetRef: targetRefBottom, tooltip: tooltipBottom } = useTooltip("bottom", "bottom", "click");
  const { targetRef: targetRefBottomEnd, tooltip: tooltipBottomEnd } = useTooltip("bottom-end", "bottom-end", "click");

  return (
    <Container>
      <GridCell>
        <ReferenceElement ref={targetRefTopStart} />
        {tooltipTopStart}
      </GridCell>
      <GridCell>
        <ReferenceElement ref={targetRefTop} />
        {tooltipTop}
      </GridCell>
      <GridCell>
        <ReferenceElement ref={targetRefTopEnd} />
        {tooltipTopEnd}
      </GridCell>
      <GridCell>
        <ReferenceElement ref={targetRefLeftStart} />
        {tooltipLeftStart}
      </GridCell>
      <div />
      <GridCell>
        <ReferenceElement ref={targetRefRightStart} />
        {tooltipRightStart}
      </GridCell>
      <GridCell>
        <ReferenceElement ref={targetRefLeft} />
        {tooltipLeft}
      </GridCell>
      <div />
      <GridCell>
        <ReferenceElement ref={targetRefRight} />
        {tooltipRight}
      </GridCell>
      <GridCell>
        <ReferenceElement ref={targetRefLeftEnd} />
        {tooltipLeftEnd}
      </GridCell>
      <div />
      <GridCell>
        <ReferenceElement ref={targetRefRightEnd} />
        {tooltipRightEnd}
      </GridCell>
      <GridCell>
        <ReferenceElement ref={targetRefBottomStart} />
        {tooltipBottomStart}
      </GridCell>
      <GridCell>
        <ReferenceElement ref={targetRefBottom} />
        {tooltipBottom}
      </GridCell>
      <GridCell>
        <ReferenceElement ref={targetRefBottomEnd} />
        {tooltipBottomEnd}
      </GridCell>
      {/* <ReferenceElement ref={targetRefBottom}>
        <HelpIcon width="48px" />
      </ReferenceElement>
      {tooltipBottom}
      <ReferenceElement ref={targetRefBottomStart}>
        <HelpIcon width="48px" />
      </ReferenceElement>
      {tooltipBottomStart} */}
    </Container>
  );
};

export const Triggers: React.FC = () => {
  const { tooltipVisible: tooltipVisibleClick, targetRef: targetRefClick, tooltip: tooltipClick } = useTooltip(
    "You clicked me!",
    "right",
    "click"
  );
  const { tooltipVisible: tooltipVisibleHover, targetRef: targetRefHover, tooltip: tooltipHover } = useTooltip(
    "Hovering",
    "right",
    "hover"
  );

  const { tooltipVisible: tooltipVisibleFocus, targetRef: targetRefFocus, tooltip: tooltipFocus } = useTooltip(
    "You focused me!",
    "right",
    "focus"
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "300px",
        width: "200px",
        justifyContent: "space-evenly",
      }}
    >
      <div ref={targetRefClick}>
        <Input placeholder="click" />
        {tooltipVisibleClick && tooltipClick}
      </div>
      <div ref={targetRefHover}>
        <Input placeholder="hover" />
        {tooltipVisibleHover && tooltipHover}
      </div>
      <Input ref={targetRefFocus} placeholder="focus" />
      {tooltipVisibleFocus && tooltipFocus}
    </div>
  );
};

export const FineTuning: React.FC = () => {
  const { tooltipVisible: tooltipVisibleDefault, targetRef: targetRefDefault, tooltip: tooltipDefault } = useTooltip(
    "Just default tooltip",
    "top-start",
    "hover"
  );
  const {
    tooltipVisible: tooltipVisibleFineTuned,
    targetRef: targetRefFineTuned,
    tooltip: tooltipFineTuned,
  } = useTooltip("Didn't you know that 6 comes before 7?", "top-start", "hover", { right: 221 }, [0, -8]);
  return (
    <div style={{ width: "500px", height: "500px" }}>
      <Text fontSize="20px">Hover over inputs</Text>
      <Text bold>Default placement</Text>
      <Input ref={targetRefDefault} value="0x1234567890000" />
      {tooltipVisibleDefault && tooltipDefault}
      <Text bold>Fine tuned arrow placement</Text>
      <Input ref={targetRefFineTuned} value="0x1234576890000" />
      {tooltipVisibleFineTuned && tooltipFineTuned}
    </div>
  );
};

export const Flipping: React.FC = () => {
  const { targetRef, tooltip } = useTooltip("All tooltips flip automatically when you scroll", "top", "hover");
  return (
    <div style={{ padding: "200px", width: "500px", height: "2000px" }}>
      <ReferenceElement ref={targetRef} />
      {tooltip}
    </div>
  );
};
