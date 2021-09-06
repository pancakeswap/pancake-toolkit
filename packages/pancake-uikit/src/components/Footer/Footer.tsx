import React from "react";
import { baseColors, darkColors } from "../../theme/colors";
import SocialLinks from "./Components/SocialLinks";
import { Flex, Box } from "../Box";
import { Link } from "../Link";
import { StyledFooter, StyledIconMobileContainer, StyledList, StyledListItem, StyledToolsContainer } from "./styles";
import { FooterProps } from "./types";
import ThemeSwitcher from "./Components/ThemeSwitcher";
import LangSelector from "./Components/LangSelector";
import CakePrice from "../CakePrice/CakePrice";
import { LogoWithTextIcon, ArrowForwardIcon } from "../Svg";
import { Button } from "../Button";

const MenuItem: React.FC<FooterProps> = ({
  items,
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCakeLabel,
  ...props
}) => {
  return (
    <StyledFooter p={["45px 16px 84px 16px", null, "56px 40px 32px 40px"]} flexDirection="column" {...props}>
      <StyledIconMobileContainer display={["block", null, "none"]}>
        <LogoWithTextIcon isDark width="130px" />
      </StyledIconMobileContainer>
      <Flex
        order={[2, null, 1]}
        flexDirection={["column", null, "row"]}
        justifyContent="space-between"
        alignItems="flex-start"
        mb={["42px", null, "36px"]}
      >
        {items.map((item) => (
          <StyledList key={item.label}>
            <StyledListItem>{item.label}</StyledListItem>
            {item.items.map(({ label, href, isHighlighted = false }) => (
              <StyledListItem key={label}>
                <Link href={href} color={isHighlighted ? baseColors.warning : darkColors.text} bold={false}>
                  {label}
                </Link>
              </StyledListItem>
            ))}
          </StyledList>
        ))}
        <Box display={["none", null, "block"]}>
          <LogoWithTextIcon isDark width="160px" />
        </Box>
      </Flex>
      <SocialLinks order={[2]} mb={[null, null, "68px"]} />
      <StyledToolsContainer order={[1, null, 3]} flexDirection={["column", null, "row"]} justifyContent="space-between">
        <Flex order={[2, null, 1]}>
          <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
          <LangSelector currentLang={currentLang} langs={langs} setLang={setLang} />
        </Flex>
        <Flex order={[1, null, 2]} mb={["24px", null, "0"]} justifyContent="space-between" alignItems="center">
          <Box mr="20px">
            <CakePrice cakePriceUsd={cakePriceUsd} />
          </Box>
          <Button scale="sm" endIcon={<ArrowForwardIcon color="backgroundAlt" />}>
            {buyCakeLabel}
          </Button>
        </Flex>
      </StyledToolsContainer>
    </StyledFooter>
  );
};

export default MenuItem;
