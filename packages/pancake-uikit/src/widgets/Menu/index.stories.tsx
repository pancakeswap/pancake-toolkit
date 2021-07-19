import React, { useEffect, useState } from "react";
import noop from "lodash/noop";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Flex from "../../components/Box/Flex";
import Box from "../../components/Box/Box";
import Heading from "../../components/Heading/Heading";
import Text from "../../components/Text/Text";
import { MenuEntry } from "./components/MenuEntry";
import UserMenuComponent from "./components/UserMenu";
import Menu from "./Menu";
import { Language } from "./types";
import { links } from "./config";

export default {
  title: "Widgets/Menu",
  component: Menu,
  argTypes: {},
};

const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));

// This hook is used to simulate a props change, and force a re rendering
const useProps = () => {
  const [props, setProps] = useState({
    account: "0xbdda50183d817c3289f895a4472eb475967dc980",
    login: noop,
    logout: noop,
    isDark: false,
    toggleTheme: noop,
    langs,
    setLang: noop,
    currentLang: "EN",
    cakePriceUsd: 0.023158668932877668,
    links,
    profile: null,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setProps({
        account: "0xbdda50183d817c3289f895a4472eb475967dc980",
        login: noop,
        logout: noop,
        isDark: false,
        toggleTheme: noop,
        langs,
        setLang: noop,
        currentLang: "EN",
        cakePriceUsd: 0.023158668932877668,
        links,
        profile: null,
      });
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return props;
};

export const Connected: React.FC = () => {
  const props = useProps();
  return (
    <BrowserRouter>
      <Menu {...props}>
        <div>
          <Heading as="h1" mb="8px">
            Page body
          </Heading>
          <Text as="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut
          </Text>
        </div>
      </Menu>
    </BrowserRouter>
  );
};

export const NotConnected: React.FC = () => {
  return (
    <BrowserRouter>
      <Menu isDark={false} toggleTheme={noop} langs={langs} setLang={noop} currentLang="EN" links={links}>
        <div>
          <h1>Page body</h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </div>
      </Menu>
    </BrowserRouter>
  );
};

export const WithoutConnectButton: React.FC = () => {
  return (
    <BrowserRouter>
      <Menu isDark={false} toggleTheme={noop} langs={langs} setLang={noop} currentLang="EN" links={links}>
        <div>
          <h1>No connect button on top</h1>
          This variant is needed for info site
        </div>
      </Menu>
    </BrowserRouter>
  );
};

export const MenuEntryComponent: React.FC = () => {
  return (
    <Flex justifyContent="space-between" p="16px" style={{ backgroundColor: "wheat" }}>
      <MenuEntry>Default</MenuEntry>
      <MenuEntry secondary>Secondary</MenuEntry>
      <MenuEntry isActive>isActive</MenuEntry>
    </Flex>
  );
};

export const WithSubmenuSelected: React.FC = () => {
  return (
    <MemoryRouter initialEntries={["/teams"]}>
      <Menu
        isDark={false}
        toggleTheme={noop}
        langs={langs}
        setLang={noop}
        currentLang="EN"
        cakePriceUsd={0.23158668932877668}
        links={links}
      >
        <div>
          <Heading as="h1" mb="8px">
            Submenu leaderboard selected
          </Heading>
        </div>
      </Menu>
    </MemoryRouter>
  );
};

export const UserMenu: React.FC = () => {
  return (
    <Box p="40px">
      <Flex mb="40px">
        <UserMenuComponent account="0x8b017905DC96B38f817473dc885F84D4C76bC113" />
        <UserMenuComponent
          avatarSrc="https://pancakeswap.finance/images/nfts/claire-sm.png"
          account="0x8b017905DC96B38f817473dc885F84D4C76bC113"
          ml="32px"
        />
        <UserMenuComponent
          avatarSrc="https://pancakeswap.finance/images/nfts/claire-sm.png"
          account="0x8b017905DC96B38f817473dc885F84D4C76bC113"
          variant="warning"
          ml="32px"
        />
        <UserMenuComponent
          avatarSrc="https://pancakeswap.finance/images/nfts/claire-sm.png"
          account="0x8b017905DC96B38f817473dc885F84D4C76bC113"
          variant="danger"
          text="Network"
          ml="32px"
        />
        <UserMenuComponent
          avatarSrc="https://pancakeswap.finance/images/nfts/claire-sm.png"
          account="0x8b017905DC96B38f817473dc885F84D4C76bC113"
          variant="pending"
          text="2 Pending"
          ml="32px"
        />
      </Flex>
      <Flex mb="32px">
        <UserMenuComponent
          avatarSrc="https://pancakeswap.finance/images/nfts/claire-sm.png"
          account="0x8b017905DC96B38f817473dc885F84D4C76bC113"
          text="Any Custom Text"
        />
      </Flex>
    </Box>
  );
};
