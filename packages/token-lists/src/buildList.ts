import fs from "fs";
import path from "path";
import { TokenList } from "@uniswap/token-lists";
import { version as pancakeswapDefaultVersion } from "../lists/pancakeswap-default.json";
import { version as pancakeswapExtendedVersion } from "../lists/pancakeswap-extended.json";
import { version as pancakeswapTop15Version } from "../lists/pancakeswap-top-15.json";
import { version as pancakeswapTop100Version } from "../lists/pancakeswap-top-100.json";
import { version as coingeckoVersion } from "../lists/coingecko.json";
import { version as cmcVersion } from "../lists/cmc.json";
import { version as pancakeswapMiniVersion } from "../lists/pancakeswap-mini.json";
import { version as pancakeswapMiniExtendedVersion } from "../lists/pancakeswap-mini-extended.json";
import pancakeswapDefault from "./tokens/pancakeswap-default.json";
import pancakeswapExtended from "./tokens/pancakeswap-extended.json";
import pancakeswapTop100 from "./tokens/pancakeswap-top-100.json";
import pancakeswapTop15 from "./tokens/pancakeswap-top-15.json";
import coingecko from "./tokens/coingecko.json";
import cmc from "./tokens/cmc.json";
import pancakeswapMini from "./tokens/pancakeswap-mini.json";
import pancakeswapMiniExtended from "./tokens/pancakeswap-mini-extended.json";

export enum VersionBump {
  "major" = "major",
  "minor" = "minor",
  "patch" = "patch",
}

type Version = {
  major: number;
  minor: number;
  patch: number;
};

const lists = {
  "pancakeswap-default": {
    list: pancakeswapDefault,
    name: "PancakeSwap Default",
    keywords: ["pancakeswap", "default"],
    logoURI: "https://pancakeswap.finance/logo.png",
    sort: false,
    currentVersion: pancakeswapDefaultVersion,
  },
  "pancakeswap-extended": {
    list: pancakeswapExtended,
    name: "PancakeSwap Extended",
    keywords: ["pancakeswap", "extended"],
    logoURI: "https://pancakeswap.finance/logo.png",
    sort: true,
    currentVersion: pancakeswapExtendedVersion,
  },
  "pancakeswap-top-100": {
    list: pancakeswapTop100,
    name: "PancakeSwap Top 100",
    keywords: ["pancakeswap", "top 100"],
    logoURI: "https://pancakeswap.finance/logo.png",
    sort: true,
    currentVersion: pancakeswapTop100Version,
  },
  "pancakeswap-top-15": {
    list: pancakeswapTop15,
    name: "PancakeSwap Top 15",
    keywords: ["pancakeswap", "top 15"],
    logoURI: "https://pancakeswap.finance/logo.png",
    sort: true,
    currentVersion: pancakeswapTop15Version,
  },
  coingecko: {
    list: coingecko,
    name: "CoinGecko",
    keywords: ["defi"],
    logoURI:
      "https://www.coingecko.com/assets/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png",
    sort: true,
    currentVersion: coingeckoVersion,
  },
  cmc: {
    list: cmc,
    name: "CoinMarketCap",
    keywords: ["defi"],
    logoURI: "https://ipfs.io/ipfs/QmQAGtNJ2rSGpnP6dh6PPKNSmZL8RTZXmgFwgTdy5Nz5mx",
    sort: true,
    currentVersion: cmcVersion,
  },
  "pancakeswap-mini": {
    list: pancakeswapMini,
    name: "PancakeSwap Mini",
    keywords: ["pancakeswap", "binance", "mini program", "mini"],
    logoURI: "https://pancakeswap.finance/logo.png",
    sort: true,
    currentVersion: pancakeswapMiniVersion,
  },
  "pancakeswap-mini-extended": {
    list: pancakeswapMiniExtended,
    name: "PancakeSwap Mini Ext",
    keywords: ["pancakeswap", "binance", "mini program", "mini", "extended"],
    logoURI: "https://pancakeswap.finance/logo.png",
    sort: true,
    currentVersion: pancakeswapMiniExtendedVersion,
  },
};

const getNextVersion = (currentVersion: Version, versionBump?: VersionBump) => {
  const { major, minor, patch } = currentVersion;
  switch (versionBump) {
    case VersionBump.major:
      return { major: major + 1, minor, patch };
    case VersionBump.minor:
      return { major, minor: minor + 1, patch };
    case VersionBump.patch:
    default:
      return { major, minor, patch: patch + 1 };
  }
};

export const buildList = (listName: string, versionBump?: VersionBump): TokenList => {
  const { list, name, keywords, logoURI, sort, currentVersion } = lists[listName];
  const version = getNextVersion(currentVersion, versionBump);
  return {
    name,
    timestamp: new Date().toISOString(),
    version,
    logoURI,
    keywords,
    // sort them by symbol for easy readability (not applied to default list)
    tokens: sort
      ? list.sort((t1, t2) => {
          if (t1.chainId === t2.chainId) {
            // CAKE first in extended list
            if ((t1.symbol === "CAKE") !== (t2.symbol === "CAKE")) {
              return t1.symbol === "CAKE" ? -1 : 1;
            }
            return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
          }
          return t1.chainId < t2.chainId ? -1 : 1;
        })
      : list,
  };
};

export const saveList = (tokenList: TokenList, listName: string): void => {
  const tokenListPath = `${path.resolve()}/lists/${listName}.json`;
  const stringifiedList = JSON.stringify(tokenList, null, 2);
  fs.writeFileSync(tokenListPath, stringifiedList);
  console.info("Token list saved to ", tokenListPath);
};
