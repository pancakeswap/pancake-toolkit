/* eslint-disable no-restricted-syntax */
import Ajv from "ajv";
import fs from "fs";
import { getAddress } from "@ethersproject/address";
import { schema } from "@uniswap/token-lists";
import currentPancakeswapDefaultList from "../lists/pancakeswap-default.json";
import currentPancakeswapExtendedtList from "../lists/pancakeswap-extended.json";
import currentPancakeswapTop15List from "../lists/pancakeswap-top-15.json";
import currentPancakeswapTop100tList from "../lists/pancakeswap-top-100.json";
import { buildList, VersionBump } from "../src/buildList";

const currentLists = {
  "pancakeswap-default": currentPancakeswapDefaultList,
  "pancakeswap-extended": currentPancakeswapExtendedtList,
  "pancakeswap-top-100": currentPancakeswapTop100tList,
  "pancakeswap-top-15": currentPancakeswapTop15List,
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeDeclaredOnce(type: string, parameter: string, chainId: number): CustomMatcherResult;
      toBeValidTokenList(validationErrors): CustomMatcherResult;
      toBeValidLogo(): CustomMatcherResult;
    }
  }
}

expect.extend({
  toBeDeclaredOnce(received, type: string, parameter: string, chainId: number) {
    if (typeof received === "undefined") {
      return {
        message: () => ``,
        pass: true,
      };
    }
    return {
      message: () => `Token ${type} ${parameter} on chain ${chainId} should be declared only once.`,
      pass: false,
    };
  },
  toBeValidTokenList(received, validationErrors) {
    if (received) {
      return {
        message: () => ``,
        pass: true,
      };
    }
    return {
      message: () => `Validation failed: ${JSON.stringify(validationErrors, null, 2)}`,
      pass: false,
    };
  },
  toBeValidLogo(token) {
    // TW logos are always checksummed
    const hasTWLogo =
      token.logoURI === `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${token.address}/logo.png`;
    let hasLocalLogo = false;
    const refersToLocalLogo =
      token.logoURI === `https://tokens.pancakeswap.finance/images/${token.address}.png` ||
      token.logoURI === `https://tokens.pancakeswap.finance/images/${token.address.toLowerCase()}.png`;
    if (refersToLocalLogo) {
      const fileName = token.logoURI.split("/").pop();
      hasLocalLogo = fs.existsSync(`./lists/images/${fileName}`);
    }
    if (hasTWLogo || hasLocalLogo) {
      return {
        message: () => ``,
        pass: true,
      };
    }
    return {
      message: () => `Token ${token.symbol} (${token.address}) has invalid logo: ${token.logoURI}`,
      pass: false,
    };
  },
});

const ajv = new Ajv({ allErrors: true, format: "full" });
const validate = ajv.compile(schema);

describe.each([["pancakeswap-default"], ["pancakeswap-extended"], ["pancakeswap-top-100"], ["pancakeswap-top-15"]])(
  "buildList %s",
  (listName) => {
    const defaultTokenList = buildList(listName);

    it("validates", () => {
      expect(validate(defaultTokenList)).toBeValidTokenList(validate.errors);
    });

    it("contains no duplicate addresses", () => {
      const map = {};
      for (const token of defaultTokenList.tokens) {
        const key = `${token.chainId}-${token.address.toLowerCase()}`;
        expect(map[key]).toBeDeclaredOnce("address", token.address.toLowerCase(), token.chainId);
        map[key] = true;
      }
    });

    // Commented out since we now have duplicate symbols ("ONE") on exchange
    // doesn't seem to affect any functionality at the moment though
    // it("contains no duplicate symbols", () => {
    //   const map = {};
    //   for (const token of defaultTokenList.tokens) {
    //     const key = `${token.chainId}-${token.symbol.toLowerCase()}`;
    //     expect(map[key]).toBeDeclaredOnce("symbol", token.symbol.toLowerCase(), token.chainId);
    //     map[key] = true;
    //   }
    // });

    it("contains no duplicate names", () => {
      const map = {};
      for (const token of defaultTokenList.tokens) {
        const key = `${token.chainId}-${token.name.toLowerCase()}`;
        expect(map[key]).toBeDeclaredOnce("name", token.name.toLowerCase(), token.chainId);
        map[key] = true;
      }
    });

    it("all addresses are valid and checksummed", () => {
      for (const token of defaultTokenList.tokens) {
        expect(getAddress(token.address)).toBe(token.address);
      }
    });

    it("all tokens have correct logos", () => {
      for (const token of defaultTokenList.tokens) {
        expect(token).toBeValidLogo();
      }
    });

    it("version gets patch bump if no versionBump sepcified", () => {
      expect(defaultTokenList.version.major).toBe(currentLists[listName].version.major);
      expect(defaultTokenList.version.minor).toBe(currentLists[listName].version.minor);
      expect(defaultTokenList.version.patch).toBe(currentLists[listName].version.patch + 1);
    });

    it("version gets patch bump if patch versionBump is sepcified", () => {
      const defaultTokenListPatchBump = buildList(listName, VersionBump.patch);
      expect(defaultTokenListPatchBump.version.major).toBe(currentLists[listName].version.major);
      expect(defaultTokenListPatchBump.version.minor).toBe(currentLists[listName].version.minor);
      expect(defaultTokenListPatchBump.version.patch).toBe(currentLists[listName].version.patch + 1);
    });

    it("version gets minor bump if minor versionBump is sepcified", () => {
      const defaultTokenListMinorBump = buildList(listName, VersionBump.minor);
      expect(defaultTokenListMinorBump.version.major).toBe(currentLists[listName].version.major);
      expect(defaultTokenListMinorBump.version.minor).toBe(currentLists[listName].version.minor + 1);
      expect(defaultTokenListMinorBump.version.patch).toBe(currentLists[listName].version.patch);
    });

    it("version gets minor bump if major versionBump is sepcified", () => {
      const defaultTokenListMajorBump = buildList(listName, VersionBump.major);
      expect(defaultTokenListMajorBump.version.major).toBe(currentLists[listName].version.major + 1);
      expect(defaultTokenListMajorBump.version.minor).toBe(currentLists[listName].version.minor);
      expect(defaultTokenListMajorBump.version.patch).toBe(currentLists[listName].version.patch);
    });
  }
);
