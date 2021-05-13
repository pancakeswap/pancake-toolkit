import fs from "fs";
import path from "path";
import { TokenList } from "@uniswap/token-lists";
import { version } from "../package.json";
import pancakeswap from "./tokens/pancakeswap.json";

export const buildList = (): TokenList => {
  const [major, minor, patch] = version.split(".").map((versionNumber) => parseInt(versionNumber, 10));
  return {
    name: "PancakeSwap Token List",
    timestamp: new Date().toISOString(),
    version: {
      major,
      minor,
      patch,
    },
    logoURI:
      "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png",
    keywords: ["pancakeswap", "default"],
    tokens: pancakeswap
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      }),
  };
};

export const saveList = (tokenList: TokenList): void => {
  const tokenListPath = `${path.resolve()}/lists/pancakeswap.json`;
  const stringifiedList = JSON.stringify(tokenList, null, 2);
  fs.writeFileSync(tokenListPath, stringifiedList);
  console.info("Token list saved to ", tokenListPath);
};
