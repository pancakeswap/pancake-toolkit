import fs from "fs";
import path from "path";
import axios from 'axios';
import { getAddress, isAddress } from "@ethersproject/address";

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

const main = async (): Promise<void> => {
  try {
    const tokens = await getTokens();
  
    const sanitizedTokens = tokens
    .filter((token, index, array) => {
      const isNotDuplicate = array.findIndex((t) => t.address === token.address) === index
      return isNotDuplicate && isAddress(token.address)
    })
    .map(token => ({
      ...token,
      address: getAddress(token.address)
    }))
  
    const tokenListPath = `${path.resolve()}/src/tokens/coingecko.json`;
    console.info("Saving updated list to ", tokenListPath);
    const stringifiedList = JSON.stringify(sanitizedTokens, null, 2);
    fs.writeFileSync(tokenListPath, stringifiedList);
  } catch (error) {
    console.error(`Error when fetching Coingecko Tokens, error: ${error.message}`);
  }
};

export default main;