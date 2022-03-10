import fs from "fs";
import path from "path";
import multicallv2 from "./multicall";
import erc20 from "./abi/erc20.json";
import rawMiniExtended from "../rawAddresses/mini-extended";

const rawLists = {
  "pcs-mini-extended": rawMiniExtended,
};

const getTokensChainData = async (listName: string, addressArray?: string[]): Promise<any[]> => {
  const isTest = addressArray && addressArray.length > 0;
  const tokens = isTest ? addressArray : rawLists[listName];
  if (!tokens) {
    console.error("No raw address list found");
    return [];
  }
  const tokenInfoCalls = tokens.flatMap((address) => [
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
  const tokenInfoResponse = await multicallv2(erc20, tokenInfoCalls);
  const tokensWithChainData = tokens.map((address, i) => ({
    name: tokenInfoResponse[i * 3 + 1][0],
    symbol: tokenInfoResponse[i * 3][0],
    address,
    chainId: 56,
    decimals: tokenInfoResponse[i * 3 + 2][0],
    logoURI: `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`,
  }));
  if (!isTest) {
    const tokenListPath = `${path.resolve()}/src/tokens/${listName}.json`;
    const stringifiedList = JSON.stringify(tokensWithChainData, null, 2);
    fs.writeFileSync(tokenListPath, stringifiedList);
    console.info("Generated token list source json to ", tokenListPath);
  }
  return tokensWithChainData;
};

export default getTokensChainData;
