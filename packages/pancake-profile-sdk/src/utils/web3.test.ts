import Web3 from "web3";
import web3NoAccount from "./web3";

describe("web3", () => {
  it("returns random node", () => {
    expect(web3NoAccount).toBeInstanceOf(Web3);
  });
});
