import fs from "fs";
import path from "path";
import axios from "axios";
import { getAddress, isAddress } from "@ethersproject/address";
import _ from "lodash";
import multicallv2 from "./utils/multicall";
import erc20 from "./utils/abi/erc20.json";

interface Token {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}

const getTokens = async (): Promise<Token[]> => {
  const url = "https://tokens.coingecko.com/binance-smart-chain/all.json";
  const { data } = await axios.get(url);
  return data.tokens;
};

const main = async (): Promise<void> => {
  try {
    const tokens = await getTokens();

    const chunkSize = 200;
    const chunkArray = tokens.length >= chunkSize ? _.chunk(tokens, chunkSize) : [tokens];

    const realTokensDecimals = new Map();
    // eslint-disable-next-line no-restricted-syntax
    for (const chunk of chunkArray) {
      const mapAddress = chunk.filter((token) => isAddress(token.address)).map((token) => token.address);
      const tokenInfoCalls = mapAddress.flatMap((address) => [
        {
          address,
          name: "decimals",
        },
      ]);
      // eslint-disable-next-line no-await-in-loop
      const tokenInfoResponse = await multicallv2(erc20, tokenInfoCalls, { requireSuccess: false });
      mapAddress.forEach((address, i) => {
        try {
          realTokensDecimals.set(address, tokenInfoResponse[i][0]);
        } catch (error) {
          console.error(tokenInfoResponse[i], address);
        }
      });
    }

    const sanitizedTokens = tokens
      .filter((token, index, array) => {
        const isNotDuplicate = array.findIndex((t) => t.address === token.address || t.name === token.name) === index;
        return isNotDuplicate && isAddress(token.address) && realTokensDecimals.get(token.address) === token.decimals;
      })
      .map((token) => {
        const checksummedAddress = getAddress(token.address);
        return {
          ...token,
          address: checksummedAddress,
        };
      });

    const tokenListPath = `${path.resolve()}/src/tokens/coingecko.json`;
    console.info("Saving updated list to ", tokenListPath);
    const stringifiedList = JSON.stringify(sanitizedTokens, null, 2);
    fs.writeFileSync(tokenListPath, stringifiedList);
  } catch (error) {
    console.error(`Error when fetching Coingecko Tokens, error: ${error.message}`);
  }
};

export default main;
