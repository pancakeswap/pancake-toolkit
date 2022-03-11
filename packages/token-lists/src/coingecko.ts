import fs from "fs";
import path from "path";
import axios from 'axios';
import { getAddress, isAddress } from "@ethersproject/address";
import _ from "lodash"; 
import multicallv2 from "./utils/multicall";
import erc20 from "./utils/abi/erc20.json";

const pathToImages = process.env.CI
  ? path.join(process.env.GITHUB_WORKSPACE, "packages", "token-lists", "lists", "images")
  : path.join(path.resolve(), "lists", "images");
const logoFiles = fs.readdirSync(pathToImages);

interface Token {
  chainId: number,
  address: string
  name: string
  symbol: string
  decimals: number,
  logoURI: string
}

const getTokens = async (): Promise<Token[]> => {
  const url = 'https://tokens.coingecko.com/binance-smart-chain/all.json'
  const { data } = await axios.get(url)
  return data.tokens
}

const getTokenLogo = (address: string): string => {
  // Note: fs.existsSync can't be used here because its not case sensetive
  if (logoFiles.includes(`${address}.png`)) {
    return `https://tokens.pancakeswap.finance/images/${address}.png`;
  }

  return `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`;
};

const main = async (): Promise<void> => {
  try {
    const tokens = await getTokens();

    const chunkSize = 200
    const chunkArray = tokens.length >= chunkSize ? _.chunk(tokens, chunkSize) : [tokens]
    
    const realTokensDecimals = new Map()
    // eslint-disable-next-line no-restricted-syntax
    for (const chunk of chunkArray) {
      const mapAddress = chunk
        .filter((token) => isAddress(token.address) && token.decimals > 0)
        .map((token) => token.address)
      const tokenInfoCalls = mapAddress.flatMap((address) => [{
        address,
        name: "decimals",
      }])
      // eslint-disable-next-line no-await-in-loop
      const tokenInfoResponse = await multicallv2(erc20, tokenInfoCalls, { requireSuccess: false });
      mapAddress.forEach((address, i) => {
        realTokensDecimals.set(address, tokenInfoResponse[i][0])
      })
    }

    const sanitizedTokens = tokens
    .filter((token, index, array) => {
      const isNotDuplicate = array.findIndex((t) => (t.address === token.address) || (t.name === token.name)) === index
      return (
        isNotDuplicate &&
        isAddress(token.address) &&
        realTokensDecimals.get(token.address) === token.decimals &&
        token.decimals > 0
      )
    })
    .map(token => {
      const checksummedAddress = getAddress(token.address);
      return {
        ...token,
        address: checksummedAddress,
        logoURI: getTokenLogo(checksummedAddress)
      }
    })
  
    const tokenListPath = `${path.resolve()}/src/tokens/coingecko.json`;
    console.info("Saving updated list to ", tokenListPath);
    const stringifiedList = JSON.stringify(sanitizedTokens, null, 2);
    fs.writeFileSync(tokenListPath, stringifiedList);
  } catch (error) {
    console.error(`Error when fetching Coingecko Tokens, error: ${error.message}`);
  }
};

export default main;