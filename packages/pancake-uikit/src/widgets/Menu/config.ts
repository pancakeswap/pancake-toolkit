import { LinkStatus } from "./types";

export const status = {
  LIVE: <LinkStatus>{
    text: "LIVE",
    color: "failure",
  },
  SOON: <LinkStatus>{
    text: "SOON",
    color: "warning",
  },
  NEW: <LinkStatus>{
    text: "NEW",
    color: "success",
  },
};

export const links = [
  {
    label: "Home",
    icon: "HomeIcon",
    href: "/",
  },
  {
    label: "Trade",
    icon: "TradeIcon",
    items: [
      {
        label: "Exchange",
        href: "https://exchange.rootswap.finance",
      },
      {
        label: "Liquidity",
        href: "https://exchange.rootswap.finance/#/pool",
      },
    ],
  },
  {
    label: "Farms",
    icon: "FarmIcon",
    href: "/farms",
    status: status.LIVE,
  },
  {
    label: "Pools",
    icon: "PoolIcon",
    href: "/syrup",
  },
  {
    label: "Lottery",
    icon: "TicketIcon",
    href: "/lottery",
  },
  {
    label: "NFT",
    icon: "NftIcon",
    href: "/nft",
  },
  {
    label: "Team Battle",
    icon: "TeamBattleIcon",
    href: "/competition",
    status: status.SOON,
  },
  {
    label: "Profile & Teams",
    icon: "GroupsIcon",
    status: status.LIVE,
    items: [
      {
        label: "Leaderboard",
        href: "/teams",
        status: status.NEW,
      },
      {
        label: "YourProfile",
        href: "/",
      },
    ],
    calloutClass: "rainbow",
  },
  {
    label: "Info",
    icon: "InfoIcon",
    items: [
      {
        label: "Overview",
        href: "https://rootswap.info",
      },
      {
        label: "Tokens",
        href: "https://rootswap.info/tokens",
      },
      {
        label: "Pairs",
        href: "https://rootswap.info/pairs",
      },
      {
        label: "Accounts",
        href: "https://rootswap.info/accounts",
      },
    ],
  },
  {
    label: "IFO",
    icon: "IfoIcon",
    items: [
      {
        label: "Next",
        href: "/ifo",
      },
      {
        label: "History",
        href: "/ifo/history",
      },
    ],
  },
  {
    label: "More",
    icon: "MoreIcon",
    items: [
      {
        label: "Voting",
        href: "https://voting.rootswap.finance",
      },
      {
        label: "Github",
        href: "https://github.com/rootswap",
      },
      {
        label: "Docs",
        href: "https://docs.rootswap.finance",
      },
      {
        label: "Blog",
        href: "https://rootswap.medium.com",
      },
    ],
  },
];

export const socials = [
  {
    label: "Telegram",
    icon: "TelegramIcon",
    items: [
      {
        label: "English",
        href: "https://t.me/rootswap",
      },
      {
        label: "Bahasa Indonesia",
        href: "https://t.me/rootswapIndonesia",
      },
      {
        label: "中文",
        href: "https://t.me/rootswap_CN",
      },
      {
        label: "Tiếng Việt",
        href: "https://t.me/rootswapVN",
      },
      {
        label: "Italiano",
        href: "https://t.me/rootswap_ita",
      },
      {
        label: "русский",
        href: "https://t.me/rootswap_ru",
      },
      {
        label: "Türkiye",
        href: "https://t.me/rootswapturkiye",
      },
      {
        label: "Português",
        href: "https://t.me/rootswapPortuguese",
      },
      {
        label: "Español",
        href: "https://t.me/rootswapEs",
      },
      {
        label: "日本語",
        href: "https://t.me/rootswapjp",
      },
      {
        label: "Français",
        href: "https://t.me/rootswapfr",
      },
      {
        label: "Announcements",
        href: "https://t.me/rootswapAnn",
      },
      {
        label: "Whale Alert",
        href: "https://t.me/rootswapWhales",
      },
    ],
  },
  {
    label: "Twitter",
    icon: "TwitterIcon",
    href: "https://twitter.com/rootswap",
  },
];

export const MENU_HEIGHT = 64;
export const MENU_ENTRY_HEIGHT = 48;
export const SIDEBAR_WIDTH_FULL = 240;
export const SIDEBAR_WIDTH_REDUCED = 56;
