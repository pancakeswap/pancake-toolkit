import Cookies from "js-cookie";
import getProfile from "./getProfile";
import { existingAddress1, nonexistentAddress } from "../mocks/mockAddresses";
import nfts from "../constants/nfts";
import teams from "../constants/teams";

jest.mock("../utils/contractHelpers");
jest.mock("js-cookie", () => ({
  set: jest.fn(() => null),
}));

const sleepyNft = nfts.find((nft) => nft.bunnyId === 5);

// TODO: mock web3?
describe("getProfile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("returns proper response for unregistered user", async () => {
    const profile = await getProfile(nonexistentAddress);
    expect(profile).toEqual({ hasRegistered: false, profile: null });
  });
  it("returns proper response for registered user", async () => {
    const profile = await getProfile(existingAddress1);
    expect(profile).toEqual({
      hasRegistered: true,
      profile: {
        isActive: true,
        userId: 123,
        username: "Cheems",
        teamId: 2,
        points: 3000,
        tokenId: 555,
        nftAddress: "0x4444444444444444444444444444444444444444",
        nft: sleepyNft,
        team: { ...teams[1], users: 77000, points: 341500, isJoinable: true },
      },
    });
  });
  it("sets cookies", async () => {
    await getProfile(existingAddress1);
    expect(Cookies.set).toBeCalledWith(
      `profile_${existingAddress1}`,
      {
        username: "Cheems",
        avatar: `https://pancakeswap.finance/images/nfts/${sleepyNft.images.sm}`,
      },
      { domain: "pancakeswap.finance", secure: true, expires: 30 }
    );
    expect(Cookies.set).toBeCalledTimes(1);
  });
});
