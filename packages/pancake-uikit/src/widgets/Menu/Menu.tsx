import { noop } from "lodash";
import throttle from "lodash/throttle";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BottomNav from "../../components/BottomNav";
import { Box } from "../../components/Box";
import Flex from "../../components/Box/Flex";
import Footer from "../../components/Footer";
import MenuItems from "../../components/MenuItems/MenuItems";
import SubMenuItems from "../../components/SubMenuItems";
import { useMatchBreakpoints } from "../../hooks";
import CakePrice from "../../components/CakePrice/CakePrice";
import Logo from "./components/Logo";
import { MENU_HEIGHT, MOBILE_MENU_HEIGHT } from "./config";
import { NavProps } from "./types";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.nav.background};
  box-shadow: inset 0px -2px 0px -8px rgba(133, 133, 133, 0.1);
  z-index: 20;
  transform: translate3d(0, 0, 0);

  padding-left: 12px;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 16px;
    padding-right: 16px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 40px;
    padding-right: 40px;
  }
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
`;

const Menu: React.FC<NavProps> = ({
  userMenu,
  globalMenu,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  cakePriceUsd,
  links,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  langs,
  children,
}) => {
  const { isMobile } = useMatchBreakpoints();
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <Flex>
          <Logo isDark={isDark} href={homeLink?.href ?? "/"} />
          {!isMobile && <MenuItems items={links} activeItem={activeItem} ml="24px" />}
        </Flex>
        <Flex alignItems="center">
          {!isMobile && (
            <Box mr="12px">
              <CakePrice cakePriceUsd={cakePriceUsd} />
            </Box>
          )}
          {globalMenu} {userMenu}
        </Flex>
      </StyledNav>
      {subLinks && <SubMenuItems items={subLinks} mt={`${MENU_HEIGHT + 2}px`} activeItem={activeSubItem} />}
      <BodyWrapper>
        <Inner isPushed={false} showMenu={showMenu}>
          {children}
          <Footer
            items={footerLinks}
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={setLang}
            currentLang={currentLang}
            cakePriceUsd={cakePriceUsd}
            buyCakeLabel="Buy CAKE"
            mt="60px"
            mb={[`${MOBILE_MENU_HEIGHT}px`, null, "0px"]}
          />
        </Inner>
      </BodyWrapper>
      {isMobile && <BottomNav items={links} activeItem={activeItem} />}
    </Wrapper>
  );
};

export default Menu;
