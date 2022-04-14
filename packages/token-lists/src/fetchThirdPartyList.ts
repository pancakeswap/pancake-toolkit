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

const getTokens = async (listName: string): Promise<Token[]> => {
  const urls = {
    coingecko: "https://tokens.coingecko.com/binance-smart-chain/all.json",
    cmc: "https://s3.coinmarketcap.com/generated/dex/tokens/bsc-tokens-all.json",
  };
  const { data } = await axios.get(urls[listName]);
  return data.tokens;
};

const COINGEKKO_BAD_TOKENS = [
  '0x92a0d359c87b8f3fe383aa0a42c19d1a2afe6be0'
]

const CMC_BAD_TOKENS = [
  "0x6B8C76b277Eb34A22e24d603ef0448D9ad1c5a7d", // self destruct
  "0x58b8e295fc5b705bcbb48c5978b2b389332e0414", // unverified
  "0x6636F7B89f64202208f608DEFFa71293EEF7b466", // bad symbol
  "0xb8e3399d81b76362b76453799c95fee868c728ea", // bad symbol
].map((a) => a.toLowerCase());

const badTokens = {
  coingecko: COINGEKKO_BAD_TOKENS,
  cmc: CMC_BAD_TOKENS,
};

// TODO: ideally we should also check on chain name, but if project wants to modify it for whatever reason
// we should respect that somehow too... I think good solution would be to have a separate map for "modified" names.
// Cause on chain everything is different and causes confusion
// For now names are just used as is here
const fetchThirdPartyList = async (listName: string): Promise<void> => {
  try {
    const rawTokens = await getTokens(listName);
    const tokens = rawTokens.filter(({ address }) => !badTokens[listName].includes(address.toLowerCase()));
    const badDecimals = [];
    const badAddresses = [];
    const badSymbol = [];
    const badName = [];
    const duplicates = [];
    const invalidNameOrSymbol = [];

    const chunkSize = 200;
    const chunkArray = tokens.length >= chunkSize ? _.chunk(tokens, chunkSize) : [tokens];

    console.info("Total chunks: ", chunkArray.length);

    const realTokensDecimals = new Map();
    const realTokenSymbol = new Map();
    let currentChunk = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const chunk of chunkArray) {
      console.info(`Processing chunk ${++currentChunk} / ${chunkArray.length}`);
      const mapAddress = chunk.filter((token) => isAddress(token.address));
      badAddresses.push(...chunk.filter((token) => !isAddress(token.address)).map(({ address }) => address));
      const tokenInfoCalls = mapAddress.flatMap(({ address }) => [
        {
          address,
          name: "symbol",
        },
        {
          address,
          name: "name",
        },
        {
          address,
          name: "decimals",
        },
      ]);
      // console.info(
      //   "Debug problematic addresses",
      //   mapAddress.map(({ address }) => address)
      // );
      // eslint-disable-next-line no-await-in-loop
      const tokenInfoResponse = await multicallv2(erc20, tokenInfoCalls, { requireSuccess: false });
      mapAddress.forEach(({ address, name, symbol, decimals }, i) => {
        if (
          tokenInfoResponse[i * 3] === null ||
          tokenInfoResponse[i * 3 + 1] === null ||
          tokenInfoResponse[i * 3 + 2] === null
        ) {
          badAddresses.push(address);
          return;
        }
        const realSymbol = tokenInfoResponse[i * 3][0];
        const realName = tokenInfoResponse[i * 3 + 1][0];
        const realDecimals = tokenInfoResponse[i * 3 + 2][0];
        if (!decimals || decimals !== realDecimals) {
          badDecimals.push({ decimals, realDecimals, address });
        }
        if (!name || name !== realName) {
          badName.push({ name, realName, address });
        }
        if (!symbol || symbol !== realSymbol) {
          badSymbol.push({ name, realSymbol, address });
        }
        realTokenSymbol.set(address, realSymbol);
        realTokensDecimals.set(address, realDecimals);
      });
    }

    const sanitizedTokens = tokens
      .filter((token, index, array) => {
        const isNotDuplicate = array.findIndex((t) => t.address === token.address || t.name === token.name) === index;
        if (!isNotDuplicate) duplicates.push(token);
        const hasValidSymbol = /^[a-zA-Z0-9+\-%/$]+$/.test(realTokenSymbol.get(token.address));
        const symbolIsOk = realTokenSymbol.get(token.address)?.length > 0 && hasValidSymbol;
        if (!symbolIsOk) invalidNameOrSymbol.push(token.address);
        return isNotDuplicate && symbolIsOk && isAddress(token.address) && !badAddresses.includes(token.address);
      })
      .map((token) => {
        const checksummedAddress = getAddress(token.address);

        return {
          name: token.name,
          symbol: realTokenSymbol.get(token.address),
          address: checksummedAddress,
          chainId: token.chainId,
          decimals: realTokensDecimals.get(token.address),
          logoURI: token.logoURI,
        };
      });

    console.info(`About to save ${sanitizedTokens.length} tokens (original list has ${rawTokens.length})`);
    console.info(`Dropped: ${rawTokens.length - sanitizedTokens.length}`);
    console.info(`Bad decimals found: ${badDecimals.length}.`);
    console.info(`Bad names found: ${badName.length}.`);
    console.info(`Bad symbols found: ${badSymbol.length}.`);
    console.info(`Bad addresses found: ${badAddresses.length}`);
    console.info(`Duplicates found: ${duplicates.length}`);
    console.info(`Invalid name or symbosl: ${invalidNameOrSymbol.length}`);

    const tokenListPath = `${path.resolve()}/src/tokens/${listName}.json`;
    console.info("Saving updated list to ", tokenListPath);
    const stringifiedList = JSON.stringify(sanitizedTokens, null, 2);
    fs.writeFileSync(tokenListPath, stringifiedList);
  } catch (error) {
    console.error(`Error when fetching ${listName} list, error: ${error.message}`);
  }
};

export default fetchThirdPartyList;
