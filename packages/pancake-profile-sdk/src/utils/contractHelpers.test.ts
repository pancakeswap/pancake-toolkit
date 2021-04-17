import Web3 from "web3";
import { getProfileContract, getPancakeRabbitContract } from "./contractHelpers";

describe("contractHelpers", () => {
  it("getProfileContract returns an instance of Contract", () => {
    const profileContract = getProfileContract();
    // toBeInstanceOf doesn't work very well with third-party libs, read more - https://stackoverflow.com/a/58032069/4614082
    expect(profileContract.constructor.name).toBe("Contract");
  });
  it("getProfileContract returns an instance of Contract", () => {
    const pancakeRabbitContract = getPancakeRabbitContract();
    expect(pancakeRabbitContract.constructor.name).toBe("Contract");
  });
  it("uses custom Web3 instnace if passed as argument", () => {
    const httpProvider = new Web3.providers.HttpProvider("https://example.com", {
      timeout: 10000,
    });
    const customWeb3 = new Web3(httpProvider);
    const pancakeRabbitContract = getPancakeRabbitContract(customWeb3);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(pancakeRabbitContract.currentProvider).toBe(httpProvider);
  });
});
