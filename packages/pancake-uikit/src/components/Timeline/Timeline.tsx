import React from "react";
import { Colors, lightColors } from "../../theme";
import { Flex } from "../Box";
import IconComponent from "../Svg/IconComponent";
import { Text } from "../Text";
import InfoTooltip from "./InfoTooltip";
import { TimelineContainer, TimelineEvent } from "./styles";
import { TimelineProps, EventStatus } from "./types";

type getTextColorProps = {
  eventStatus: EventStatus;
  useDark: boolean;
};

const getTextColor = ({ eventStatus, useDark }: getTextColorProps): keyof Colors => {
  if (eventStatus === "upcoming") return useDark ? "textDisabled" : (lightColors.textDisabled as keyof Colors);
  if (eventStatus === "live") return "success";
  return useDark ? "textSubtle" : (lightColors.textSubtle as keyof Colors);
};

const Timeline: React.FC<TimelineProps> = ({ events, useDark = true }) => {
  return (
    <TimelineContainer>
      {events.map(({ text, status, altText, infoText }) => {
        const isUpcoming = status === "upcoming";
        const isLive = status === "live";
        const isPast = status === "past";
        return (
          <TimelineEvent key={text} $useDark={useDark}>
            <Flex mr="10px" alignItems="center">
              {isUpcoming && (
                <IconComponent iconName="CircleOutline" color={useDark ? "textDisabled" : lightColors.textDisabled} />
              )}
              {isLive && <IconComponent iconName="Logo" />}
              {isPast && (
                <IconComponent iconName="CheckmarkCircleFill" color={useDark ? "textSubtle" : lightColors.textSubtle} />
              )}
            </Flex>
            <Text color={getTextColor({ eventStatus: status, useDark })} bold>
              {text}
            </Text>
            {altText && (
              <Text color="warning" ml="2px" bold>
                {altText}
              </Text>
            )}
            {infoText && (
              <InfoTooltip text={infoText} ml="10px" iconColor={useDark ? "textSubtle" : lightColors.textSubtle} />
            )}
          </TimelineEvent>
        );
      })}
    </TimelineContainer>
  );
};

export default Timeline;
