import fs from "fs";
import path from "path";
import { request, gql } from 'graphql-request'
import { getAddress } from "@ethersproject/address"

interface TokenEntity {
  id: string;
  name: symbol;
  symbol: string;
  decimals: string;
}

const getTokens = async () => {
    const { tokens } = await request(
        "?_?",
        gql`
        query getMostTradedTokens {
            tokens(first: 100, orderBy: tradeVolumeUSD, orderDirection: desc) {
                id
                name
                symbol
                decimals
            }
        }
      `
    )

    return tokens;
};

const main = async () => {
  const tokens = await getTokens();

  const sanitizedTokens = tokens.reduce((list, token: TokenEntity) => {
    const checksummedAddress = getAddress(token.id);

    const updatedToken = { name: token.name, symbol: token.symbol.toUpperCase(), address: checksummedAddress, chainId: "56", logoURI: `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${checksummedAddress}/logo.png` };
    return [...list, updatedToken];
  }, []);

  console.log(sanitizedTokens);

  const tokenListPath = `${path.resolve()}/src/tokens/pancakeswap-top-100.json`;
  console.info("Saving updated list to ", tokenListPath);
  const stringifiedList = JSON.stringify(sanitizedTokens, null, 2);
  fs.writeFileSync(tokenListPath, stringifiedList);
};

export default main;
