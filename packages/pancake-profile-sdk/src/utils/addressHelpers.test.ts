import addresses from "../constants/contracts";
import { getAddress } from "./addressHelpers";

const OLD_ENV = process.env;

describe("addressHelpers", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it("getAddress returns correct mainnet address", () => {
    const address = getAddress(addresses.pancakeProfile);
    expect(address).toBe(addresses.pancakeProfile["56"]);
  });
  it("getAddress returns correct testnet address", () => {
    process.env.REACT_APP_CHAIN_ID = "97";
    const address = getAddress(addresses.pancakeProfile);
    expect(address).toBe(addresses.pancakeProfile["97"]);
  });
});
