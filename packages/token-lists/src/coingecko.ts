import fs from "fs";
import path from "path";
import axios from 'axios';
import { getAddress, isAddress } from "@ethersproject/address";

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

// Api token decimals was wrong.
const blackListTokens: Array<string> = [
  '0x8d67448d4f6231ABc070a42A8905084b79E09136',
  '0x71E80e96Af604Afc23Ca2AED4C1C7466DB6dd0c4',
  '0x261C02C850288F56497c06F9C0a8bde718d33D2a',
  '0x95637d4FbE7153dCc3E26E71bdE7a2D82621F083',
  '0xB5bCF4fAa81457e98f4609a2a3291dF64E246f01',
  '0x9068bBCDd5a9E9f545539CE9953778967e18D5a4',
  '0x2e40A9dEcEa6a050E8b00a690bd8Eae546624864',
  '0xaFfbF5D4693C93F23c35a08E31439Ea53d952351',
  '0x4A6Db8F47B8c827AaA846bA017E9809bB92cf6b2',
  '0x775205af1Cf9853577C4B0fC1e6D9ec956A116a6',
  '0xbCba01f7d6CC0A950464a4b98BA8358c4F6B69a0',
  '0x24b66a58d505Ff7651C31358b3A2d697644a8dE7',
  '0xb84ddc645c27D4Dc4bFA325c946f9d89d3AfCc7a',
  '0x270A84DCdfb305cC68be21e767Ef11Aac5Dc5cF0',
  '0x1e0c73A22F5f121E5486a77e99c7e756f21569Ef',
  '0xC2f2B22ADfDDde6b0931bF8C304a7E95Ccbbc109',
  '0xE1dfd41Fba67AB6e26a7072fA97508506093Ac01',
  '0x709018c03F5abE17485C1EF9C7b0FF19079Af24A',
  '0xe9acC19d6F78D62d70945d4c89e9CE315d81c455',
  '0x9D13Cc6FABDe882E059413c524a32BA5befebD8b',
  '0x9C0C8156b268A4432191A282BdF4287019526cCe',
  '0xFbac18B4e8560c0d8358B72D8fF3994ae7C2DDEC',
  '0x9D13Cc6FABDe882E059413c524a32BA5befebD8b',
  '0xc5a72FC4324EF3fcEBAFf9b5E729487719Eb5B7A',
  '0xA67a13c9283Da5AABB199Da54a9Cb4cD8B9b16bA',
  '0x288F7692a78aA9906Cf5790aF78a672078070535',
  '0x3Ffbe849A2666657B729a6bf19befD54D9E57c8b',
  '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
  '0x80c74b9166b2FAA5DC6a950f741f59A80026CDA0',
  '0x4AadaD81487c3fadD9F162b851E6a61b729200cb',
  '0xcC1873C2D5eb2C5f9B503F96a316cF059b3a75F7',
  '0xc417D28d8c83550e3a17Ae17652d84BEdb5884EB',
  '0xD2fB841ad6f0655f8993461Ff7E7669a5f61545f',
  '0x5fEAD99998788AC1BCA768796483d899F1Aef4c4',
  '0xbA509bdb71a29301860800e13867B59B461747Af',
  '0x9E711221B34A2d4B8F552BD5f4A6C4e7934920f7',
  '0x07e551E31A793E20dc18494ff6b03095A8F8Ee36',
  '0xB0Df5519F460E96117C12Ea667557b161866189c',
  '0xb21226a767F255d96163410Ff13B010B644dF0a6',
  '0x0c692B62C4E85171fD1c05FbA889C9F873b81317',
  '0x3b198e26E473b8faB2085b37978e36c9DE5D7f68',
  '0x547CBE0f0c25085e7015Aa6939b28402EB0CcDAC',
  '0xb897D0a0f68800f8Be7D69ffDD1c24b69f57Bf3e'
]

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
  
    const sanitizedTokens = tokens
    .filter((token, index, array) => {
      const isNotDuplicate = array.findIndex((t) => (t.address === token.address) || (t.name === token.name)) === index
      return isNotDuplicate && isAddress(token.address) && !blackListTokens.includes(getAddress(token.address)) && token.decimals > 0
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